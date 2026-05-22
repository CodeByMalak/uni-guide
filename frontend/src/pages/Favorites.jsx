import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import UniversityCard from "../components/UniversityCard";
import { FaHeart, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await api.get("/favorites");
        setFavorites(res.data.favorites || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Unable to load your favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-40 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-zinc-200">
           <div className="w-20 h-20 bg-zinc-100 text-zinc-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-inner border border-zinc-200">
             <FaHeart className="opacity-50" />
           </div>
           <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Your Favorites</h2>
           <p className="text-slate-500 font-medium mb-10 leading-relaxed">
             Sign in to save and manage your favorite universities in KPK.
           </p>
           <Link to="/login" className="block bg-zinc-800 text-white py-4 rounded-2xl font-black text-sm tracking-wide uppercase hover:bg-zinc-900 transition-all shadow-xl shadow-zinc-800/20 active:scale-95">
             Sign In Now
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-xl shadow-sm border border-pink-100">
                <FaHeart />
              </div>
              <span className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.2em]">Saved for Later</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">My Favorites</h1>
            <p className="text-slate-500 font-medium mt-3 text-lg">
              Manage the academic institutions you've shortlisted.
            </p>
          </div>
          
          <div className="bg-white px-6 py-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center space-x-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Total Saved</p>
              <p className="text-2xl font-black text-zinc-800 leading-none">{favorites.length}</p>
            </div>
            <div className="w-px h-8 bg-zinc-200"></div>
            <FaGraduationCap className="text-zinc-300 text-2xl" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] h-[500px] animate-pulse border border-zinc-200/50 shadow-sm"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
            <p className="text-red-500 font-bold">{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-zinc-300">
            <div className="w-20 h-20 bg-zinc-100 text-zinc-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-8">
              <FaHeart />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No favorites yet</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10">
              Explore universities and click the heart icon to save them to your personal list.
            </p>
            <Link to="/universities" className="inline-flex items-center space-x-2 bg-zinc-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-900 transition-all shadow-xl shadow-zinc-800/20 active:scale-95">
              <span>Browse Universities</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
