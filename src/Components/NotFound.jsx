import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 text-gray-800">
      <motion.h1
        className="text-9xl font-extrabold text-green-600 drop-shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl font-semibold mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Oops! Page not found 😢
      </motion.p>

      <motion.p
        className="mt-2 text-gray-600 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back home safely 🌿
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
        >
          <FaHome /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
