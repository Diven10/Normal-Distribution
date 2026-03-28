import React, { useState } from "react";
import { normCDF, normPPF } from "../utils/statsEngine";

// We now accept mean and stdDev from App.jsx as props
const Calculator = ({ mean, setMean, stdDev, setStdDev }) => {
  const [mode, setMode] = useState("probability");

  // Local state just for the targets
  const [x1, setX1] = useState(85);
  const [x2, setX2] = useState("");
  const [prob, setProb] = useState(0.95);
  const [result, setResult] = useState(null);

  const solve = (e) => {
    e.preventDefault();
    let resData = {};

    if (mode === "probability") {
      const z1 = (x1 - mean) / stdDev;
      if (x2 === "") {
        const p = normCDF(z1);
        resData = {
          primaryLabel: `Probability P(X < ${x1})`,
          primaryValue: (p * 100).toFixed(2) + "%",
          secondaryLabel: "Z-Score",
          secondaryValue: z1.toFixed(2),
          interpretation: `This value is ${Math.abs(z1).toFixed(2)} standard deviations ${z1 >= 0 ? "above" : "below"} the mean. There is a ${((1 - p) * 100).toFixed(2)}% chance of a value being greater than this.`,
        };
      } else {
        const z2 = (x2 - mean) / stdDev;
        const p = Math.abs(normCDF(z2) - normCDF(z1));
        resData = {
          primaryLabel: `Area P(${x1} < X < ${x2})`,
          primaryValue: (p * 100).toFixed(2) + "%",
          secondaryLabel: "Z-Scores",
          secondaryValue: `${z1.toFixed(2)} to ${z2.toFixed(2)}`,
          interpretation: `This calculates the total area under the curve between the values ${x1} and ${x2}.`,
        };
      }
    } else if (mode === "x-value") {
      const z = normPPF(prob);
      const x = mean + z * stdDev;
      resData = {
        primaryLabel: "Calculated X-Value",
        primaryValue: x.toFixed(2),
        secondaryLabel: "Required Z-Score",
        secondaryValue: z.toFixed(2),
        interpretation: `To achieve a cumulative probability of ${prob} (${(prob * 100).toFixed(1)}%), you need to hit a value of ${x.toFixed(2)}.`,
      };
    }
    setResult(resData);
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-4 leading-normal py-2">
          Advanced Solver
        </h2>
        <p className="text-stone-500 text-lg">
          Calculate probabilities and visualize data instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Input Values */}
        <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col h-full">
          <h3 className="text-2xl font-serif text-stone-900 mb-8 pb-4 border-b border-stone-100">
            Input Values
          </h3>

          <div className="flex bg-stone-100 p-1 rounded-full mb-8 w-full max-w-sm">
            {["probability", "x-value"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setResult(null);
                }}
                className={`flex-1 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                  mode === m
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Find {m}
              </button>
            ))}
          </div>

          <form onSubmit={solve} className="space-y-6 flex-1 flex flex-col">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-500 mb-2">
                  Mean (μ)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={mean}
                  onChange={(e) => setMean(parseFloat(e.target.value))}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#405232] focus:ring-1 focus:ring-[#405232] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-500 mb-2">
                  Standard Deviation (σ)
                </label>
                <input
                  type="number"
                  step="any"
                  min="0.00001"
                  required
                  value={stdDev}
                  onChange={(e) => setStdDev(parseFloat(e.target.value))}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#405232] focus:ring-1 focus:ring-[#405232] transition-all"
                />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100">
              <label className="block text-sm font-bold text-stone-500 mb-4">
                Target Inputs
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {mode === "probability" ? (
                  <>
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="Target Value (x)"
                      value={x1}
                      onChange={(e) => setX1(parseFloat(e.target.value))}
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#405232] focus:ring-1 focus:ring-[#405232] transition-all"
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder="End of range (Optional)"
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#405232] focus:ring-1 focus:ring-[#405232] transition-all"
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
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-[#405232] focus:ring-1 focus:ring-[#405232] transition-all md:col-span-2"
                  />
                )}
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button
                type="submit"
                className="w-full py-4 bg-[#405232] hover:bg-[#2d3a23] text-white rounded-full font-bold text-lg transition-all shadow-md"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col h-full">
          <h3 className="text-2xl font-serif text-stone-900 mb-8 pb-4 border-b border-stone-100">
            Results
          </h3>

          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 py-20">
              <svg
                className="w-16 h-16 mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="font-medium text-lg">
                Enter values and click calculate
              </p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 animate-fade-in">
              <div className="bg-[#405232] rounded-2xl p-6 flex justify-between items-center shadow-md">
                <span className="text-white/80 font-medium text-lg">
                  {result.primaryLabel}
                </span>
                <span className="text-white font-serif font-bold text-4xl">
                  {result.primaryValue}
                </span>
              </div>

              <div className="bg-stone-100 rounded-2xl p-6 flex justify-between items-center border border-stone-200">
                <span className="text-stone-600 font-medium text-lg">
                  {result.secondaryLabel}
                </span>
                <span className="text-stone-900 font-serif font-bold text-3xl">
                  {result.secondaryValue}
                </span>
              </div>

              <div className="bg-white border-l-4 border-[#405232] p-6 rounded-r-2xl shadow-sm mt-8">
                <h4 className="text-sm font-bold text-[#405232] uppercase tracking-wider mb-2">
                  Interpretation
                </h4>
                <p className="text-stone-600 leading-relaxed text-lg">
                  {result.interpretation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mean and Standard Deviation Formula Definitions */}
      <div className="mt-16 text-center">
        <div className="font-serif text-3xl md:text-4xl text-stone-800 flex items-center justify-center space-x-4 mb-6">
          <span>z = </span>
          <div className="flex flex-col items-center">
            <span className="border-b-2 border-stone-800 px-4 pb-2">x - μ</span>
            <span className="pt-2">σ</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:space-x-8 text-sm md:text-base text-stone-500">
          <span className="bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
            <strong className="text-stone-800 font-serif italic text-lg mr-2">
              x
            </strong>{" "}
            = Target Value
          </span>
          <span className="bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
            <strong className="text-stone-800 font-serif italic text-lg mr-2">
              μ
            </strong>{" "}
            = Mean
          </span>
          <span className="bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
            <strong className="text-stone-800 font-serif italic text-lg mr-2">
              σ
            </strong>{" "}
            = Standard Deviation
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
