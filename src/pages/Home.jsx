import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation settings for reuse
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const Home = () => {
  return (
    <div className="w-full space-y-32 pb-24 mt-12 overflow-hidden">
      {/* 1. Hero Section */}
      <motion.section
        className="text-center max-w-5xl mx-auto px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl font-serif font-medium text-stone-900 mb-8 tracking-tight leading-tight"
        >
          Browse <br /> everything.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-xl text-stone-500 max-w-2xl mx-auto mb-16"
        >
          The statistical law that governs our world. From natural occurrences
          to industrial precision, discover the math behind the Bell Curve.
        </motion.p>

        {/* Hero Image (Dashboard/UI placeholder) */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-stone-200"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            alt="Data Dashboard"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </motion.section>

      {/* 2. The Core Concept (Text + Grid) */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-3xl mb-16">
          <motion.span
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 block"
          >
            The Concept
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 tracking-tight leading-snug"
          >
            We've cracked the code.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-stone-600 text-xl leading-relaxed"
          >
            In nature and industry, most data isn't random; it's predictable. If
            you measure the heights of thousands of adults, most will be close
            to the average. Plot this, and it forms a{" "}
            <strong>Bell Curve</strong>.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-10 border-t border-stone-200 pt-16"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-stone-900 mb-3 font-serif">
              01. Symmetry
            </h3>
            <p className="text-stone-500 leading-relaxed">
              The left side is a perfect mirror image of the right side.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-stone-900 mb-3 font-serif">
              02. The Center
            </h3>
            <p className="text-stone-500 leading-relaxed">
              The highest point is the Mean (μ). The Mean, Median, and Mode are
              all equal here.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h3 className="text-xl font-bold text-stone-900 mb-3 font-serif">
              03. Total Area
            </h3>
            <p className="text-stone-500 leading-relaxed">
              The total area under the curve is always exactly 1 (or 100%).
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 3. Full Width Image Break (Nature/Landscape) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="w-full px-6 max-w-7xl mx-auto"
      >
        <div className="w-full h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
            alt="Nature Landscape"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>

      {/* 4. The Two Controllers (Side by Side with Image) */}
      <motion.section
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="order-2 md:order-1 rounded-[2rem] overflow-hidden shadow-md h-full min-h-[400px]"
        >
          {/* Abstract/Stone Image Placeholder */}
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop"
            alt="Minimalist abstract spheres"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div variants={staggerContainer} className="order-1 md:order-2">
          <motion.span
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 block"
          >
            Specs
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-8"
          >
            Why Choose Area?
          </motion.h2>

          <div className="space-y-10">
            <motion.div
              variants={fadeUp}
              className="bg-[#405232] text-white p-8 rounded-[2rem]"
            >
              <h3 className="text-2xl font-serif mb-3">The Mean (μ)</h3>
              <p className="text-white/80 leading-relaxed">
                The position. It tells you where the center of the bell sits on
                the X-axis. Change it, and the entire bell slides left or right
                without changing shape.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white border border-stone-200 p-8 rounded-[2rem]"
            >
              <h3 className="text-2xl font-serif text-stone-900 mb-3">
                Std. Deviation (σ)
              </h3>
              <p className="text-stone-500 leading-relaxed mb-4">
                The shape. It measures the spread of the data.
              </p>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start">
                  <span className="mr-3 text-[#405232]">✓</span>{" "}
                  <strong>Low σ:</strong> Tall and skinny bell.
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-[#405232]">✓</span>{" "}
                  <strong>High σ:</strong> Short and fat bell.
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* 5. Final Call to Action with background image */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
      >
        <div className="relative bg-stone-900 rounded-[3rem] overflow-hidden py-32 px-10 text-center shadow-2xl">
          {/* Subtle background image overlay */}
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="stars"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-tight">
              Connect with us
            </h2>
            <p className="text-stone-300 text-xl mb-10 max-w-xl mx-auto">
              Schedule a quick call to learn how Area can turn your regional
              data into a powerful advantage, or try it yourself.
            </p>
            <Link
              to="/calculator"
              className="inline-block bg-[#405232] hover:bg-[#526842] text-white font-medium py-4 px-10 rounded-full transition-all text-lg shadow-xl"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
