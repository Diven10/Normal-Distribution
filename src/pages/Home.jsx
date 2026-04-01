import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const Home = () => {
  return (
    <div className="w-full space-y-20 pb-24 mt-12">
      {/* 1. Hero Section */}
      <motion.section
        className="text-center max-w-6xl mx-auto px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 tracking-tight leading-normal py-2"
        >
          What is Normal Distribution?
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-stone-500 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          A normal distribution is a type of probability distribution that forms
          a bell-shaped curve. Most values are concentrated around the center,
          while fewer values appear at the extreme ends. It is one of the most
          important concepts in statistics because many real-world things follow
          a normal distribution.
        </motion.p>

        {/* PURE CODE SOLUTION: Custom Inline SVG Graph */}
        {/* No external image links. This draws the bell curve using math and code. */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-[2rem] overflow-hidden shadow-xl border border-stone-200 bg-white p-6 md:p-12 max-w-4xl mx-auto"
        >
          <div className="w-full h-[300px] md:h-[400px]">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bellGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#405232" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#405232" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Background Grid */}
              <g stroke="#f5f5f4" strokeWidth="2" strokeDasharray="4 4">
                <line x1="0" y1="80" x2="800" y2="80" />
                <line x1="0" y1="170" x2="800" y2="170" />
                <line x1="0" y1="260" x2="800" y2="260" />
              </g>

              {/* X-Axis Base Line */}
              <line
                x1="0"
                y1="350"
                x2="800"
                y2="350"
                stroke="#d6d3d1"
                strokeWidth="2"
              />

              {/* Standard Deviation Markers (The Math Lines) */}
              <g stroke="#a3ad88" strokeWidth="2" strokeDasharray="6 6">
                <line
                  x1="400"
                  y1="40"
                  x2="400"
                  y2="350"
                  stroke="#405232"
                  strokeDasharray="none"
                  strokeWidth="3"
                />{" "}
                {/* Mean */}
                <line x1="280" y1="140" x2="280" y2="350" /> {/* -1 SD */}
                <line x1="520" y1="140" x2="520" y2="350" /> {/* +1 SD */}
                <line x1="160" y1="310" x2="160" y2="350" /> {/* -2 SD */}
                <line x1="640" y1="310" x2="640" y2="350" /> {/* +2 SD */}
              </g>

              {/* The Shaded Gradient Area */}
              <path
                d="M 0 350 L 50 350 C 200 350 280 50 400 50 C 520 50 600 350 750 350 L 800 350 L 800 400 L 0 400 Z"
                fill="url(#bellGradient)"
              />

              {/* The Thick Olive Green Curve */}
              <path
                d="M 0 350 L 50 350 C 200 350 280 50 400 50 C 520 50 600 350 750 350 L 800 350"
                fill="none"
                stroke="#405232"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Mathematical Labels */}
              <g
                fill="#78716c"
                fontFamily="sans-serif"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                <text x="400" y="375" fill="#405232" fontSize="18">
                  μ
                </text>
                <text x="280" y="375">
                  -1σ
                </text>
                <text x="520" y="375">
                  +1σ
                </text>
                <text x="160" y="375">
                  -2σ
                </text>
                <text x="640" y="375">
                  +2σ
                </text>
              </g>
            </svg>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. The Core Concept */}
      <motion.section
        className="max-w-4xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="mb-12 text-center">
          <motion.span
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 block"
          >
            1. The Core Concept
          </motion.span>
          <motion.p
            variants={fadeUp}
            className="text-stone-800 text-2xl md:text-3xl font-serif leading-snug tracking-tight font-medium"
          >
            In nature and industry, most data isn't random; it's predictable. If
            you measure the heights of thousands of adults, most will be close
            to the average. Plot this, and it forms a{" "}
            <strong>Bell Curve</strong>.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 gap-y-6 pt-8 border-t border-stone-200"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white p-8 rounded-2xl border border-stone-100 shadow-sm"
          >
            <h3 className="text-4xl font-black text-[#405232]/40 font-serif w-16">
              01
            </h3>
            <div>
              <h4 className="text-xl font-bold text-stone-900 mb-1 font-serif">
                Symmetry
              </h4>
              <p className="text-stone-600 text-lg">
                The left side is a perfect mirror image of the right side.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white p-8 rounded-2xl border border-stone-100 shadow-sm"
          >
            <h3 className="text-4xl font-black text-[#405232]/60 font-serif w-16">
              02
            </h3>
            <div>
              <h4 className="text-xl font-bold text-stone-900 mb-1 font-serif">
                The Center
              </h4>
              <p className="text-stone-600 text-lg">
                The highest point is the Mean (μ). The Mean, Median, and Mode
                are all equal here.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white p-8 rounded-2xl border border-stone-100 shadow-sm"
          >
            <h3 className="text-4xl font-black text-[#405232]/80 font-serif w-16">
              03
            </h3>
            <div>
              <h4 className="text-xl font-bold text-stone-900 mb-1 font-serif">
                Total Area
              </h4>
              <p className="text-stone-600 text-lg">
                The total area under the curve is always exactly 1 (or 100%).
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 3. The Two Controllers */}
      <motion.section
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center mb-12">
          <motion.span
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 block"
          >
            2. Specs
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-4 leading-normal py-2"
          >
            The Two Controllers (μ and σ)
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-stone-500 max-w-2xl mx-auto"
          >
            To define a normal distribution, you only need two numbers. Think of
            them as the "knobs" on your calculator.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeUp}
            className="bg-[#405232] text-white p-10 rounded-[2rem] shadow-xl"
          >
            <h3 className="text-3xl font-serif mb-4 leading-normal">
              The Mean (μ) <br />
              <span className="text-xl text-[#a3ad88]">The Position</span>
            </h3>
            <p className="text-white/90 leading-relaxed text-lg">
              The mean tells you where the center of the bell sits on the
              X-axis. If you change the mean from 170 to 180, the entire bell
              slides to the right. It doesn't change shape; it just moves.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white border border-stone-200 p-10 rounded-[2rem] shadow-sm"
          >
            <h3 className="text-3xl font-serif text-stone-900 mb-4 leading-normal">
              Standard Deviation (σ) <br />
              <span className="text-xl text-stone-500">The Shape</span>
            </h3>
            <p className="text-stone-600 leading-relaxed mb-6 text-lg">
              This is the most important part for your "Advanced Solver." It
              measures spread.
            </p>
            <ul className="space-y-4 text-stone-600 text-lg">
              <li className="flex items-start">
                <span className="mr-3 text-[#405232] font-bold">↓</span>{" "}
                <strong>Low σ:</strong> The data is very close to the mean. The
                bell is tall and skinny.
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#405232] font-bold">↑</span>{" "}
                <strong>High σ:</strong> The data is spread out. The bell is
                short and fat.
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. The Empirical Rule */}
      <motion.section
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="bg-white border border-stone-200 p-10 md:p-12 rounded-[2rem] shadow-sm">
          <motion.span
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 block"
          >
            3. The Cheat Code
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 leading-normal py-2"
          >
            The 68-95-99.7 Rule
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-600 text-lg mb-10">
            This rule tells you exactly where the data lives within a normal
            distribution based on standard deviations.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 mb-10"
          >
            <motion.div
              variants={fadeUp}
              className="bg-stone-50 border border-stone-100 p-8 rounded-2xl text-center"
            >
              <span className="block text-4xl font-serif font-bold text-[#405232] mb-2">
                68%
              </span>
              <span className="text-stone-500">
                within <strong>1</strong> standard deviation
              </span>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="bg-stone-50 border border-stone-100 p-8 rounded-2xl text-center"
            >
              <span className="block text-4xl font-serif font-bold text-[#405232] mb-2">
                95%
              </span>
              <span className="text-stone-500">
                within <strong>2</strong> standard deviations
              </span>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="bg-stone-50 border border-stone-100 p-8 rounded-2xl text-center"
            >
              <span className="block text-4xl font-serif font-bold text-[#405232] mb-2">
                99.7%
              </span>
              <span className="text-stone-500">
                within <strong>3</strong> standard deviations
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-[#f7f8f5] border border-[#a3ad88]/30 p-6 rounded-xl"
          >
            <p className="text-stone-700 text-lg">
              <strong className="text-[#405232]">Example:</strong> If heights
              have μ=170 and σ=8, then 95% of students are between{" "}
              <em>170 - (2 × 8)</em> and <em>170 + (2 × 8)</em> — which is{" "}
              <strong>154cm to 186cm</strong>.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. The Z-Score */}
      <motion.section
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="bg-white border border-stone-200 p-10 md:p-12 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.span
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 block"
            >
              4. The Universal Language
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 leading-normal py-2"
            >
              The Z-Score
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-stone-600 text-lg mb-6 leading-relaxed"
            >
              Because every dataset has different units (cm, kg, marks),
              mathematicians created the{" "}
              <strong>Standard Normal Distribution</strong>, where the mean is
              always 0 and the standard deviation is 1. To compare your data to
              this "Master Curve," we use the Z-score formula:
            </motion.p>
            <motion.ul
              variants={staggerContainer}
              className="space-y-4 text-stone-600 text-lg"
            >
              <motion.li variants={fadeUp}>
                <strong>Z = 0:</strong> You are exactly average.
              </motion.li>
              <motion.li variants={fadeUp}>
                <strong>Z = +1.5:</strong> You are 1.5 standard deviations{" "}
                <em>above</em> average.
              </motion.li>
              <motion.li variants={fadeUp}>
                <strong>Z = -2.0:</strong> You are 2 standard deviations{" "}
                <em>below</em> average.
              </motion.li>
            </motion.ul>
          </div>

          <motion.div
            variants={fadeUp}
            className="w-full md:w-auto bg-[#f7f8f5] border border-[#a3ad88]/30 p-10 rounded-2xl flex flex-col items-center justify-center"
          >
            <div className="font-serif text-3xl md:text-4xl text-stone-800 flex items-center space-x-4">
              <span>Z = </span>
              <div className="flex flex-col items-center">
                <span className="border-b border-stone-800 px-4 pb-2">
                  x - μ
                </span>
                <span className="pt-2">σ</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. The Probability Density Function Formula Card */}
      <motion.section
        className="max-w-4xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <div className="bg-[#f7f8f5] border border-[#a3ad88]/30 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm">
          <h3 className="text-2xl font-bold text-stone-900 mb-4 font-serif tracking-tight leading-normal py-2">
            The Probability Density Function
          </h3>
          <p className="text-stone-500 mb-8 max-w-xl text-lg">
            This elegant mathematical equation is the engine behind the Bell
            Curve. It calculates the probability of any given point within the
            distribution.
          </p>

          <div className="font-serif text-xl md:text-3xl text-stone-800 flex items-center space-x-2 md:space-x-3 bg-white px-6 md:px-10 py-6 rounded-2xl border border-stone-200 shadow-sm overflow-x-auto max-w-full">
            <span>f(x) = </span>
            <div className="flex flex-col items-center mx-2">
              <span className="border-b border-stone-800 px-3 pb-1">1</span>
              <span className="pt-1 text-lg md:text-xl">σ√2π</span>
            </div>
            <span>e</span>
            <sup className="text-base md:text-lg -mt-6 md:-mt-8">
              -(x - μ)² / 2σ²
            </sup>
          </div>
        </div>
      </motion.section>

      {/* 7. Final CTA Section */}
      <motion.section
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
      >
        <div className="relative bg-stone-900 rounded-[3rem] overflow-hidden py-24 px-6 md:px-10 text-center shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="stars background"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-stone-900/60"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-normal py-2">
              Predicting the Predictable
            </h2>
            <p className="text-stone-300 text-lg mb-10 leading-relaxed">
              Harness the power of statistics to analyze everything from
              manufacturing quality to test scores. The Normal Distribution is
              the key to understanding the variation that exists in nature and
              industry alike.
            </p>
            <Link
              to="/calculator"
              className="inline-block bg-[#405232] hover:bg-[#526842] text-white font-medium py-4 px-12 rounded-full transition-all text-lg shadow-xl"
            >
              Calculate →
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
