import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function UniversityCard({ university }) {
  const { user, toggleFavorite } = useAuth();
  const isFavorited = user?.favorites?.some(id => id.toString() === university._id.toString());

  return (
    <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
      {/* Favorite Button */}
      <button 
        onClick={() => toggleFavorite(university._id)}
        className="absolute top-6 right-6 z-20 p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all active:scale-90"
      >
        {isFavorited ? (
          <FaHeart className="text-pink-500 text-xl" />
        ) : (
          <FaRegHeart className="text-slate-300 text-xl hover:text-pink-400" />
        )}
      </button>

      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-500/10 transition-all duration-500"></div>

      <div className="mb-8">
        <div className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] mb-6 ${
          university.type === "Public" 
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
            : "bg-indigo-50 text-indigo-700 border border-indigo-100"
        }`}>
          {university.type} Sector
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
          {university.name}
        </h3>
        <div className="flex items-center text-slate-500 text-sm font-semibold tracking-wide uppercase">
          <span className="mr-2 text-indigo-500">📍</span>
          {university.city}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-50 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Average Fees</div>
          <div className="text-slate-900 font-extrabold text-lg">{university.fees || "TBA"}</div>
        </div>

        <Link 
          to={`/university/${university._id}`}
          className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 text-sm tracking-wide uppercase shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          View Details 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
