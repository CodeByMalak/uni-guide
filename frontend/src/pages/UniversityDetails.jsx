import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import {
  FaHeart, FaRegHeart, FaCommentDots, FaPaperPlane,
  FaUserCircle, FaChevronLeft, FaGlobe, FaCalendarAlt,
  FaMoneyBillWave, FaUniversity, FaTrash, FaCheckCircle, FaArrowRight
} from "react-icons/fa";

export default function UniversityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleFavorite } = useAuth();
  
  const [university, setUniversity] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const isFavorited = user?.favorites?.some(fav => (fav._id || fav).toString() === id.toString());

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const [uniRes, commRes] = await Promise.all([
          api.get(`/universities/${id}`),
          api.get(`/comments/${id}`)
        ]);
        setUniversity(uniRes.data.university);
        setComments(commRes.data.comments || []);
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
      const res = await api.post(`/comments/${id}`, { text: commentText });
      setComments(prev => [res.data.comment, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this review?")) return;
    setDeletingId(commentId);
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f8fafc] gap-6">
        <div className="relative">
           <div className="w-20 h-20 border-4 border-zinc-200 rounded-full animate-pulse"></div>
           <div className="absolute inset-0 w-20 h-20 border-t-4 border-zinc-800 rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Loading Institution</p>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] px-6 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mb-8 text-4xl shadow-2xl shadow-red-500/10">
          !
        </div>
        <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tighter">Institution Not Found</h2>
        <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed mb-10">{error || "The university details you're looking for aren't available right now."}</p>
        <button
          className="bg-zinc-800 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-2xl shadow-zinc-800/20 active:scale-95"
          onClick={() => navigate("/universities")}
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <button
            className="group flex items-center gap-4 text-slate-400 hover:text-zinc-800 transition-all font-black text-[10px] tracking-[0.3em] uppercase"
            onClick={() => navigate(-1)}
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:border-zinc-200 group-hover:bg-zinc-100 transition-all">
               <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Explore
          </button>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => toggleFavorite(university._id)}
              className={`flex items-center gap-4 px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all border shadow-xl ${
                isFavorited 
                  ? "bg-white border-pink-100 text-pink-500 shadow-pink-500/5" 
                  : "bg-white border-slate-100 text-slate-400 hover:border-pink-200 hover:text-pink-500 shadow-slate-200/10"
              }`}
            >
              {isFavorited ? <FaHeart className="animate-bounce" /> : <FaRegHeart />}
              <span>{isFavorited ? "Saved to Profile" : "Save to Favorites"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Header Content */}
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
               <div className="h-80 relative group">
                  <img 
                    src={university.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
                    alt={university.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                       <span className="bg-zinc-800 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-zinc-800/30">
                         {university.type} Sector
                       </span>
                       <span className="bg-white text-zinc-800 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-zinc-200 shadow-xl">
                         Verified Data
                       </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                       {university.name}
                    </h1>
                  </div>
               </div>

               <div className="p-12">
                  <div className="mb-12">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                       <div className="w-6 h-px bg-slate-200" />
                       About this Institution
                    </h3>
                    <p className="text-slate-600 text-xl font-medium leading-relaxed">
                      {university.description || "A premier educational institution in Khyber Pakhtunkhwa, dedicated to academic excellence, research, and fostering the next generation of leaders."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-50">
                     <div className="space-y-10">
                        <DetailItem icon={<FaCalendarAlt />} label="Admission Deadline" value={university.lastDate || "Not available"} color="rose" />
                        <DetailItem icon={<FaMoneyBillWave />} label="Annual Fee Structure" value={university.fees || "Contact for details"} color="emerald" />
                        
                        {university.website && (
                          <a 
                            href={university.website.startsWith('http') ? university.website : `https://${university.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 text-zinc-800 font-black text-xs uppercase tracking-widest group/link p-6 rounded-[1.5rem] bg-zinc-100 border border-zinc-200 w-full hover:bg-zinc-800 hover:text-white transition-all shadow-xl shadow-zinc-800/5"
                          >
                            <FaGlobe className="text-xl" />
                            <span>Official University Portal</span>
                            <FaArrowRight className="ml-auto group-hover/link:translate-x-2 transition-transform" />
                          </a>
                        )}
                     </div>

                     <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Academic Programs</h3>
                        {university.programs && university.programs.length > 0 ? (
                           <div className="grid grid-cols-1 gap-3">
                             {university.programs.map((program, index) => (
                               <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-zinc-200 hover:shadow-lg transition-all group/item">
                                 <FaCheckCircle className="text-zinc-500 group-hover/item:text-zinc-800 transition-colors" />
                                 <span className="text-sm font-bold text-slate-700">{program}</span>
                               </div>
                             ))}
                           </div>
                        ) : (
                          <div className="bg-slate-50 p-10 rounded-[2rem] text-center border border-dashed border-slate-200">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Updating Program Data...</p>
                          </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-slate-200/40 border border-slate-100">
               <div className="flex items-center justify-between mb-16">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-900 rounded-[1.8rem] flex items-center justify-center text-white text-2xl shadow-2xl shadow-slate-900/20">
                      <FaCommentDots />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Student Reviews</h2>
                      <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mt-2">
                        Community Insights • {comments.length} Reviews
                      </p>
                    </div>
                  </div>
               </div>

                {user ? (
                  <form onSubmit={handleAddComment} className="mb-20">
                     <div className="relative group">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Your feedback helps other students choose correctly..."
                          className="w-full bg-slate-50 border-2 border-transparent rounded-[2.5rem] p-10 min-h-[180px] focus:bg-white focus:border-zinc-200 focus:shadow-2xl focus:shadow-zinc-600/5 outline-none transition-all font-medium text-slate-700 resize-none shadow-inner"
                        />
                        <button
                          type="submit"
                          disabled={submittingComment || !commentText.trim()}
                          className="absolute bottom-6 right-6 bg-zinc-800 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-zinc-900 disabled:opacity-50 transition-all shadow-2xl shadow-zinc-800/30 active:scale-95 flex items-center gap-4"
                        >
                          {submittingComment ? "Posting..." : <><FaPaperPlane /> Submit Review</>}
                        </button>
                     </div>
                  </form>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 text-slate-800 p-12 rounded-[2.5rem] mb-20 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-600/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform" />
                     <h4 className="text-2xl font-black text-slate-900 mb-4 relative z-10">Sign in to share your experience</h4>
                     <p className="text-slate-500 font-medium mb-10 relative z-10 max-w-sm">Help the Peshawar student community by providing authentic feedback about this institution.</p>
                     <button 
                       onClick={() => navigate("/login")} 
                       className="bg-zinc-800 text-white px-12 py-5 rounded-[1.5rem] font-black text-xs tracking-widest uppercase hover:bg-zinc-900 transition-all shadow-2xl shadow-zinc-800/20 relative z-10"
                     >
                       Login Now
                     </button>
                  </div>
                )}

               <div className="space-y-8">
                 {comments.length > 0 ? (
                   comments.map((comment) => (
                    <div key={comment._id} className="flex flex-col sm:flex-row gap-8 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-zinc-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group">
                       <div className="flex-shrink-0">
                         <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-200 group-hover:text-zinc-800 transition-colors">
                           <FaUserCircle className="text-5xl" />
                         </div>
                       </div>
                       <div className="flex-grow">
                         <div className="flex items-center justify-between mb-4">
                            <div>
                               <h4 className="font-black text-slate-900 text-base">{comment.userName}</h4>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                  {new Date(comment.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                               </p>
                            </div>
                            
                            {(user?._id === (comment.user?._id || comment.user)) && (
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                disabled={deletingId === comment._id}
                                className="w-10 h-10 rounded-xl bg-white text-slate-300 hover:text-red-500 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                              >
                                {deletingId === comment._id ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent animate-spin rounded-full" /> : <FaTrash size={14} />}
                              </button>
                            )}
                         </div>
                         <p className="text-slate-600 font-medium leading-relaxed text-lg">{comment.text}</p>
                       </div>
                    </div>
                  ))
                 ) : (
                   <div className="text-center py-20">
                      <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                         <FaCommentDots size={30} />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">No reviews yet. Be the first!</p>
                   </div>
                 )}
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 text-slate-800 relative overflow-hidden shadow-xl shadow-slate-200/20">
               <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-600/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-zinc-800">Institutional Facts</h4>
               <div className="space-y-12">
                  <SidebarItem icon="S" label="University Sector" value={university.type} color="blue" />
                  <SidebarItem icon="C" label="Campus Location" value={university.city} color="emerald" />
                  <SidebarItem icon="P" label="Region/Province" value={university.province || "KPK"} color="amber" />
                  <SidebarItem icon="V" label="Data Status" value="Verified" color="rose" />
               </div>
            </div>
            
            <div className="bg-zinc-800 rounded-[3rem] p-12 text-white shadow-2xl shadow-zinc-800/30 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
               <FaUniversity className="text-5xl mb-8 opacity-30" />
               <h4 className="text-3xl font-black mb-4 tracking-tighter leading-tight">Need expert guidance?</h4>
               <p className="text-zinc-200 font-medium mb-10 leading-relaxed">
                 Our team can help you with admission applications and scholarship opportunities in KPK.
               </p>
               <button className="w-full bg-white text-zinc-800 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-xl active:scale-95">
                 Contact Counselor
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl transition-all duration-500 ${
        color === 'rose' ? 'bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white shadow-xl shadow-rose-500/5' : 
        'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white shadow-xl shadow-emerald-500/5'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{label}</p>
        <p className="text-xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-8 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black italic shadow-inner group-hover:scale-110 transition-transform ${
        color === 'blue' ? 'bg-zinc-600/10 text-zinc-800' : 
        color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 
        color === 'amber' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1">{label}</p>
        <p className="text-lg font-black text-slate-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
