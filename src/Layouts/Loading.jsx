import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ecoTracLogo from "../assets/ecoTrac-logo.png";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-emerald-400 text-white z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.img
              src={ecoTracLogo}
              alt="EcoTrac Logo"
              className="w-16 h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold mt-6 tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Eco-Trac
          </motion.h1>

          <motion.div
            className="mt-6 w-40 h-2 bg-white/30 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="text-sm mt-4 text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Tracking sustainability, one step at a time 🌿
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
