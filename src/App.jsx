import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Graph from "./pages/Graph";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCF8] text-stone-900 font-sans selection:bg-[#405232] selection:text-white">
        {/* Navigation Bar */}
        <nav className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
            Area.
          </Link>
          <div className="space-x-8 text-sm font-medium hidden md:block">
            <Link to="/" className="hover:text-[#405232] transition-colors">
              Learn
            </Link>
            <Link
              to="/calculator"
              className="hover:text-[#405232] transition-colors"
            >
              Calculator
            </Link>
          </div>
          <Link
            to="/calculator"
            className="bg-[#405232] hover:bg-[#2d3a23] text-white text-sm font-medium py-3 px-6 rounded-full transition-all"
          >
            Start Solving →
          </Link>
        </nav>

        {/* Page Content */}
        <main className="p-4 md:p-8">
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
