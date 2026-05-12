import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaEnvelope, FaCalendarAlt, FaHeart, FaCommentDots,
  FaTrash, FaUniversity, FaUserEdit, FaSignOutAlt
} from "react-icons/fa";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userComments, setUserComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState("info"); // "info" | "comments"

  // Fetch all universities to find this user's comments
  useEffect(() => {
    if (!user) return;
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const res = await api.get("/universities");
        const allUnis = res.data.universities || [];
        const collected = [];
        allUnis.forEach((uni) => {
          (uni.comments || []).forEach((c) => {
            if (c.user === user._id || c.user?.toString() === user._id?.toString()) {
              collected.push({ ...c, universityName: uni.name, universityId: uni._id });
            }
          });
        });
        // Sort newest first
        collected.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUserComments(collected);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [user]);

  const handleDeleteComment = async (universityId, commentId) => {
    setDeletingId(commentId);
    try {
      await api.delete(`/universities/${universityId}/comment/${commentId}`);
      setUserComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
      alert("Could not delete comment. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500 font-medium">Loading your profile…</p>
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* ───────── Profile Header Card ───────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="px-6 pb-6">
            {/* Avatar overlapping banner */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-4">
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-indigo-600 text-3xl font-black">
                {initials}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-bold transition-all"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
            <p className="text-indigo-600 font-semibold text-sm mt-0.5">Student Member</p>
          </div>
        </div>

        {/* ───────── Stats Row ───────── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: <FaHeart className="text-pink-500" />, label: "Favorites", value: user.favorites?.length || 0, color: "pink" },
            { icon: <FaCommentDots className="text-indigo-500" />, label: "Comments", value: userComments.length, color: "indigo" },
            { icon: <FaUniversity className="text-teal-500" />, label: "Province", value: "KPK", color: "teal" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center">
              <div className="flex justify-center mb-2 text-xl">{stat.icon}</div>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ───────── Tabs ───────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            {[
              { id: "info", label: "Account Info" },
              { id: "comments", label: `My Comments (${userComments.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* ── Info Tab ── */}
            {activeTab === "info" && (
              <div className="space-y-4">
                <InfoRow icon={<FaEnvelope className="text-indigo-400" />} label="Email Address" value={user.email} />
                <InfoRow
                  icon={<FaCalendarAlt className="text-indigo-400" />}
                  label="Member Since"
                  value={new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                />
                <InfoRow icon={<FaUniversity className="text-indigo-400" />} label="Province" value="Khyber Pakhtunkhwa (KPK)" />

                <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-sm text-indigo-700 font-semibold">
                    💡 Save universities to your favorites list and use the comments to ask questions or share feedback!
                  </p>
                </div>
              </div>
            )}

            {/* ── Comments Tab ── */}
            {activeTab === "comments" && (
              <div>
                {loadingComments ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
                  </div>
                ) : userComments.length === 0 ? (
                  <div className="text-center py-16">
                    <FaCommentDots className="text-5xl text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold text-lg">No comments yet</p>
                    <p className="text-slate-400 text-sm mt-1">Visit a university page to leave your thoughts!</p>
                    <button
                      onClick={() => navigate("/universities")}
                      className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all"
                    >
                      Browse Universities
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userComments.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 font-black flex items-center justify-center text-sm flex-shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <button
                              onClick={() => navigate(`/university/${comment.universityId}`)}
                              className="text-xs font-bold text-indigo-600 hover:underline truncate"
                            >
                              🏫 {comment.universityName}
                            </button>
                            <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">
                              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                day: "numeric", month: "short", year: "numeric"
                              })}
                            </span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed">{comment.text}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(comment.universityId, comment._id)}
                          disabled={deletingId === comment._id}
                          className="flex-shrink-0 p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                          title="Delete comment"
                        >
                          {deletingId === comment._id ? (
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent animate-spin rounded-full" />
                          ) : (
                            <FaTrash className="text-sm" />
                          )}
                        </button>
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
  );
}

// Reusable row component
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</p>
        <p className="text-slate-800 font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}
