import { Link } from "react-router-dom";

export default function UniversityCard({ university }) {
  return (
    <div className="bg-slate-100 rounded-[2.5rem] p-8 sm:p-10 border border-white shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-500/10 transition-all duration-500"></div>

      <div className="mb-8">
        <div className={`inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.1em] mb-6 ${
          university.type === "Public" 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-blue-100 text-blue-700"
        }`}>
          {university.type}
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {university.name}
        </h3>
        <div className="flex items-center text-slate-500 text-lg font-medium">
          <span className="mr-2">📍</span>
          {university.city}
        </div>
      </div>

      <div className="mt-auto space-y-6">
        <div className="flex items-center justify-between py-4 border-t border-slate-200">
          <div className="text-slate-500 font-medium">Average Fees</div>
          <div className="text-slate-900 font-bold text-lg">{university.fees || "TBA"}</div>
        </div>

        <Link 
          to={`/university/${university._id}`}
          className="flex items-center justify-center w-full bg-transparent group-hover:bg-blue-600 border-2 border-slate-900 group-hover:border-blue-600 text-slate-900 group-hover:text-white font-black py-4 rounded-2xl transition-all duration-300 text-lg"
        >
          View Details 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
