import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaEnvelope, FaCalendarAlt, FaHeart, FaCommentDots,
  FaTrash, FaUniversity, FaUserEdit, FaSignOutAlt, FaCheck, FaTimes, FaMapMarkerAlt
} from "react-icons/fa";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [userComments, setUserComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState("info"); // "info" | "comments" | "favorites"
  
  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
      if (user.comments) {
        setUserComments(user.comments);
      } else {
        fetchProfileData();
      }
    }
  }, [user]);

  const fetchProfileData = async () => {
    setLoadingComments(true);
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
      if (res.data.comments) {
        setUserComments(res.data.comments);
      }
    } catch (err) {
      console.error("Failed to fetch profile data", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    setDeletingId(commentId);
    try {
      await api.delete(`/comments/${commentId}`);
      setUserComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      const res = await api.put("/auth/profile", formData);
      setUser(prev => ({ ...prev, ...res.data }));
      setIsEditing(false);
    } catch (err) {
      setEditError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-bold">Loading your profile…</p>
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ───────── Profile Header ───────── */}
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/40 overflow-hidden mb-12">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="px-12 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 -mt-20 mb-8">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2.5rem] bg-white border-8 border-white shadow-2xl flex items-center justify-center text-blue-600 text-5xl font-black relative z-10">
                  {initials}
                </div>
                <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${
                    isEditing 
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20"
                  }`}
                >
                  {isEditing ? <><FaTimes /> Cancel</> : <><FaUserEdit /> Edit Profile</>}
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-8 py-4 rounded-[1.5rem] border-2 border-red-50 text-red-500 hover:bg-red-50 text-sm font-black uppercase tracking-widest transition-all"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[1.2rem] px-6 py-4 font-bold focus:border-blue-500 focus:bg-white outline-none transition-all"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[1.2rem] px-6 py-4 font-bold focus:border-blue-500 focus:bg-white outline-none transition-all"
                    required
                  />
                </div>
                {editError && <p className="text-red-500 text-xs font-bold col-span-2">{editError}</p>}
                <div className="col-span-2">
                  <button 
                    type="submit" 
                    disabled={editLoading}
                    className="bg-emerald-500 text-white px-10 py-4 rounded-[1.2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-emerald-500/20"
                  >
                    {editLoading ? "Saving..." : <><FaCheck /> Save Profile</>}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{user.name}</h1>
                <div className="flex items-center gap-4 text-slate-400">
                   <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
                      <FaGraduationCap /> Student Member
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                      <FaMapMarkerAlt /> Peshawar, KPK
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ───────── Content Area ───────── */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Stats */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl shadow-slate-200/20">
               <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Account Overview</h3>
               <div className="space-y-6">
                 <StatItem icon={<FaHeart className="text-pink-500" />} label="Favorites" value={user.favorites?.length || 0} />
                 <StatItem icon={<FaCommentDots className="text-blue-500" />} label="Reviews" value={userComments.length} />
                 <StatItem icon={<FaCalendarAlt className="text-amber-500" />} label="Joined" value={new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} />
               </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-[2.5rem] p-10 text-slate-800 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-black text-slate-900 mb-4 relative z-10">Need Help?</h3>
               <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 relative z-10">
                 Explore universities and save them to your favorites to get the latest admission alerts.
               </p>
               <button onClick={() => navigate('/universities')} className="bg-blue-600 text-white px-8 py-4 rounded-[1.2rem] font-black text-xs uppercase tracking-widest relative z-10 hover:bg-blue-700 shadow-lg shadow-blue-600/10 transition-colors">
                  Browse All
               </button>
            </div>
          </div>

          {/* Main Content / Tabs */}
          <div className="lg:w-2/3">
             <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden min-h-[500px]">
                <div className="flex border-b border-slate-100">
                  {['info', 'comments', 'favorites'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-8 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                        activeTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab === 'info' ? 'My Information' : tab === 'comments' ? `My Reviews (${userComments.length})` : 'My Favorites'}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-12">
                   {activeTab === 'info' && (
                     <div className="space-y-10 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <InfoGroup label="Email Address" value={user.email} icon={<FaEnvelope />} />
                           <InfoGroup label="Full Name" value={user.name} icon={<FaUserEdit />} />
                           <InfoGroup label="Account Status" value="Verified Member" icon={<FaCheck />} />
                           <InfoGroup label="Location" value="Peshawar, KPK" icon={<FaUniversity />} />
                        </div>
                        <div className="pt-10 border-t border-slate-50">
                           <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Security</h4>
                           <button className="text-blue-600 font-bold text-sm hover:underline">Update Password & Security Settings</button>
                        </div>
                     </div>
                   )}

                   {activeTab === 'comments' && (
                     <div className="animate-fadeIn">
                        {loadingComments ? (
                          <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                          </div>
                        ) : userComments.length === 0 ? (
                          <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
                               <FaCommentDots size={30} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No Reviews Yet</h3>
                            <p className="text-slate-400 font-medium mb-8">Share your thoughts to help other students.</p>
                            <button onClick={() => navigate('/universities')} className="bg-blue-600 text-white px-10 py-4 rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/25">
                               Start Exploring
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-8">
                             {userComments.map(comment => (
                               <div key={comment._id} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                                  <div className="flex items-center justify-between mb-4">
                                     <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-lg">
                                           {initials}
                                        </div>
                                        <div>
                                           <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                              {comment.university?.name || "Deleted University"}
                                           </h4>
                                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                              {new Date(comment.createdAt).toLocaleDateString()}
                                           </p>
                                        </div>
                                     </div>
                                     <button 
                                        onClick={() => handleDeleteComment(comment._id)}
                                        disabled={deletingId === comment._id}
                                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100 hover:bg-red-50 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                     >
                                        {deletingId === comment._id ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent animate-spin rounded-full" /> : <FaTrash size={14} />}
                                     </button>
                                  </div>
                                  <p className="text-slate-600 font-medium leading-relaxed">{comment.text}</p>
                               </div>
                             ))}
                          </div>
                        )}
                     </div>
                   )}

                   {activeTab === 'favorites' && (
                     <div className="animate-fadeIn">
                        {!user.favorites || user.favorites.length === 0 ? (
                          <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
                               <FaHeart size={30} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No Favorites Yet</h3>
                            <p className="text-slate-400 font-medium mb-8">Save universities to see them here.</p>
                            <button onClick={() => navigate('/universities')} className="bg-blue-600 text-white px-10 py-4 rounded-[1.2rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20">
                               Explore Unis
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {user.favorites.map(uni => (
                               <div key={uni._id} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col gap-4">
                                  <h4 className="font-black text-slate-900 line-clamp-1">{uni.name}</h4>
                                  <div className="flex items-center justify-between mt-auto">
                                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{uni.type}</span>
                                     <button onClick={() => navigate(`/university/${uni._id}`)} className="text-xs font-black text-slate-400 hover:text-blue-600 transition-colors">Details</button>
                                  </div>
                                </div>
                             ))}
                          </div>
                        )}
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg">
             {icon}
          </div>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-xl font-black text-slate-900">{value}</span>
    </div>
  );
}

function InfoGroup({ label, value, icon }) {
  return (
    <div>
       <div className="flex items-center gap-3 mb-3 text-blue-500">
          {icon}
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
       </div>
       <p className="text-lg font-black text-slate-900 pl-7">{value}</p>
    </div>
  );
}
