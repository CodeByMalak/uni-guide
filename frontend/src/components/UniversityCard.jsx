import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaGraduationCap, FaArrowRight, FaMoneyBillWave, FaCalendarAlt, FaTrophy } from "react-icons/fa";

export default function UniversityCard({ university }) {
  const { user, toggleFavorite } = useAuth();
  const isFavorited = user?.favorites?.some(id => (id._id || id).toString() === university._id.toString());

  const isPublic = university.type === "Public";

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1.5 hover:border-slate-200 transition-all duration-500 flex flex-col h-full relative">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={university.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${
            isPublic ? "bg-slate-900/50 border-slate-700/30 text-white" : "bg-cyan-900/50 border-cyan-700/30 text-cyan-100"
          }`}>
            {university.type}
          </span>
          {university.rankingHEC && university.rankingHEC !== "Not Ranked" && (
            <span className="px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest bg-amber-500/90 border border-amber-400/40 text-white flex items-center gap-1.5 backdrop-blur-md shadow-sm">
              <FaTrophy className="text-[10px]" /> {university.rankingHEC.split(' ')[0]}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(university._id);
          }}
          className={`absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border z-10 ${
            isFavorited 
              ? "bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/25" 
              : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-pink-500 hover:border-white"
          }`}
        >
          {isFavorited ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 text-white/95 text-[10px] font-black uppercase tracking-widest">
            <FaMapMarkerAlt className="text-zinc-400" />
            {university.city}, {university.province}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-black text-slate-800 leading-tight mb-3 group-hover:text-slate-900 transition-colors line-clamp-2 min-h-[2.75rem]">
          {university.name}
        </h3>

        <p className="text-slate-400 text-xs leading-relaxed font-medium line-clamp-2 mb-4">
          {university.description || "A premier educational institution in Khyber Pakhtunkhwa, dedicated to academic excellence."}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4 mb-5">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Annual Fee</span>
            <div className="flex items-center gap-1.5 text-slate-700 font-bold">
              <FaMoneyBillWave className="text-slate-400 text-xs" />
              <span className="text-[12px] truncate">{university.fees?.split('–')[0] || "Check Portal"}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Deadline</span>
            <div className="flex items-center gap-1.5 text-slate-700 font-bold">
              <FaCalendarAlt className="text-rose-500/80 text-xs" />
              <span className="text-[12px] truncate">{university.lastDate || "TBA"}</span>
            </div>
          </div>
        </div>

        {/* Programs Count */}
        <div className="flex items-center gap-3 mb-5 mt-auto">
          <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
            <FaGraduationCap className="text-sm" />
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {university.programs?.length || 0} Academic Programs
          </span>
        </div>

        <div>
          <Link
            to={`/university/${university._id}`}
            className="w-full h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm active:scale-95 font-bold text-[10px] uppercase tracking-widest group/link"
          >
            <span>View Details</span>
            <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
