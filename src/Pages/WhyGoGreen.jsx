import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaWater, FaBolt, FaHeart, FaGlobeAsia } from "react-icons/fa";

const WhyGoGreen = () => {
  const points = [
    { icon: <FaLeaf />, text: "Reduce waste and pollution" },
    { icon: <FaWater />, text: "Conserve water and natural resources" },
    { icon: <FaBolt />, text: "Lower your carbon footprint" },
    {
      icon: <FaGlobeAsia />,
      text: "Protect the planet for future generations",
    },
    { icon: <FaHeart />, text: "Improve your health and lifestyle" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-green-100 text-gray-800 overflow-hidden">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold text-green-700 mb-4">
          Why Go Green?
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Small eco-friendly actions today can create a cleaner, safer, and more
          sustainable future for everyone.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <motion.div
              className="text-green-600 text-3xl bg-green-100 p-3 rounded-full"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {p.icon}
            </motion.div>
            <span className="text-lg font-semibold">{p.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute left-10 bottom-10 text-green-300 text-6xl opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🍃
      </motion.div>
    </section>
  );
};

export default WhyGoGreen;