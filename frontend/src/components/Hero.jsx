import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Hero({ searchTerm, setSearchTerm, filterType, setFilterType }) {
  const navigate = useNavigate();

  const scrollToUniversities = () => {
    const element = document.getElementById("universities-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on Home page, navigate to Universities page
      navigate("/universities");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-6 bg-[#0a192f] overflow-hidden">
      {/* Dynamic Background Elements - Educational Indigo/Navy */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-sm font-bold mb-10 animate-fadeIn shadow-lg shadow-indigo-500/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="tracking-wide uppercase">Institutional Guide 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.05]">
          Your Gateway to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-500 to-amber-300">
            Higher Education in KPK
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-indigo-100/70 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
          UniSelector empowers students with verified data on programs, fee structures, 
          and admission cycles from KPK's leading academic institutions.
        </p>

        {/* Integrated Search Bar with extra polish */}
        <div className="max-w-3xl mx-auto mb-14 transform hover:scale-[1.01] transition-all duration-500 ease-out">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </div>

        {/* CTA Buttons with enhanced styles */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={scrollToUniversities}
            className="w-full sm:w-auto bg-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all active:scale-95 flex items-center justify-center group"
          >
            Start Exploring
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button
            onClick={() => navigate("/universities")}
            className="w-full sm:w-auto border border-white/10 bg-white/5 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 flex items-center justify-center group"
          >
            All Universities
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        
        {/* Quick Stats or Trust Badges */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">50+</span>
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Verified Institutions</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">500+</span>
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Active Programs</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">100%</span>
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Free to Access</span>
           </div>
        </div>
      </div>
    </section>
  );
}
