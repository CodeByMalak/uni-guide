import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import UniversityCard from "../components/UniversityCard";

function Home() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/universities");
        setUniversities(res.data.universities || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Unable to connect to the server. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUniversities = universities.filter((uni) => {
    const matchSearch = 
      uni.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      uni.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "All" || uni.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section containing SearchBar */}
      <Hero 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filterType={filterType} 
        setFilterType={setFilterType} 
      />

      {/* Main Content (Light Section) */}
      <section id="universities-section" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Explore Universities</h2>
            <div className="flex items-center text-slate-500 font-medium text-lg">
              <span className="w-8 h-1 bg-blue-500 rounded-full mr-3"></span>
              Found {filteredUniversities.length} universities matching your search
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <span className="text-slate-400 text-sm uppercase font-black tracking-widest">Sort By:</span>
            <select className="bg-transparent border-none focus:ring-0 text-slate-900 font-bold cursor-pointer">
              <option>Default</option>
              <option>Alphabetical</option>
              <option>Recently Added</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-[2.5rem] h-[550px] animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-red-50 rounded-[2.5rem] border border-red-100">
            <p className="text-red-600 font-black text-2xl mb-4 italic">Error Occurred</p>
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-40">
            <div className="inline-block p-10 bg-slate-100 rounded-full mb-8">
              <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">No results found</h3>
            <p className="text-slate-500 text-xl max-w-md mx-auto leading-relaxed">
              We couldn't find any universities matching "{searchTerm}". Try another city or keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredUniversities.map((uni) => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;