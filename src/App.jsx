import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Graph from "./pages/Graph";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

// 1. We created a separate Navigation component so it can read the current URL path
const Navigation = ({ mean, stdDev }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 2. Check if the user is currently on the Calculator page
  const isCalculatorPage = location.pathname === "/calculator";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto flex justify-between items-center transition-all duration-500 ease-in-out ${
          isScrolled
            ? "mt-6 px-8 py-3 bg-[#a3ad88]/80 backdrop-blur-md shadow-lg rounded-full w-[90%] max-w-4xl border border-[#a3ad88]/30 text-stone-900"
            : "mt-0 px-8 py-6 w-full max-w-7xl bg-[#FDFCF8]/95 backdrop-blur-sm text-stone-900"
        }`}
      >
        <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
          Gaussian Playground
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

        {/* 3. The Smart Button Logic */}
        {isCalculatorPage ? (
          <Link
            to={`/graph?mean=${mean}&stddev=${stdDev}`}
            className={`${
              isScrolled
                ? "bg-stone-900 hover:bg-stone-800"
                : "bg-[#405232] hover:bg-[#2d3a23]"
            } text-white text-sm font-medium py-2.5 px-6 rounded-full transition-all`}
          >
            Visualize Graph →
          </Link>
        ) : (
          <Link
            to="/calculator"
            className={`${
              isScrolled
                ? "bg-stone-900 hover:bg-stone-800"
                : "bg-[#405232] hover:bg-[#2d3a23]"
            } text-white text-sm font-medium py-2.5 px-6 rounded-full transition-all`}
          >
            Start Solving →
          </Link>
        )}
      </nav>
    </div>
  );
};

function App() {
  // 4. We "lifted" the Mean and Standard Deviation state up here so both the Navbar and Calculator can use them
  const [mean, setMean] = useState(70);
  const [stdDev, setStdDev] = useState(10);

  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCF8] text-stone-900 font-sans selection:bg-[#405232] selection:text-white">
        {/* Pass the numbers to the Navbar so it can build the graph link */}
        <Navigation mean={mean} stdDev={stdDev} />

        <main className="p-4 md:p-8 pt-32">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Pass the numbers to the Calculator so the user can edit them */}
            <Route
              path="/calculator"
              element={
                <Calculator
                  mean={mean}
                  setMean={setMean}
                  stdDev={stdDev}
                  setStdDev={setStdDev}
                />
              }
            />
            <Route path="/graph" element={<Graph />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
