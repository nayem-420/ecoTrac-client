import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ChallengesCard = ({ challenge, index }) => {
  return (
    <motion.div
      key={challenge._id || index}
      className="card bg-white shadow-md rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
      }}
    >
      <figure>
        <motion.img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-40 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-green-600 text-lg font-semibold mb-1">
          {challenge.title}
        </h2>
        <p className="text-sm text-gray-600 mb-1">{challenge.category}</p>
        <p className="text-gray-700 text-sm mb-2">
          {challenge.description.length > 70
            ? challenge.description.slice(0, 70) + "..."
            : challenge.description}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          👥 Participants:{" "}
          <span className="font-semibold text-green-700">
            {challenge.participants}
          </span>
        </p>

        <Link
          to={`/challenges/${challenge._id || challenge.id}`}
          className="btn btn-sm bg-green-600 text-white hover:bg-green-700 transition"
        >
          View Challenge
        </Link>
      </div>
    </motion.div>
  );
};

export default ChallengesCard;