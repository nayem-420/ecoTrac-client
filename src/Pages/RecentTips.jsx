import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const RecentTips = () => {
  const tips = [];

  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-green-700">Recent Tips</h1>
          {tips.length === 0 && (
            <p className="text-center text-gray-500">No tips available.</p>
          )}
          <Link
            to="/tips"
            className="btn btn-outline btn-success flex items-center gap-2"
          >
            View All Tips <FaArrowRightLong />
          </Link>
        </div>

        {tips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.slice(0, 5).map((tip) => (
              <div key={tip.id} className="card bg-white shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-green-600">{tip.title}</h2>
                  <p className="text-sm text-gray-600">
                    By {tip.authorName} •{" "}
                    {new Date(tip.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{tip.preview}</p>
                  <p className="text-sm text-gray-500">
                    Upvotes: {tip.upvotes}
                  </p>
                  <Link
                    to={`/tips/${tip.id}`}
                    className="btn btn-sm btn-success mt-2"
                  >
                    Read Tip
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTips;
