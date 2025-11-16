import React from "react";
import { Link } from "react-router";

const ChallengesCard = ({ challenge, index }) => {
  const {
    _id,
    title,
    category,
    description,
    
    participants,
    
    imageUrl,
  } = challenge;

  console.log(challenge);
  return (
    <div
      className="card bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <figure className="overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover hover:scale-110 transition-transform duration-400"
        />
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-green-600 text-lg font-semibold mb-1">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-1">{category}</p>
        <p className="text-gray-700 text-sm mb-2">
          {description.length > 70
            ? description.slice(0, 70) + "..."
            : description}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          👥 Participants:{" "}
          <span className="font-semibold text-green-700">
            {participants}
          </span>
        </p>

        <Link
          to={`/challenges/${_id}`}
          className="btn btn-sm bg-green-600 text-white hover:bg-green-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ChallengesCard;
