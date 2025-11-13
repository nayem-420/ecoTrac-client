import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const Challenges = () => {
  const challenges = [];

  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4">
       
        <div className="flex flex-col items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-green-700">
            Eco-Friendly Challenges
          </h1>
          <Link
            to="/challenges"
            className="btn btn-outline btn-success flex items-center gap-2"
          >
            View All Challenges <FaArrowRightLong />
          </Link>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.id} className="card bg-white shadow-md">
                <figure>
                  <img
                    src={challenge.imageUrl}
                    alt={challenge.title}
                    className="w-full h-36 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-green-600">
                    {challenge.title}
                  </h2>
                  <p className="text-sm text-gray-600">{challenge.category}</p>
                  <p className="text-gray-700">{challenge.description}</p>
                  <p className="text-sm text-gray-500">
                    Participants: {challenge.participants}
                  </p>
                  <Link
                    to={`/challenges/${challenge.id}`}
                    className="btn btn-sm btn-success mt-2"
                  >
                    View Challenge
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No challenges available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
