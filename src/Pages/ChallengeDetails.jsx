import React, { use } from "react";
import { FaCalendar, FaClock, FaUsers, FaLeaf, FaUser } from "react-icons/fa";
import { LuTarget } from "react-icons/lu";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const ChallengeDetails = () => {
  const challenge = useLoaderData();
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  console.log("Challenge data:", challenge);

  // Check if challenge exists
  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Challenge not found</p>
      </div>
    );
  }

  const {
    _id,
    title,
    category,
    description,
    duration,
    target,
    participants,
    impactMetric,
    createdBy,
    startDate,
    endDate,
    imageUrl,
  } = challenge;

  const handleJoin = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await fetch(`http://localhost:3000/challenges/join/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Joined Successfully!",
          text: "You have joined this challenge.",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          navigate("/my-activities");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message || "Could not join challenge.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error joining challenge:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Something went wrong. Try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 lg:h-auto overflow-hidden group">
              <img
                src={
                  imageUrl ||
                  "https://via.placeholder.com/600x400?text=Challenge+Image"
                }
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="badge badge-lg bg-green-600 text-white border-none px-4 py-3">
                  {category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-green-700 mb-4">
                {title}
              </h1>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FaUsers className="text-green-600 text-2xl" />
                  <div>
                    <p className="text-xs text-gray-600">Participants</p>
                    <p className="text-xl font-bold text-green-700">
                      {participants || 0}
                    </p>
                  </div>
                </div>

                {duration && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <FaClock className="text-blue-600 text-2xl" />
                    <div>
                      <p className="text-xs text-gray-600">Duration</p>
                      <p className="text-xl font-bold text-blue-700">
                        {duration}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-5 my-6">
                <button
                  
                  className="btn btn-lg bg-orange-400 hover:bg-orange-500 text-white border-none hover:scale-105 active:scale-95 transition-transform"
                >
                  Update
                </button>

                <button
                  
                  className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none hover:scale-105 active:scale-95 transition-transform"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={handleJoin}
                className="btn btn-lg bg-green-600 hover:bg-green-700 text-white border-none hover:scale-105 active:scale-95 transition-transform"
              >
                Join Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Details Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Target Card */}
          {target && (
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <LuTarget className="text-orange-500 text-3xl" />
                  <h3 className="card-title text-gray-800">Target</h3>
                </div>
                <p className="text-gray-600">{target}</p>
              </div>
            </div>
          )}

          {/* Impact Card */}
          {impactMetric && (
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <FaLeaf className="text-green-500 text-3xl" />
                  <h3 className="card-title text-gray-800">Impact</h3>
                </div>
                <p className="text-gray-600">{impactMetric}</p>
              </div>
            </div>
          )}

          {/* Timeline Card */}
          {startDate && endDate && (
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <FaCalendar className="text-purple-500 text-3xl" />
                  <h3 className="card-title text-gray-800">Timeline</h3>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Start:</span>{" "}
                  {new Date(startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">End:</span>{" "}
                  {new Date(endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Creator Info */}
        {createdBy && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-600">Created by</p>
                <p className="text-lg font-semibold text-gray-800">
                  {createdBy}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetails;
