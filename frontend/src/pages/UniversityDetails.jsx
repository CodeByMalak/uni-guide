import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import {
  FaHeart, FaRegHeart, FaCommentDots, FaPaperPlane,
  FaUserCircle, FaChevronLeft, FaGlobe, FaCalendarAlt,
  FaMoneyBillWave, FaUniversity, FaTrash, FaCheckCircle, FaArrowRight, FaTrophy
} from "react-icons/fa";
import ProgramTable from "../components/ProgramTable";

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
  const [activeTab, setActiveTab] = useState("overview");

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <button
            className="group flex items-center gap-3 text-slate-400 hover:text-slate-800 transition-all font-black text-[10px] tracking-[0.25em] uppercase"
            onClick={() => navigate(-1)}
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:border-slate-200 group-hover:bg-slate-55 transition-all shadow-sm">
               <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Explore
          </button>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => toggleFavorite(university._id)}
              className={`flex items-center gap-3.5 px-8 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-wider transition-all border shadow-sm ${
                isFavorited 
                  ? "bg-white border-pink-100 text-pink-500 hover:bg-pink-50/20" 
                  : "bg-white border-slate-100 text-slate-500 hover:border-pink-200 hover:text-pink-500 hover:bg-pink-50/10"
              }`}
            >
              {isFavorited ? <FaHeart className="text-pink-500" /> : <FaRegHeart className="text-slate-400" />}
              <span>{isFavorited ? "Saved to Profile" : "Save to Favorites"}</span>
            </button>
          </div>
        </div>

        {/* Brand Banner Hero */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-12">
          <div className="h-96 relative bg-slate-900">
            <img 
              src={university.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
              alt={university.name}
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-10 left-8 right-8 text-left">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                 <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
                   {university.type} Sector
                 </span>
                 <span className="bg-emerald-500/90 text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                   <FaCheckCircle className="text-[10px]" /> Verified Data
                 </span>
                 {university.rankingHEC && university.rankingHEC !== "Not Ranked" && (
                   <span className="bg-amber-500 text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                     <FaTrophy className="text-[10px]" /> HEC: {university.rankingHEC}
                   </span>
                 )}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
                 {university.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Left Details Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              
              {/* Modern Custom Tabs */}
              <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "programs", label: `Programs & Fees (${university.programs?.length || 0})` },
                  { id: "reviews", label: `Reviews & Feedback (${comments.length})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-2xl text-[12px] font-extrabold tracking-wide uppercase transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white text-slate-900 border border-slate-100 shadow-sm"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8 md:p-10 text-left">
                
                {/* Active Tab: Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-10 animate-fadeIn">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-3 bg-slate-900 rounded-full" />
                        About this Institution
                      </h3>
                      <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                        {university.description || "A premier educational institution in Khyber Pakhtunkhwa, dedicated to academic excellence, research, and fostering the next generation of leaders."}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-slate-50 space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <DetailItem icon={<FaCalendarAlt />} label="Admission Deadline" value={university.lastDate || "Not available"} color="rose" />
                         <DetailItem icon={<FaMoneyBillWave />} label="Annual Fee Structure" value={university.fees || "Contact for details"} color="emerald" />
                      </div>

                      {university.website && (
                        <a 
                          href={university.website.startsWith('http') ? university.website : `https://${university.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-slate-700 font-extrabold text-xs uppercase tracking-wider group/link p-5 rounded-2xl bg-slate-50 border border-slate-100 w-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm"
                        >
                          <FaGlobe className="text-lg" />
                          <span>Official University Portal</span>
                          <FaArrowRight className="ml-auto group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Active Tab: Programs */}
                {activeTab === "programs" && (
                  <div className="space-y-6 animate-fadeIn">
                     <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                       <div className="w-1.5 h-3 bg-slate-900 rounded-full" />
                       Academic Programs & Tuition
                     </h3>
                     {university.programs && university.programs.length > 0 ? (
                        <ProgramTable programs={university.programs} />
                     ) : (
                       <div className="bg-slate-50 p-10 rounded-2xl text-center border border-slate-100">
                         <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Updating Program Data...</p>
                       </div>
                     )}
                  </div>
                )}

                {/* Active Tab: Reviews */}
                {activeTab === "reviews" && (
                  <div className="space-y-8 animate-fadeIn">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                       <div className="w-1.5 h-3 bg-slate-900 rounded-full" />
                       Community Insights ({comments.length})
                     </h3>
                     
                     {user ? (
                        <form onSubmit={handleAddComment} className="mb-10 pt-2">
                           <div className="relative group">
                              <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Your feedback helps other students choose correctly..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 min-h-[140px] focus:bg-white focus:border-slate-200 focus:shadow-md outline-none transition-all font-medium text-slate-700 resize-none"
                              />
                              <button
                                type="submit"
                                disabled={submittingComment || !commentText.trim()}
                                className="absolute bottom-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md active:scale-95 flex items-center gap-2"
                              >
                                {submittingComment ? "Posting..." : <><FaPaperPlane /> Post Review</>}
                              </button>
                           </div>
                        </form>
                      ) : (
                        <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center">
                           <h4 className="font-extrabold text-slate-800 text-base mb-2">Sign in to share your experience</h4>
                           <p className="text-slate-400 text-xs font-medium mb-6">Help the community by providing authentic reviews about this institution.</p>
                           <button 
                             onClick={() => navigate("/login")} 
                             className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-slate-800 transition-all shadow-md"
                           >
                             Login Now
                           </button>
                        </div>
                      )}

                     <div className="space-y-6">
                       {comments.length > 0 ? (
                         comments.map((comment) => (
                          <div key={comment._id} className="flex gap-4 p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300 group">
                             <div className="flex-shrink-0">
                               <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 font-extrabold">
                                 {comment.userName?.charAt(0).toUpperCase() || <FaUserCircle size={24} />}
                               </div>
                             </div>
                             <div className="flex-grow">
                               <div className="flex items-center justify-between mb-2">
                                  <div>
                                     <h4 className="font-black text-slate-800 text-sm">{comment.userName}</h4>
                                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        {new Date(comment.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                                     </p>
                                  </div>
                                  
                                  {(user?._id === (comment.user?._id || comment.user)) && (
                                    <button
                                      onClick={() => handleDeleteComment(comment._id)}
                                      disabled={deletingId === comment._id}
                                      className="w-8 h-8 rounded-lg bg-white text-slate-300 hover:text-red-500 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-55"
                                    >
                                      {deletingId === comment._id ? <div className="w-3 h-3 border-2 border-red-500 border-t-transparent animate-spin rounded-full" /> : <FaTrash size={12} />}
                                    </button>
                                  )}
                               </div>
                               <p className="text-slate-600 font-medium text-sm leading-relaxed">{comment.text}</p>
                             </div>
                          </div>
                        ))
                       ) : (
                         <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                               <FaCommentDots size={24} />
                            </div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">No reviews yet. Be the first to share feedback!</p>
                         </div>
                       )}
                     </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Right Sidebar Facts */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 relative overflow-hidden shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-wider mb-8 text-slate-400 flex items-center gap-2">
                 <div className="w-1.5 h-3 bg-slate-900 rounded-full" />
                 Institutional Facts
               </h4>
               <div className="space-y-8">
                  <SidebarItem icon="S" label="University Sector" value={university.type} color="blue" />
                  <SidebarItem icon="C" label="Campus Location" value={university.city} color="emerald" />
                  <SidebarItem icon="P" label="Region/Province" value={university.province || "KPK"} color="amber" />
                  <SidebarItem icon="V" label="HEC Category" value={university.rankingHEC || "Not Ranked"} color="rose" />
               </div>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-105 transition-transform duration-500" />
               <FaUniversity className="text-4xl mb-6 opacity-20" />
               <h4 className="text-2xl font-black mb-3 tracking-tight leading-tight">Need counseling?</h4>
               <p className="text-slate-300 text-xs font-medium mb-8 leading-relaxed">
                 Get direct support with admission procedures, required certifications, and scholarship opportunities in KPK.
               </p>
               <button className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-md active:scale-95">
                 Contact Guide
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
    <div className="flex items-center gap-4 group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 shadow-sm ${
        color === 'rose' ? 'bg-rose-50 text-rose-500/90' : 'bg-emerald-50 text-emerald-600/90'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-base font-extrabold text-slate-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold italic shadow-inner group-hover:scale-105 transition-transform duration-300 ${
        color === 'blue' ? 'bg-slate-100 text-slate-700' : 
        color === 'emerald' ? 'bg-emerald-55 text-emerald-600' : 
        color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-500'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-extrabold text-slate-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
