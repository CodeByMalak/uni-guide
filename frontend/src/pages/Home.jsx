import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import UniversityCard from "../components/UniversityCard";

function Home() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
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
        setError("Unable to connect to the server. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section containing SearchBar */}
      <Hero 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filterType={filterType} 
        setFilterType={setFilterType} 
      />

      {/* Features Section */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Why Choose UniSelector?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              We provide the most reliable and up-to-date information to help you navigate your educational path in KPK.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Real-time Updates", 
                desc: "Get the latest admission dates and fee structures directly from university sources.",
                icon: "⚡",
                color: "amber"
              },
              { 
                title: "Detailed Programs", 
                desc: "Explore hundreds of degree programs across various fields and specialties.",
                icon: "📚",
                color: "indigo"
              },
              { 
                title: "Smart Filtering", 
                desc: "Easily find universities based on city, sector (Public/Private), and program availability.",
                icon: "🔍",
                color: "indigo"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                <div className={`w-14 h-14 ${feature.color === 'amber' ? 'bg-amber-500/10 text-amber-600' : 'bg-indigo-500/10 text-indigo-600'} text-2xl flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content (Light Section) */}
      <section id="universities-section" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Explore Universities</h2>
            <div className="flex items-center text-slate-500 font-medium text-lg">
              <span className="w-8 h-1 bg-blue-500 rounded-full mr-3"></span>
              Found {universities.length} universities matching your search
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
        ) : universities.length === 0 ? (
          <div className="text-center py-40">
            <div className="inline-block p-10 bg-slate-100 rounded-full mb-8">
              <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">No results found</h3>
            <p className="text-slate-500 text-xl max-w-md mx-auto leading-relaxed">
              We couldn't find any universities matching your criteria. Try another city, keyword, or sector.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.slice(0, 6).map((uni) => (
                <UniversityCard key={uni._id} university={uni} />
              ))}
            </div>
            
            {universities.length > 6 && (
              <div className="mt-16 text-center">
                <button 
                  onClick={() => navigate('/universities')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                  View All Universities
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Home;