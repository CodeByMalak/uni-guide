import { useEffect, useState } from "react";
import api from "../api/api";
import UniversityCard from "../components/UniversityCard";
import SearchBar from "../components/SearchBar";
import { FaGraduationCap } from "react-icons/fa";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCity, setFilterCity] = useState("All");

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

  return (
    <div className="bg-[#f0fdfa] min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-teal-100">
              <FaGraduationCap /> Find Your Institution
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              Explore All <span className="text-teal-600">KPK Universities</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium leading-relaxed">
              We've gathered data from across Khyber Pakhtunkhwa to help you find the right degree and campus.
            </p>
          </div>
          
          <div className="md:w-1/2 lg:w-1/3">
             <div className="bg-white p-8 rounded-[2.5rem] border border-teal-100/60 shadow-xl shadow-teal-200/30">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-2">Currently Indexing</p>
                <p className="text-4xl font-black text-slate-900">{universities.length} <span className="text-teal-600">Unis</span></p>
             </div>
          </div>
        </div>

        <div className="mb-20">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filterType={filterType} 
            setFilterType={setFilterType} 
            filterCity={filterCity}
            setFilterCity={setFilterCity}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[3rem] h-[500px] animate-pulse border border-teal-100/50 p-10 flex flex-col gap-6 shadow-xl shadow-teal-100/50">
                 <div className="h-48 bg-teal-50/60 rounded-[2rem]" />
                 <div className="h-6 w-3/4 bg-teal-50/60 rounded-full" />
                 <div className="h-4 w-1/2 bg-teal-50/60 rounded-full" />
                 <div className="mt-auto h-14 bg-teal-50/60 rounded-[1.5rem]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-red-100 shadow-2xl shadow-red-500/5">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-3xl italic font-black">!</div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Database Connection Offline</h3>
            <p className="text-slate-500 font-medium mb-10">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-teal-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-600/20 hover:bg-teal-700 transition-all">
               Try Again
            </button>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-teal-100 shadow-xl shadow-teal-200/20">
            <div className="w-24 h-24 bg-teal-50 text-teal-200 rounded-full flex items-center justify-center mx-auto mb-8">
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No Matches Found</h3>
            <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">We couldn't find any institutions matching those filters. Try searching for something broader.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn">
            {universities.map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
