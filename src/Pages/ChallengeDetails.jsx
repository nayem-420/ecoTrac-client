import React from "react";
import { FaCalendar, FaClock, FaUsers, FaLeaf, FaUser } from "react-icons/fa";
import { LuTarget } from "react-icons/lu";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const ChallengeDetails = () => {
  const challenge = useLoaderData();
  const navigate = useNavigate();

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

  //   console.log(challenge);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://auth-eco-trac-server.vercel.app/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Challenge has been deleted successfully.",
                icon: "success",
              }).then(() => {
                navigate("/challenges");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: data.message || "Failed to delete challenge",
                confirmButtonColor: "#d33",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting challenge:", error);
            Swal.fire({
              icon: "error",
              title: "Request Failed",
              text: "Something went wrong. Try again later.",
              confirmButtonColor: "#d33",
            });
          });
      }
    });
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
                src={imageUrl}
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

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <Link
                  to={`/update-challenge/${_id}`}
                  className="btn btn-lg bg-orange-400 hover:bg-orange-500 text-white border-none hover:scale-105 active:scale-95 transition-transform flex-1"
                >
                  Update
                </Link>

                <button
                  onClick={handleDelete}
                  className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none hover:scale-105 active:scale-95 transition-transform flex-1"
                >
                  Delete
                </button>
              </div>
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
