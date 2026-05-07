import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaCommentDots, FaPaperPlane, FaUserCircle } from "react-icons/fa";

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleFavorite } = useAuth();
  
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const isFavorited = user?.favorites?.some(favId => favId.toString() === id.toString());

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/universities/${id}`);
        setUniversity(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching university details:", err);
        setError("Unable to connect to the server or university not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!commentText.trim()) return;

    try {
      setSubmittingComment(true);
      const res = await api.post(`/universities/${id}/comment`, { text: commentText });
      // Update local state with new comments
      setUniversity(prev => ({ ...prev, comments: res.data }));
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <h2 className="text-3xl font-bold mb-4 text-red-500 font-heading">University Not Found</h2>
        <p className="text-slate-600 font-medium">{error || "The university you are looking for does not exist."}</p>
        <button
          className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
          onClick={() => navigate("/universities")}
        >
          ← Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <button
            className="text-slate-500 hover:text-indigo-600 transition-all flex items-center font-bold text-sm tracking-wide uppercase"
            onClick={() => navigate(-1)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Results
          </button>

          <button 
            onClick={() => toggleFavorite(university._id)}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-2xl font-bold transition-all border ${
              isFavorited 
                ? "bg-pink-50 border-pink-100 text-pink-600 shadow-lg shadow-pink-500/10" 
                : "bg-white border-slate-200 text-slate-500 hover:border-pink-200 hover:text-pink-500"
            }`}
          >
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
            <span>{isFavorited ? "Saved to Favorites" : "Save to Favorites"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-6">
                   <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {university.type} Sector
                  </span>
                  <span className="bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    {university.city}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">{university.name}</h1>
                <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                  One of the prestigious higher education institutions in KPK, offering a diverse range of undergraduate and postgraduate programs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-50">
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Details</h3>
                  <ul className="space-y-6">
                    <li className="flex flex-col group">
                      <span className="text-xs text-indigo-500 font-bold mb-1">Admission Deadline</span>
                      <span className="text-lg text-slate-800 font-bold">{university.lastDate || 'Not specified'}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-indigo-500 font-bold mb-1">Fee Structure</span>
                      <span className="text-lg text-slate-800 font-bold">{university.fees || 'Available on request'}</span>
                    </li>
                    {university.website && (
                      <li className="flex flex-col">
                        <span className="text-xs text-indigo-500 font-bold mb-1">Official Portal</span>
                        <a href={university.website.startsWith('http') ? university.website : `https://${university.website}`} target="_blank" rel="noopener noreferrer" className="text-lg text-indigo-600 font-bold hover:underline inline-flex items-center group">
                          Visit University Website
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Programs</h3>
                  {university.programs && university.programs.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {university.programs.map((program, index) => (
                        <span key={index} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-100 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-default">
                          {program}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-6 rounded-2xl text-center border border-dashed border-slate-200">
                      <p className="text-slate-400 text-sm font-bold">Programs list updating...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-600/20">
                  <FaCommentDots />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Student Discussion</h2>
                  <p className="text-slate-400 text-sm font-medium">{university.comments?.length || 0} Comments</p>
                </div>
              </div>

              {/* Comment Input */}
              {user ? (
                <form onSubmit={handleAddComment} className="mb-12">
                  <div className="relative group">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your thoughts or ask a question about this university..."
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 min-h-[120px] focus:bg-white focus:border-indigo-500 focus:ring-0 outline-none transition-all font-medium text-slate-700 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={submittingComment || !commentText.trim()}
                      className="absolute bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-400 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                    >
                      {submittingComment ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : <FaPaperPlane />}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl mb-12 text-center">
                  <p className="text-indigo-900 font-bold mb-4">Want to join the discussion?</p>
                  <button onClick={() => navigate("/login")} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm tracking-wide uppercase hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                    Sign in to Comment
                  </button>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-8">
                {university.comments && university.comments.length > 0 ? (
                  university.comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((comment, index) => (
                    <div key={index} className="flex space-x-4 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all group">
                      <div className="flex-shrink-0">
                        <FaUserCircle className="text-4xl text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-black text-slate-900 text-sm tracking-tight">{comment.userName}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 opacity-50">
                    <p className="text-slate-400 font-bold">No comments yet. Be the first to share!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Sidebar Info */}
          <div className="space-y-10">
            <div className="bg-indigo-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <h4 className="text-lg font-black mb-6 tracking-tight relative z-10">Quick Facts</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-300 font-bold italic">P</div>
                    <div>
                      <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Sector</p>
                      <p className="text-sm font-bold">{university.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-300 font-bold italic">L</div>
                    <div>
                      <p className="text-[10px] text-amber-300 font-bold uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold">{university.city}, KPK</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
