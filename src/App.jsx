import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Graph from "./pages/Graph";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        {/* Navigation Bar */}
        <nav className="bg-slate-950 border-b border-slate-800 p-4 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-xl font-bold text-cyan-400 tracking-wider"
            >
              Math<span className="text-blue-500">Viz</span>
            </Link>
            <div className="space-x-6">
              <Link
                to="/"
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Learn
              </Link>
              <Link
                to="/calculator"
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Calculator
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/graph" element={<Graph />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
