function SearchBar() {
  return (
    <div className="h-fit flex items-end justify-between gap-2">
      <input
        placeholder="Another location"
        type="text"
        className="text-white border-b-1 p-2 w-4/5 outline-0"
      />
      <button className="bg-white py-1.5 px-3.5 hover:bg-white/85 text-lg">
        Search
      </button>
    </div>
  );
}
export default SearchBar;
