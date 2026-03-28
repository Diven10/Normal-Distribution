import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          The Normal Distribution
        </h1>
        <p className="text-xl text-slate-400">
          Understanding the math that shapes our world.
        </p>
      </div>

      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">The Hook</h2>
          <p className="text-slate-300 leading-relaxed">
            Nature loves the "average." Whether it's the height of trees in a
            forest, test scores in a class, or errors in a machine learning
            model, data tends to cluster around a central value. When we plot
            this data, it forms a shape like a bell.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">The Math</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>
              <strong className="text-white">Mean (μ):</strong> Where the center
              of the bell sits. The absolute average.
            </li>
            <li>
              <strong className="text-white">Standard Deviation (σ):</strong>{" "}
              How fat or skinny the bell is. A small number means everyone is
              close to average; a large number means the data is spread out.
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center">
          <p className="text-sm text-slate-400 mb-4 uppercase tracking-widest">
            Probability Density Function
          </p>
          <div className="font-mono text-xl text-cyan-300 flex items-center justify-center space-x-4">
            <span>f(x) =</span>
            <div className="flex flex-col items-center">
              <span className="border-b border-cyan-300 px-2 pb-1">1</span>
              <span className="pt-1">σ√(2π)</span>
            </div>
            <span>e</span>
            <sup className="text-sm -mt-6">-(x - μ)² / 2σ²</sup>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/calculator"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        >
          Go to Calculator →
        </Link>
      </div>
    </div>
  );
};

export default Home;
