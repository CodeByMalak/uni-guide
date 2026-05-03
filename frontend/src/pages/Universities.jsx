import { useEffect, useState } from "react";
import api from "../api/api";
import UniversityCard from "../components/UniversityCard";
import SearchBar from "../components/SearchBar";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("search", searchTerm);
        if (filterType !== "All") queryParams.append("type", filterType);
        
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
  }, [searchTerm, filterType]);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Explore All Universities
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
            Find the perfect institution for your higher education journey. Filter by sector or search by name and city.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              filterType={filterType} 
              setFilterType={setFilterType} 
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] h-96 animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-[2.5rem] border border-red-100">
            <p className="text-red-600 font-bold text-xl mb-2">Oops! Something went wrong</p>
            <p className="text-red-500">{error}</p>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-40">
            <div className="inline-block p-10 bg-slate-100 rounded-full mb-6">
               <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
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
