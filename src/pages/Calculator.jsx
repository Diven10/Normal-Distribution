import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { normCDF, normPPF } from "../utils/statsEngine";

const Calculator = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("probability"); // probability, x-value, parameters

  // Shared State
  const [mean, setMean] = useState(170);
  const [stdDev, setStdDev] = useState(8);
  const [x1, setX1] = useState(180);
  const [x2, setX2] = useState(""); // For range questions
  const [prob, setProb] = useState(0.95); // For inverse questions
  const [result, setResult] = useState(null);

  const solve = (e) => {
    e.preventDefault();
    let res = "";

    if (mode === "probability") {
      const z1 = (x1 - mean) / stdDev;
      if (x2 === "") {
        const p = normCDF(z1);
        res = `P(X < ${x1}) = ${(p * 100).toFixed(4)}% | P(X > ${x1}) = ${((1 - p) * 100).toFixed(4)}%`;
      } else {
        const z2 = (x2 - mean) / stdDev;
        const p = Math.abs(normCDF(z2) - normCDF(z1));
        res = `P(${x1} < X < ${x2}) = ${(p * 100).toFixed(4)}%`;
      }
    } else if (mode === "x-value") {
      const z = normPPF(prob);
      const x = mean + z * stdDev;
      res = `The value of X for a cumulative probability of ${prob} is ${x.toFixed(4)}`;
    }

    setResult(res);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Advanced Solver</h2>

      {/* Mode Selector */}
      <div className="flex gap-4 mb-8">
        {["probability", "x-value"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setResult(null);
            }}
            className={`px-4 py-2 rounded-lg capitalize ${mode === m ? "bg-cyan-500 text-slate-900" : "bg-slate-700 text-white"}`}
          >
            Find {m}
          </button>
        ))}
      </div>

      <form onSubmit={solve} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-slate-400">
            Step 1: Set Distribution
          </label>
          <input
            type="number"
            placeholder="Mean (μ)"
            value={mean}
            onChange={(e) => setMean(parseFloat(e.target.value))}
            className="w-full p-3 bg-slate-900 rounded border border-slate-700"
          />
          <input
            type="number"
            placeholder="Std Dev (σ)"
            value={stdDev}
            onChange={(e) => setStdDev(parseFloat(e.target.value))}
            className="w-full p-3 bg-slate-900 rounded border border-slate-700"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-slate-400">Step 2: Input Targets</label>
          {mode === "probability" ? (
            <>
              <input
                type="number"
                placeholder="X Value (or start of range)"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full p-3 bg-slate-900 rounded border border-slate-700"
              />
              <input
                type="number"
                placeholder="End of range (Optional)"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                className="w-full p-3 bg-slate-900 rounded border border-slate-700"
              />
            </>
          ) : (
            <input
              type="number"
              step="0.01"
              placeholder="Probability (e.g. 0.95)"
              value={prob}
              onChange={(e) => setProb(parseFloat(e.target.value))}
              className="w-full p-3 bg-slate-900 rounded border border-slate-700"
            />
          )}
        </div>

        <button
          type="submit"
          className="md:col-span-2 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-lg transition-all"
        >
          Calculate & Solve
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-slate-900 rounded-xl border-l-4 border-cyan-400 animate-fade-in">
          <h4 className="text-cyan-400 font-bold mb-2 uppercase text-xs">
            Solution:
          </h4>
          <p className="text-xl text-white font-mono">{result}</p>
          <button
            onClick={() => navigate(`/graph?mean=${mean}&stddev=${stdDev}`)}
            className="mt-4 text-sm text-blue-400 hover:underline"
          >
            See Visual Distribution →
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
