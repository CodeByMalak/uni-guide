import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown, FaCompass, FaUniversity } from "react-icons/fa";
import campusBg from "../assets/campus_bg.png";

export default function Hero({ searchTerm, setSearchTerm, filterType, setFilterType, filterCity, setFilterCity }) {
  const navigate = useNavigate();

  const cities = ["All", "Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat", "Haripur", "Mansehra", "Nowshera", "Swabi", "Bannu", "D.I. Khan"];

  const scrollToUniversities = () => {
    const element = document.getElementById("universities-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/universities");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${campusBg})` }}
      />

      {/* Dark charcoal overlay — matches navbar zinc-900 */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/70 to-zinc-950/90" />

      {/* Main Content — vertically centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-8">

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5 drop-shadow-xl">
          Institutional Guide 2026
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-zinc-300 mb-6">
          The Smart Way to Choose Your University in KPK
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          UniSelector empowers students with verified data on programs, fee structures,
          and admission cycles from KPK's leading academic institutions.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/40 overflow-hidden border border-white/20">
            <div className="flex items-center flex-grow pl-5 gap-3">
              <FaSearch className="text-zinc-400 text-sm flex-shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent border-none focus:ring-0 outline-none text-zinc-800 placeholder-zinc-400 text-sm sm:text-base font-medium py-4"
                placeholder="Search by university name or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              />
            </div>
            <div className="p-2">
              <button
                onClick={scrollToUniversities}
                className="px-7 py-3 rounded-xl font-black text-sm text-white transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #3f3f46 0%, #18181b 100%)" }}
              >
                Search Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Filter Bar — pinned to bottom */}
      <div className="relative z-10 w-full border-t border-zinc-700/60 bg-zinc-900/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-zinc-700/50">

          {/* City Filter */}
          <div className="flex flex-col gap-1.5 px-6 first:pl-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Filters:</span>
            <div className="flex items-center gap-2 group cursor-pointer">
              <select
                value={filterCity || "All"}
                onChange={(e) => setFilterCity && setFilterCity(e.target.value)}
                className="bg-transparent border-none focus:ring-0 outline-none text-white font-bold text-sm cursor-pointer appearance-none group-hover:text-zinc-300 transition-colors"
              >
                {cities.map(city => (
                  <option key={city} value={city} className="bg-zinc-900 text-zinc-200">
                    {city === "All" ? "Everywhere" : city}
                  </option>
                ))}
              </select>
              <FaChevronDown className="text-zinc-500 text-[9px] flex-shrink-0" />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col gap-1.5 px-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Filters</span>
            <div className="flex items-center gap-2 group cursor-pointer">
              <select
                value={filterType}
                onChange={(e) => setFilterType && setFilterType(e.target.value)}
                className="bg-transparent border-none focus:ring-0 outline-none text-white font-bold text-sm cursor-pointer appearance-none group-hover:text-zinc-300 transition-colors"
              >
                <option value="All" className="bg-zinc-900 text-zinc-200">All Sectors</option>
                <option value="Public" className="bg-zinc-900 text-zinc-200">Public</option>
                <option value="Private" className="bg-zinc-900 text-zinc-200">Private</option>
              </select>
              <FaChevronDown className="text-zinc-500 text-[9px] flex-shrink-0" />
            </div>
          </div>

          {/* CTA 1 */}
          <div className="flex flex-col gap-1.5 px-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Filters</span>
            <button
              onClick={scrollToUniversities}
              className="flex items-center gap-2 text-white font-bold text-sm text-left hover:text-zinc-300 transition-colors group"
            >
              <FaCompass className="text-zinc-500 group-hover:text-zinc-300 transition-colors text-xs flex-shrink-0" />
              Start Exploring...
            </button>
          </div>

          {/* CTA 2 */}
          <div className="flex flex-col gap-1.5 px-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Quick Links</span>
            <button
              onClick={() => navigate("/universities")}
              className="flex items-center gap-2 text-white font-bold text-sm text-left hover:text-zinc-300 transition-colors group"
            >
              <FaUniversity className="text-zinc-500 group-hover:text-zinc-300 transition-colors text-xs flex-shrink-0" />
              All Universities
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
