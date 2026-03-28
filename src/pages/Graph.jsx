import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";

const Graph = () => {
  const [searchParams] = useSearchParams();

  // Initialize with URL parameters if they exist, otherwise default to 50 and 10
  const initialMean = parseFloat(searchParams.get("mean")) || 50;
  const initialStdDev = parseFloat(searchParams.get("stddev")) || 10;

  const [mean, setMean] = useState(initialMean);
  const [stdDev, setStdDev] = useState(initialStdDev);

  // Math logic to generate the bell curve points
  const generateData = (mu, sigma) => {
    const data = [];
    const minX = mu - 4 * sigma;
    const maxX = mu + 4 * sigma;
    const step = (maxX - minX) / 100;

    for (let x = minX; x <= maxX; x += step) {
      const exponent = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
      const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * exponent;
      data.push({
        x: parseFloat(x.toFixed(1)),
        Probability: parseFloat(y.toFixed(4)),
      });
    }
    return data;
  };

  const chartData = useMemo(() => generateData(mean, stdDev), [mean, stdDev]);

  return (
    <div className="max-w-7xl mx-auto mt-12 mb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-4 leading-normal py-2">
          Bell Curve Visualizer
        </h2>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">
          Adjust the mean and standard deviation to understand how the shape of
          a normal distribution changes in real time.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Controls & Rules */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col h-full">
          <h3 className="text-2xl font-serif text-stone-900 mb-8 pb-4 border-b border-stone-100">
            Distribution Controls
          </h3>

          {/* Sliders */}
          <div className="space-y-8 mb-10">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-stone-600">
                  Mean (μ)
                </label>
                <span className="font-serif font-bold text-xl text-[#405232]">
                  {mean}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={mean}
                onChange={(e) => setMean(parseFloat(e.target.value))}
                className="w-full accent-[#405232] h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-stone-600">
                  Standard Deviation (σ)
                </label>
                <span className="font-serif font-bold text-xl text-[#405232]">
                  {stdDev}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={stdDev}
                onChange={(e) => setStdDev(parseFloat(e.target.value))}
                className="w-full accent-[#405232] h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Empirical Rule Cards */}
          <div className="space-y-4 mt-auto pt-6 border-t border-stone-100">
            <div className="bg-[#f7f8f5] border border-[#a3ad88]/40 p-5 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-[#405232] text-lg mb-1">
                68% Rule
              </h4>
              <p className="text-stone-600 text-sm">
                Most values lie between{" "}
                <strong>{(mean - stdDev).toFixed(1)}</strong> and{" "}
                <strong>{(mean + stdDev).toFixed(1)}</strong>
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-[#405232] text-lg mb-1">
                95% Rule
              </h4>
              <p className="text-stone-600 text-sm">
                Most values lie between{" "}
                <strong>{(mean - 2 * stdDev).toFixed(1)}</strong> and{" "}
                <strong>{(mean + 2 * stdDev).toFixed(1)}</strong>
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
              <h4 className="font-serif font-bold text-[#405232] text-lg mb-1">
                99.7% Rule
              </h4>
              <p className="text-stone-600 text-sm">
                Almost all values lie between{" "}
                <strong>{(mean - 3 * stdDev).toFixed(1)}</strong> and{" "}
                <strong>{(mean + 3 * stdDev).toFixed(1)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Graph */}
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] border border-stone-200 shadow-sm h-[600px] flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorOlive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#405232" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#405232" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f5f5f4"
                vertical={false}
              />
              <XAxis
                dataKey="x"
                stroke="#a8a29e"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickCount={15}
                tick={{ fill: "#78716c", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis hide={true} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e7e5e4",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#405232", fontWeight: "bold" }}
                labelStyle={{ color: "#78716c", marginBottom: "4px" }}
                formatter={(value) => [value, "Probability Density"]}
              />

              {/* Shaded Standard Deviation Zones */}
              {/* 3 Std Dev Zone (99.7%) */}
              <ReferenceArea
                x1={mean - 3 * stdDev}
                x2={mean + 3 * stdDev}
                fill="#e5e7eb"
                fillOpacity={0.4}
              />
              {/* 2 Std Dev Zone (95%) */}
              <ReferenceArea
                x1={mean - 2 * stdDev}
                x2={mean + 2 * stdDev}
                fill="#d6d3d1"
                fillOpacity={0.4}
              />
              {/* 1 Std Dev Zone (68%) */}
              <ReferenceArea
                x1={mean - stdDev}
                x2={mean + stdDev}
                fill="#a3ad88"
                fillOpacity={0.3}
              />

              {/* Center Mean Line */}
              <ReferenceLine
                x={mean}
                stroke="#405232"
                strokeWidth={2}
                strokeDasharray="4 4"
              />

              {/* The Bell Curve Line */}
              <Area
                type="monotone"
                dataKey="Probability"
                stroke="#405232"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorOlive)"
                animationDuration={300}
                isAnimationActive={false} // Disabled animation so sliders feel instantly responsive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graph;
