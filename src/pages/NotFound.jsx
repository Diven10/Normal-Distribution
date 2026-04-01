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

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center pb-24">
      <motion.section
        className="text-center max-w-2xl mx-auto px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl font-serif font-bold text-stone-900 mb-6 tracking-tight"
        >
          404
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-2xl md:text-3xl font-medium text-stone-700 mb-4"
        >
          Out of Bounds
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-stone-500 mb-12 leading-relaxed"
        >
          You've strayed too far from the mean! This page doesn't exist in our
          normal distribution.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link
            to="/"
            className="inline-block bg-[#405232] hover:bg-[#2d3a23] text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default NotFound;
