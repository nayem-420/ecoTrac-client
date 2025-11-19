import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaCalendar, FaLeaf, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router";

const MyActivities = () => {
  const { user } = use(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/my-activities?email=${user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        console.log("Activities data:", data);

        if (data.success) {
          setActivities(data.activities || []);
        } else {
          setError(data.message || "Failed to load activities");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user?.email]);

  // Filter activities based on active tab
  const filteredActivities = activities.filter((activity) => {
    if (activeTab === "all") return true;
    if (activeTab === "challenges") return activity.challengeId;
    if (activeTab === "tips") return activity.type === "tip";
    return true;
  });

  // Count statistics
  const stats = {
    total: activities.length,
    challenges: activities.filter((a) => a.challengeId).length,
    tips: activities.filter((a) => a.type === "tip").length,
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-green-600"></span>
          <p className="mt-4 text-gray-600">Loading activities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <p className="text-red-600 text-xl">Error: {error}</p>
        </div>
      </div>
    );
  }

  // No activities
  if (activities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <FaLeaf className="text-green-600 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Activities Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start joining challenges or adding tips to see your activities here!
          </p>
          <Link to="/challenges" className="btn btn-primary">
            Browse Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
            My Activities
          </h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card bg-white shadow-lg">
              <div className="card-body text-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.total}
                </div>
                <p className="text-gray-600">Total Activities</p>
              </div>
            </div>
            <div className="card bg-white shadow-lg">
              <div className="card-body text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {stats.challenges}
                </div>
                <p className="text-gray-600">Challenges Joined</p>
              </div>
            </div>
            <div className="card bg-white shadow-lg">
              <div className="card-body text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.tips}
                </div>
                <p className="text-gray-600">Tips Shared</p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`btn ${
                activeTab === "all" ? "btn-primary" : "btn-outline btn-primary"
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`btn ${
                activeTab === "challenges"
                  ? "btn-primary"
                  : "btn-outline btn-primary"
              }`}
            >
              Challenges ({stats.challenges})
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`btn ${
                activeTab === "tips" ? "btn-primary" : "btn-outline btn-primary"
              }`}
            >
              Tips ({stats.tips})
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity._id}
              className="card bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="card-body">
                {/* Activity Type Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="badge badge-primary gap-2">
                    {activity.type === "tip" ? (
                      <>
                        <FaLightbulb /> Tip
                      </>
                    ) : (
                      <>
                        <FaLeaf /> Challenge
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.joinedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Challenge Details */}
                {activity.challengeDetails && (
                  <>
                    <h2 className="card-title text-green-700 mb-2">
                      {activity.challengeDetails.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {activity.challengeDetails.description?.slice(0, 100)}
                      {activity.challengeDetails.description?.length > 100 &&
                        "..."}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge badge-outline badge-sm">
                        {activity.challengeDetails.category}
                      </span>
                    </div>
                  </>
                )}

                {/* Tip Details */}
                {activity.type === "tip" && (
                  <>
                    <h2 className="card-title text-orange-600 mb-2">
                      {activity.title}
                    </h2>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge badge-outline badge-sm">
                        {activity.category}
                      </span>
                    </div>
                  </>
                )}

                {/* Joined Date with Icon */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto pt-3 border-t border-gray-200">
                  <FaCalendar className="text-gray-400" />
                  <span>{new Date(activity.createdAt).toLocaleDateString()}</span>
                </div>

                {/* View Details Button for Challenges */}
                {activity.challengeDetails && (
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/challenges/${activity.challengeId}`}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results for Filter */}
        {filteredActivities.length === 0 && activities.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No {activeTab === "challenges" ? "challenges" : "tips"} found
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="btn btn-primary mt-4"
            >
              Show All Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivities;
