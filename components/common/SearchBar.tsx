import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-1/2">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      ></Search>
      <input
        type="text"
        placeholder="Search Bayaa"
        className="w-full pl-11 pr-4 py-3 rounded-full border "
      ></input>
      <button className="absolute cursor-pointer text-black right-4 top-1/2 -translate-y-1/2">
        Search
      </button>
    </div>
  );
}
