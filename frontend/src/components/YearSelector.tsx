export default function YearSelector({
  year,
  setYear,
  years,
}: {
  year: number;
  setYear: (y: number) => void;
  years: number[];
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-medium text-gray-600">Year:</span>
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 bg-white"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
