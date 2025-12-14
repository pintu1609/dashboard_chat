"use client";

import { useEffect, useState } from "react";
import EmissionsChart from "@/components/EmissionsChart";
import ChatPanel from "@/components/ChatPanel";
import StatsCards from "@/components/StatsCards";
import YearSelector from "@/components/YearSelector";
import {
  fetchEmissions,
} from "@/lib/api";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [year, setYear] = useState<number>(2023);

  const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
        setLoading(true);

    fetchEmissions(year).then(setData).finally(() => setLoading(false));;
  }, [year]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h1 className="text-2xl font-bold">🌍 Global Emissions Dashboard</h1>
        <p className="text-sm opacity-90">
          Explore emissions by sector and year
        </p>
      </header>

      <main className="p-6">
        <YearSelector
          year={year}
          setYear={setYear}
          years={[1990, 2000, 2010, 2020, 2021, 2022, 2023]}
        />
        <StatsCards data={data} year={year} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
            {/* <EmissionsChart data={data} /> */}
            {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
                <ClipLoader size={100} color="#2563eb" />

              </div>
            ) : (
              <EmissionsChart data={data} />
            )}
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <ChatPanel
              year={year}
              sector={"All"}
              data={data}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
