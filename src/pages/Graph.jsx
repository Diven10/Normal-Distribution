import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Graph = () => {
  // Grab the data passed from the Calculator page
  const [searchParams] = useSearchParams();
  const mean = parseFloat(searchParams.get("mean")) || 0;
  const stdDev = parseFloat(searchParams.get("stddev")) || 1;

  // Your exact math logic
  const generateData = (mu, sigma) => {
    const data = [];
    // Dynamic X-axis based on standard deviation so it always fits nicely
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">
            Distribution Results
          </h2>
          <p className="text-slate-400">
            Mean: <strong className="text-white">{mean}</strong> | Std Dev:{" "}
            <strong className="text-white">{stdDev}</strong>
          </p>
        </div>
        <Link
          to="/calculator"
          className="text-sm bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-all"
        >
          ← Back to Calculator
        </Link>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="x"
              stroke="#94a3b8"
              type="number"
              domain={["dataMin", "dataMax"]}
            />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="Probability"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
