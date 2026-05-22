import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  filterCity, 
  setFilterCity,
  theme = "light"
}) {
  const cities = ["All", "Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat", "Haripur", "Mansehra", "Nowshera", "Swabi", "Bannu", "D.I. Khan"];

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-4 w-full text-left">
      <div className={`flex rounded-[2rem] p-2 overflow-hidden group transition-all border ${
        isDark 
          ? "bg-zinc-900 shadow-2xl shadow-black/40 border-zinc-800 focus-within:border-zinc-700" 
          : "bg-white shadow-2xl shadow-zinc-200/30 border-zinc-200 focus-within:border-zinc-300"
      }`}>
        <div className="flex-grow flex items-center pl-6">
          <FaSearch className={`transition-colors ${isDark ? "text-zinc-500 group-focus-within:text-zinc-300" : "text-zinc-400 group-focus-within:text-zinc-600"}`} />
          <input
            type="text"
            className={`w-full bg-transparent border-none focus:ring-0 py-4 px-4 text-lg font-medium outline-none ${
              isDark ? "text-zinc-100 placeholder-zinc-500" : "text-zinc-800 placeholder-zinc-400"
            }`}
            placeholder="Search by university name or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          />
        </div>

        <button className={`hidden md:block px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 whitespace-nowrap ${
          isDark 
            ? "bg-zinc-100 text-zinc-950 hover:bg-white" 
            : "bg-zinc-900 text-white hover:bg-zinc-800"
        }`}>
          Search Now
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* City Filter */}
        <div className={`flex items-center border rounded-2xl px-4 py-2 shadow-sm transition-all ${
          isDark 
            ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300" 
            : "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700"
        }`}>
          <FaMapMarkerAlt className="text-zinc-500 mr-2" />
          <select
            value={filterCity || "All"}
            onChange={(e) => setFilterCity && setFilterCity(e.target.value)}
            className="bg-transparent font-bold text-xs border-none focus:ring-0 outline-none cursor-pointer py-1 text-inherit"
          >
            {cities.map(city => (
              <option key={city} value={city} className={isDark ? "bg-zinc-900 text-zinc-200" : "bg-white text-zinc-700"}>
                {city === "All" ? "Everywhere" : city}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className={`flex items-center border rounded-2xl px-4 py-2 shadow-sm transition-all ${
          isDark 
            ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300" 
            : "bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700"
        }`}>
          <FaFilter className="text-zinc-500 mr-2" />
          <select
            value={filterType}
            onChange={(e) => setFilterType && setFilterType(e.target.value)}
            className="bg-transparent font-bold text-xs border-none focus:ring-0 outline-none cursor-pointer py-1 text-inherit"
          >
            <option value="All" className={isDark ? "bg-zinc-900 text-zinc-200" : "bg-white text-zinc-700"}>All Sectors</option>
            <option value="Public" className={isDark ? "bg-zinc-900 text-zinc-200" : "bg-white text-zinc-700"}>Public</option>
            <option value="Private" className={isDark ? "bg-zinc-900 text-zinc-200" : "bg-white text-zinc-700"}>Private</option>
          </select>
        </div>

        {/* Reset */}
        {(searchTerm || filterType !== "All" || (filterCity && filterCity !== "All")) && (
          <button 
            onClick={() => {
              if (setSearchTerm) setSearchTerm("");
              if (setFilterType) setFilterType("All");
              if (setFilterCity) setFilterCity("All");
            }}
            className={`text-[10px] font-black uppercase tracking-widest transition-colors ml-2 ${
              isDark ? "text-zinc-500 hover:text-rose-400" : "text-zinc-400 hover:text-red-500"
            }`}
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
