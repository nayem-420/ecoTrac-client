import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const MyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User email - আপনার auth context থেকে নিন
  const userEmail = "user@example.com"; // Replace with actual user email from context

  useEffect(() => {
    fetchMyActivities();
  }, []);

  const fetchMyActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/my-activities?email=${userEmail}`
      );
      const data = await response.json();

      if (data.success) {
        setActivities(data.challenges);
      }
    } catch (err) {
      setError("Failed to load activities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-green-600"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your activities...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchMyActivities}
            className="mt-4 btn bg-green-600 text-white hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (activities.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12">
            <div className="text-8xl mb-6">🌱</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Activities Yet
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              You haven't joined any challenges yet. Start your eco journey
              today!
            </p>
            <Link
              to="/challenges"
              className="btn btn-lg bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all"
            >
              🚀 Explore Challenges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
            🌟 My Eco Activities
          </h1>
          <p className="text-gray-600 text-lg">
            You're participating in{" "}
            <span className="font-bold text-green-700">
              {activities.length}
            </span>{" "}
            amazing challenges!
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-3xl font-bold text-green-600 mb-1">
              {activities.length}
            </h3>
            <p className="text-gray-600">Active Challenges</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="text-3xl font-bold text-blue-600 mb-1">
              {activities.reduce((sum, a) => sum + (a.participants || 0), 0)}
            </h3>
            <p className="text-gray-600">Fellow Participants</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-3xl font-bold text-purple-600 mb-1">
              {activities.length * 10}
            </h3>
            <p className="text-gray-600">Eco Points</p>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Activity Card Component
const ActivityCard = ({ activity, index }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage =
    "https://via.placeholder.com/400x300/10b981/ffffff?text=Eco+Challenge";

  return (
    <div
      className="card bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="badge badge-success bg-green-600 text-white border-none px-4 py-3 shadow-lg">
          ✓ Joined
        </span>
      </div>

      <figure className="overflow-hidden bg-gray-200 relative">
        <img
          src={imgError ? fallbackImage : activity.imageUrl}
          alt={activity.title}
          onError={() => setImgError(true)}
          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </figure>

      <div className="card-body p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-outline border-green-600 text-green-700 text-xs">
            {activity.category}
          </span>
        </div>

        <h2 className="card-title text-gray-800 text-xl font-bold mb-2">
          {activity.title}
        </h2>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {activity.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>👥</span>
          <span>
            <span className="font-semibold text-green-700">
              {activity.participants || 0}
            </span>{" "}
            participants
          </span>
        </div>

        <div className="card-actions justify-between items-center">
          <Link
            to={`/challenges/${activity._id}`}
            className="btn btn-sm bg-green-600 text-white hover:bg-green-700 transition-all"
          >
            View Details
          </Link>

          <button className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;