import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaGraduationCap, FaArrowRight, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

export default function UniversityCard({ university }) {
  const { user, toggleFavorite } = useAuth();
  const isFavorited = user?.favorites?.some(id => (id._id || id).toString() === university._id.toString());

  const isPublic = university.type === "Public";

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-zinc-600/10 transition-all duration-500 flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={university.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border backdrop-blur-sm ${
            isPublic ? "bg-zinc-600/20 border-zinc-500/30 text-white" : "bg-cyan-500/20 border-cyan-400/30 text-white"
          }`}>
            {university.type}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(university._id);
          }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm border ${
            isFavorited 
              ? "bg-pink-500 border-pink-400 text-white shadow-lg shadow-pink-500/25" 
              : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-pink-500 hover:border-white"
          }`}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 text-white/95 text-[10px] font-black uppercase tracking-widest">
            <FaMapMarkerAlt className="text-zinc-400" />
            {university.city}, {university.province}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-6 group-hover:text-zinc-800 transition-colors line-clamp-2">
          {university.name}
        </h3>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Annual Fee</span>
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <FaMoneyBillWave className="text-zinc-600" />
              <span className="text-sm truncate">{university.fees?.split('–')[0] || "Check Site"}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Deadline</span>
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <FaCalendarAlt className="text-rose-500" />
              <span className="text-sm truncate">{university.lastDate || "TBA"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-zinc-100 text-zinc-800 text-[8px] font-black flex items-center justify-center">
                      PROG
                   </div>
                </div>
              ))}
           </div>
           <span className="text-xs font-bold text-slate-400">+{university.programs?.length || 0} Programs</span>
        </div>

        <div className="mt-auto">
          <Link
            to={`/university/${university._id}`}
            className="w-full h-14 rounded-2xl bg-zinc-800 text-white flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all shadow-md shadow-zinc-800/15 active:scale-95 font-black text-xs uppercase tracking-widest group/link"
          >
            <span>View Details</span>
            <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
