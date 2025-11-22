import { useTheme } from "@/context/ThemeContext";
import { ListOrdered, ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";

interface SortOption {
  key: string;
  label: string;
  direction: "asc" | "desc";
}


const sortOptions: SortOption[] = [
  { key: "date", label: "Newest First", direction: "desc" },
  { key: "date", label: "Oldest First", direction: "asc" },
  { key: "title", label: "Title (A-Z)", direction: "asc" },
  { key: "title", label: "Title (Z-A)", direction: "desc" },
];

interface SortDropdownProps {
  currentSortKey: string;
  currentSortDirection: "asc" | "desc";
  onSortChange: (key: string, direction: "asc" | "desc") => void;
}

export default function SortDropdown({
  currentSortKey,
  currentSortDirection,
  onSortChange,
}: SortDropdownProps) {
  const { theme } = useTheme();

  const selectedValue = `${currentSortKey}-${currentSortDirection}`;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, direction] = e.target.value.split("-") as [string, "asc" | "desc"];
    onSortChange(key, direction);
  };

  return (
    <div className="relative">
      <ListOrdered size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
        theme === "dark" ? "text-slate-400" : "text-gray-400"
      }`} />
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className={`appearance-none w-full md:w-48 py-3 pl-12 pr-10 rounded-xl shadow-md cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          theme === "dark"
            ? "bg-slate-700/80 text-white border border-slate-700"
            : "bg-white border border-gray-200 text-gray-700"
        }`}
      >
        {sortOptions.map((option) => (
          <option key={`${option.key}-${option.direction}`} value={`${option.key}-${option.direction}`}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 ${
          theme === "dark" ? "text-slate-400" : "text-gray-400"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
