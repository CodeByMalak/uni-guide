import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import UniversityCard from "../components/UniversityCard";
import SearchBar from "../components/SearchBar";
import { FaGraduationCap, FaFilter, FaTrophy, FaBuilding, FaGlobe } from "react-icons/fa";

export default function Universities() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [filterType, setFilterType] = useState(queryParams.get("type") || "All");
  const [filterCity, setFilterCity] = useState(queryParams.get("city") || "All");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("search", searchTerm);
        if (filterType !== "All") queryParams.append("type", filterType);
        if (filterCity !== "All") queryParams.append("city", filterCity);
        
        const res = await api.get(`/universities?${queryParams.toString()}`);
        setUniversities(res.data.universities || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Unable to connect to the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchUniversities();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filterType, filterCity]);

  // Compute some quick facts for stats display
  const publicCount = universities.filter(u => u.type === "Public").length;
  const privateCount = universities.filter(u => u.type === "Private").length;

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Modern Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider mb-6">
              <FaGraduationCap className="text-sm" /> Find Your Institution
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Explore KPK <br className="hidden md:inline" /> <span className="text-zinc-800">Academic Portal</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
              Discover verified HEC rankings, tuition fee schedules, academic programs, and genuine student reviews across Khyber Pakhtunkhwa.
            </p>
          </div>
          
          {/* Advanced Analytics/KPI Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full lg:w-[45%]">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Indexed Campuses</span>
                <span className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                  {universities.length}
                  <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest block mt-1">Institutions</span>
                </span>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Sector Division</span>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                    <FaBuilding className="text-slate-400 text-xs" /> {publicCount} Public
                  </span>
                  <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-1">
                    <FaGlobe className="text-slate-400 text-xs" /> {privateCount} Private
                  </span>
                </div>
             </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-16">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filterType={filterType} 
            setFilterType={setFilterType} 
            filterCity={filterCity}
            setFilterCity={setFilterCity}
          />
        </div>

        {/* Results Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-[460px] animate-pulse border border-slate-100 p-6 flex flex-col gap-5 shadow-sm">
                 <div className="h-44 bg-slate-100 rounded-2xl" />
                 <div className="h-6 w-3/4 bg-slate-100 rounded-lg" />
                 <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
                 <div className="h-10 w-full bg-slate-100 rounded-xl mt-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto px-10">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-black">!</div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Database Connection Offline</h3>
            <p className="text-slate-500 font-medium mb-8 text-sm">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all">
               Try Again
            </button>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-28 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto px-6">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">No Matches Found</h3>
            <p className="text-slate-400 text-sm font-medium max-w-md mx-auto leading-relaxed">
              We couldn't find any institutions matching your search. Try adjusting your filters or broadening your terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {universities.map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
