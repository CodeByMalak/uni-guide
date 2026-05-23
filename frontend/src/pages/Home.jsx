import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import UniversityCard from "../components/UniversityCard";
import { FaArrowRight, FaExclamationTriangle, FaGraduationCap, FaBuilding, FaBook, FaGlobe } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [stats, setStats] = useState({
    totalUniversities: 0,
    publicUniversities: 0,
    privateUniversities: 0,
    totalPrograms: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      if (filterType !== "All") queryParams.append("type", filterType);

      // Fetch all universities, limit to 6 for homepage display
      queryParams.append("limit", "20");

      const [uniRes, statsRes] = await Promise.all([
        api.get(`/universities?${queryParams.toString()}`),
        api.get('/stats')
      ]);

      setUniversities(uniRes.data.universities || []);
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterType]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
              A Better Way to <span className="text-zinc-800">Find Your Future</span>
            </h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Skip the confusion. We provide students with direct access to KPK's most accurate university database.
            </p>
          </div>

          {/* Redesigned Clean & Modern Stats Cards inside Feature Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-5xl mx-auto">
            {[
              { label: "Total Universities", value: stats.totalUniversities, icon: <FaGraduationCap className="text-slate-700 text-lg md:text-xl" />, bg: "bg-slate-100/80" },
              { label: "Public Unis", value: stats.publicUniversities, icon: <FaBuilding className="text-cyan-600 text-lg md:text-xl" />, bg: "bg-cyan-50/60" },
              { label: "Private Unis", value: stats.privateUniversities, icon: <FaGlobe className="text-amber-600 text-lg md:text-xl" />, bg: "bg-amber-50/60" },
              { label: "Total Programs", value: stats.totalPrograms, icon: <FaBook className="text-rose-600 text-lg md:text-xl" />, bg: "bg-rose-50/60" }
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-gray-300 p-5 rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-md hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{stat.value}+</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "KPK Regional Data",
                desc: "Detailed, verified data for 20 top universities across Peshawar and KPK — programs, fees, and deadlines in one place.",
                icon: "📍",
                color: "teal"
              },
              {
                title: "Smart Comparison",
                desc: "Compare programs, fees, and admission deadlines side-by-side to make the best choice.",
                icon: "⚖️",
                color: "cyan"
              },
              {
                title: "Real Student Reviews",
                desc: "Authentic feedback from the community to help you understand the actual campus environment.",
                icon: "⭐",
                color: "amber"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-12 rounded-[3rem] bg-white border border-zinc-200/60 hover:shadow-2xl hover:shadow-zinc-600/8 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-100 rounded-full -mr-16 -mt-16 transition-all group-hover:bg-zinc-200/60" />
                <div className="text-5xl mb-10 relative z-10 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Grid Section */}
      <section id="universities-section" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Featured Universities</h2>
            <p className="text-slate-500 font-medium text-lg">
              Top institutions across KPK — <span className="text-zinc-800 font-bold">{stats.totalUniversities} verified</span> universities with <span className="text-zinc-800 font-bold">{stats.totalPrograms}+</span> programs.
            </p>
          </div>

          <button
            onClick={() => navigate('/universities')}
            className="flex items-center gap-3 text-zinc-800 font-black hover:gap-5 transition-all duration-300 group text-lg"
          >
            Explore All <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] border border-zinc-200/50 h-[500px] animate-pulse p-8 flex flex-col gap-6 shadow-lg shadow-zinc-200/50">
                <div className="h-4 w-1/4 bg-zinc-100 rounded-full" />
                <div className="h-8 w-3/4 bg-zinc-100 rounded-xl" />
                <div className="h-4 w-1/2 bg-zinc-100 rounded-full" />
                <div className="flex-grow bg-zinc-100/50 rounded-2xl" />
                <div className="h-12 w-full bg-zinc-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-zinc-200 shadow-2xl shadow-zinc-300/30 max-w-2xl mx-auto px-10">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <FaExclamationTriangle />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Connection Issue</h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">{error}</p>
            <button
              onClick={fetchData}
              className="bg-zinc-800 text-white px-10 py-5 rounded-2xl font-bold hover:bg-zinc-900 transition-all shadow-xl shadow-zinc-800/20 active:scale-95"
            >
              Try Reconnecting
            </button>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-zinc-200 shadow-xl shadow-zinc-300/20">
            <div className="w-24 h-24 bg-zinc-100 text-zinc-300 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No Universities Found</h3>
            <p className="text-slate-500 text-xl max-w-md mx-auto leading-relaxed font-medium px-6">
              Our database is currently expanding. Try clearing your filters or check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.slice(0, 6).map((uni) => (
                <UniversityCard key={uni._id} university={uni} />
              ))}
            </div>
            {/* Program count banner */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {[
                { label: "Public Universities", value: universities.filter(u => u.type === "Public").length },
                { label: "Private Universities", value: universities.filter(u => u.type === "Private").length },
                { label: "Total Programs Listed", value: universities.reduce((s, u) => s + (u.programs?.length || 0), 0) + "+" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3">
                  <span className="text-xl font-black text-slate-900">{item.value}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-24 text-center">
              <div className="inline-flex flex-col items-center gap-8">
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                  Showing top picks for your education
                </p>
                <button
                  onClick={() => navigate('/universities')}
                  className="group relative inline-flex items-center gap-6 bg-zinc-800 text-white px-16 py-6 rounded-[2rem] font-black text-xl transition-all hover:bg-zinc-900 shadow-xl shadow-zinc-800/25 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">View More Universities</span>
                  <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;