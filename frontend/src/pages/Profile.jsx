import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaUniversity } from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header/Banner */}
          <div className="h-48 bg-gradient-to-r from-indigo-600 to-blue-500 relative">
            <div className="absolute -bottom-16 left-12">
              <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl">
                <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-5xl text-indigo-600 font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{user.name}</h1>
                <p className="text-indigo-600 font-bold">Student Member</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Account Details</h3>
                
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Email Address</p>
                    <p className="text-slate-700 font-bold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Member Since</p>
                    <p className="text-slate-700 font-bold">{new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 text-center">
                    <p className="text-3xl font-black text-indigo-600 mb-1">{user.favorites?.length || 0}</p>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Favorites</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 text-center">
                    <p className="text-3xl font-black text-blue-600 mb-1">0</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Comments</p>
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
