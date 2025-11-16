import { useLoaderData } from "react-router";
import { motion } from "framer-motion";

const MyActivities = () => {
  const data = useLoaderData();
  const challenges = data?.challenges || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Your Joined Challenges
      </h1>

      {challenges.length === 0 ? (
        <p className="text-gray-600 bg-white p-4 rounded-xl shadow">
          You haven't joined any challenges yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card bg-white shadow-md hover:shadow-lg rounded-xl"
            >
              <figure>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-t-xl"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-green-700">{item.title}</h2>
                <p className="text-gray-700">
                  {item.description?.slice(0, 80)}...
                </p>

                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">
                    Category: {item.category}
                  </span>
                  <span className="text-gray-600">
                    Duration: {item.duration} days
                  </span>
                </div>

                <button className="btn bg-red-500 text-white mt-4">
                  Leave Challenge
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyActivities;
