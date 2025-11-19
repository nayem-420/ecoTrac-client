import React from "react";
import { motion } from "framer-motion";

const UpComingEvents = () => {
  return (
    <div className="py-8 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Upcoming Events
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-gray-700 max-w-xl mx-auto">
            Join our eco-friendly events and make a positive impact on the
            environment. Together we can create a sustainable future!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UpComingEvents;