import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Graph = () => {
  const [searchParams] = useSearchParams();
  const mean = parseFloat(searchParams.get("mean")) || 0;
  const stdDev = parseFloat(searchParams.get("stddev")) || 1;

  const generateData = (mu, sigma) => {
    const data = [];
    const minX = mu - 4 * sigma;
    const maxX = mu + 4 * sigma;
    const step = (maxX - minX) / 100;

    for (let x = minX; x <= maxX; x += step) {
      const exponent = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
      const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * exponent;
      data.push({
        x: parseFloat(x.toFixed(2)),
        Probability: parseFloat(y.toFixed(4)),
      });
    }
    return data;
  };

  const chartData = useMemo(() => generateData(mean, stdDev), [mean, stdDev]);

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20 animate-fade-in">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-5xl font-serif text-stone-900 tracking-tight mb-2">
            See the Big Picture
          </h2>
          <p className="text-stone-500 text-lg">
            Visualizing μ = <strong>{mean}</strong> and σ ={" "}
            <strong>{stdDev}</strong>
          </p>
        </div>
        <Link
          to="/calculator"
          className="text-sm font-medium text-stone-500 hover:text-stone-900 border border-stone-300 rounded-full px-6 py-2 transition-all"
        >
          ← Back to Editor
        </Link>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-stone-200 shadow-sm h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorOlive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#405232" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#405232" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f5f5f4"
              vertical={false}
            />
            <XAxis
              dataKey="x"
              stroke="#78716c"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: "#78716c" }}
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
            />
            <Area
              type="monotone"
              dataKey="Probability"
              stroke="#405232"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOlive)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
