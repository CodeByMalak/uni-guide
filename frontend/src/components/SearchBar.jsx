export default function SearchBar({ searchTerm, setSearchTerm, filterType, setFilterType }) {
  return (
    <form 
      onSubmit={(e) => e.preventDefault()}
      className="flex bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-1.5 shadow-2xl overflow-hidden group focus-within:border-blue-500/50 transition-all"
    >
      <div className="flex-grow flex items-center pl-4">
        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 py-3 px-3 text-lg outline-none"
          placeholder="Search universities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border-l border-slate-700 px-3 flex items-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-transparent text-slate-300 font-medium border-none focus:ring-0 outline-none cursor-pointer"
        >
          <option value="All" className="bg-slate-800">All Sectors</option>
          <option value="Public" className="bg-slate-800">Public</option>
          <option value="Private" className="bg-slate-800">Private</option>
        </select>
      </div>

      <button type="submit" className="bg-slate-700 hover:bg-blue-600 text-white px-8 rounded-xl font-bold transition-all active:scale-95 whitespace-nowrap ml-1">
        Search
      </button>
    </form>
  );
}
