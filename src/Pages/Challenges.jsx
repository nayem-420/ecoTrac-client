import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router";
import ChallengesCard from "./ChallengesCard";

const Challenges = () => {
  const loadedData = useLoaderData();
  const challenges = loadedData || [];

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
              <ChallengesCard
                key={challenge._id}
                challenge={challenge}
              ></ChallengesCard>
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
