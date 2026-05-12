import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

export default function UniversityCard({ university }) {
  const { user, toggleFavorite } = useAuth();
  const isFavorited = user?.favorites?.some(id => id.toString() === university._id.toString());

  const isPublic = university.type === "Public";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Colored top accent bar */}
      <div className={`h-1.5 w-full ${isPublic ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row: badge + favorite */}
        <div className="flex items-start justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
            isPublic
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
          }`}>
            <FaGraduationCap className="text-[10px]" />
            {university.type}
          </span>

          <button
            onClick={() => toggleFavorite(university._id)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Toggle favorite"
          >
            {isFavorited ? (
              <FaHeart className="text-pink-500 text-lg" />
            ) : (
              <FaRegHeart className="text-slate-300 text-lg hover:text-pink-400" />
            )}
          </button>
        </div>

        {/* University name */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
          {university.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
          <FaMapMarkerAlt className="text-indigo-400 text-xs flex-shrink-0" />
          <span className="font-medium">{university.city}, KPK</span>
        </div>

        {/* Programs preview */}
        {university.programs && university.programs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {university.programs.slice(0, 3).map((prog, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                {prog}
              </span>
            ))}
            {university.programs.length > 3 && (
              <span className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                +{university.programs.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Divider + fee + CTA */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Avg. Fees</span>
            <span className="text-sm text-slate-800 font-bold">{university.fees || "TBA"}</span>
          </div>

          <Link
            to={`/university/${university._id}`}
            className={`flex items-center justify-center w-full py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-sm active:scale-95 ${
              isPublic
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
            }`}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
