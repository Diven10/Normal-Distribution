import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { normCDF, normPPF } from "../utils/statsEngine";

const Calculator = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("probability");

  const [mean, setMean] = useState(170);
  const [stdDev, setStdDev] = useState(8);
  const [x1, setX1] = useState(180);
  const [x2, setX2] = useState("");
  const [prob, setProb] = useState(0.95);
  const [result, setResult] = useState(null);

  const solve = (e) => {
    e.preventDefault();
    let res = "";

    if (mode === "probability") {
      const z1 = (x1 - mean) / stdDev;
      if (x2 === "") {
        const p = normCDF(z1);
        res = `P(X < ${x1}) = ${(p * 100).toFixed(2)}%  |  P(X > ${x1}) = ${((1 - p) * 100).toFixed(2)}%`;
      } else {
        const z2 = (x2 - mean) / stdDev;
        const p = Math.abs(normCDF(z2) - normCDF(z1));
        res = `P(${x1} < X < ${x2}) = ${(p * 100).toFixed(2)}%`;
      }
    } else if (mode === "x-value") {
      const z = normPPF(prob);
      const x = mean + z * stdDev;
      res = `Value for cumulative probability of ${prob} is ${x.toFixed(2)}`;
    }
    setResult(res);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-20">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-serif text-stone-900 tracking-tight mb-4">
          Map Your Success
        </h2>
        <p className="text-stone-500">
          Calculate probabilities and visualize data instantly.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-stone-200 shadow-sm">
        {/* Mode Selector */}
        <div className="flex bg-stone-100 p-1 rounded-full w-max mx-auto mb-10">
          {["probability", "x-value"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setResult(null);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                mode === m
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Find {m}
            </button>
          ))}
        </div>

        <form onSubmit={solve} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">
                Mean (μ)
              </label>
              <input
                type="number"
                step="any"
                required
                value={mean}
                onChange={(e) => setMean(parseFloat(e.target.value))}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#405232] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">
                Standard Deviation (σ)
              </label>
              <input
                type="number"
                step="any"
                min="0.00001"
                required
                value={stdDev}
                onChange={(e) => setStdDev(parseFloat(e.target.value))}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#405232] transition-colors"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100">
            <label className="block text-sm font-bold text-stone-900 mb-4">
              Target Inputs
            </label>
            <div className="grid md:grid-cols-2 gap-6">
              {mode === "probability" ? (
                <>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="X Value"
                    value={x1}
                    onChange={(e) => setX1(parseFloat(e.target.value))}
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#405232] transition-colors"
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="End of range (Optional)"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#405232] transition-colors"
                  />
                </>
              ) : (
                <input
                  type="number"
                  step="0.001"
                  required
                  placeholder="Probability (e.g. 0.95)"
                  value={prob}
                  onChange={(e) => setProb(parseFloat(e.target.value))}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#405232] transition-colors md:col-span-2"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#405232] hover:bg-[#2d3a23] text-white rounded-full font-medium text-lg transition-all mt-4"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-[#f7f8f5] rounded-2xl border border-[#405232]/20 animate-fade-in text-center">
            <p className="text-xl text-stone-900 font-serif mb-4">{result}</p>
            <button
              onClick={() => navigate(`/graph?mean=${mean}&stddev=${stdDev}`)}
              className="text-sm font-bold text-[#405232] hover:underline"
            >
              Visualize Output →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
