import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Hero({ searchTerm, setSearchTerm }) {
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
    <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-6 bg-slate-900 overflow-hidden">
      {/* Radial Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/15 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-sm font-bold mb-8 animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Explore 50+ Universities in KPK</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
          A Smart Platform for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400">
            Exploring Universities in KPK
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          The most comprehensive guide for students. Discover programs, check fee structures, and get real-time admission deadline alerts.
        </p>

        {/* Integrated Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 transform hover:scale-[1.02] transition-transform duration-300">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={scrollToUniversities}
            className="w-full sm:w-auto bg-white text-slate-900 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl shadow-white/10 active:scale-95 flex items-center justify-center group"
          >
            Get Started
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button
            onClick={() => navigate("/universities")}
            className="w-full sm:w-auto border-2 border-slate-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95"
          >
            Browse Universities
          </button>
        </div>
      </div>
    </section>
  );
}
