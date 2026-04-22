import { Link } from "react-router-dom";

export default function UniversityCard({ id, name, city }) {
  return (
    <Link 
      to={`/university/${id}`}
      state={{ scrollTo: "universities" }} // <-- pass section to scroll
      className="h-full"
    >
      <div className="h-full flex flex-col justify-between 
        bg-slate-100 rounded-xl p-6 
        shadow-md hover:shadow-xl 
        transition hover:-translate-y-1 border border-slate-200">

        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
            {name}
          </h3>
          <p className="text-sm text-slate-600">📍 {city}</p>
        </div>

        <span className="mt-4 text-sm text-blue-600 font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
}
