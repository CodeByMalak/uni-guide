export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex justify-center mb-10">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search..."}
        className="w-full max-w-md px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
