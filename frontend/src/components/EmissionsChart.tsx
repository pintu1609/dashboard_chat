"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EmissionsChart({ data }: { data: any[] }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Emissions by Sector (MtCO₂)
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="sector" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="emissions" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}