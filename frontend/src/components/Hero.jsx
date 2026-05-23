import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown, FaCompass, FaUniversity } from "react-icons/fa";
import campusBg from "../assets/campus_bg.png";

export default function Hero({ searchTerm, setSearchTerm, filterType, setFilterType, filterCity, setFilterCity }) {
  const navigate = useNavigate();

  const cities = ["All", "Abbottabad", "Bannu", "Buner", "Chakdara", "Charsadda", "Chitral", "D.I. Khan", "FR Kohat", "Haripur", "Karak", "Kohat", "Lakki Marwat", "Mansehra", "Mardan", "Nowshera", "Peshawar", "Shangla", "Swabi", "Swat"];

  const handleCityChange = (city) => {
    if (setFilterCity) {
      setFilterCity(city);
    } else {
      // Navigate to the full explorer with the city filter
      if (city && city !== "All") {
        navigate(`/universities?city=${city}`);
      } else {
        navigate(`/universities`);
      }
    }
  };

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
          UniSelection empowers students with verified data on programs, fee structures,
          and admission cycles from KPK's leading academic institutions.
        </p>

        {/* Search Bar & Actions */}
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
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

          {/* Quick Filters & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-2">
             <button 
               onClick={() => navigate('/universities')}
               className="bg-white text-zinc-900 px-8 py-3.5 rounded-xl font-black text-sm transition-all hover:bg-zinc-100 shadow-xl flex items-center gap-2"
             >
               <FaCompass className="text-zinc-600" />
               Get Started
             </button>

             <div className="flex items-center bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-xl px-4 py-2 shadow-xl group hover:border-zinc-500 transition-colors">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mr-3">Sector:</span>
               <select
                 value={filterType}
                 onChange={(e) => setFilterType && setFilterType(e.target.value)}
                 className="bg-transparent border-none focus:ring-0 outline-none text-white font-bold text-sm cursor-pointer appearance-none outline-none group-hover:text-zinc-200 transition-colors pr-6"
               >
                 <option value="All" className="bg-zinc-900 text-zinc-200">All Sectors</option>
                 <option value="Public" className="bg-zinc-900 text-zinc-200">Public</option>
                 <option value="Private" className="bg-zinc-900 text-zinc-200">Private</option>
               </select>
               <FaChevronDown className="text-zinc-500 text-[10px] -ml-4 pointer-events-none" />
             </div>
             
             <div className="flex items-center bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-xl px-4 py-2 shadow-xl group hover:border-zinc-500 transition-colors">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mr-3">City:</span>
               <select
                 value={filterCity || "All"}
                 onChange={(e) => handleCityChange(e.target.value)}
                 className="bg-transparent border-none focus:ring-0 outline-none text-white font-bold text-sm cursor-pointer appearance-none outline-none group-hover:text-zinc-200 transition-colors pr-6"
               >
                 {cities.map(city => (
                   <option key={city} value={city} className="bg-zinc-900 text-zinc-200">
                     {city === "All" ? "Everywhere" : city}
                   </option>
                 ))}
               </select>
               <FaChevronDown className="text-zinc-500 text-[10px] -ml-4 pointer-events-none" />
             </div>
          </div>
        </div>
      </div>


    </section>
  );
}
