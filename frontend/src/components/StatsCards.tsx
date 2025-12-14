import { Sector } from "recharts";

export default function StatsCards({
  data,
  year,
}: {
  data: any[];
  year: number;
}) {
  const total = data.reduce((sum, d) => sum + d.emissions, 0);
  const top = [...data].sort((a, b) => b.emissions - a.emissions)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500">Total Emissions ({year})</p>
        <h3 className="text-2xl font-bold">
          {total.toLocaleString()} MtCO₂
        </h3>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500">Top Sector</p>
        <h3 className="text-lg font-semibold">{top?.sector}</h3>
        <p className="text-gray-600">{top?.emissions} MtCO₂</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-sm text-gray-500">Insight</p>
        <p className="text-gray-700">
          <span className="text-lg font-semibold">{top?.sector}</span> remains the dominant emitter in  <span className="text-lg font-semibold"> {year}</span>
        </p>
      </div>
    </div>
  );
}
