import React, { useState, useRef, use } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import ChallengesCard from "./ChallengesCard";
import { AuthContext } from "../Provider/AuthProvider";

const Challenges1 = () => {
  const { user } = use(AuthContext);
  console.log(user);
  const modalRef = useRef(null);
  const [challenges, setChallenges] = useState([]);

  const handleAddChallenge = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      participants: e.target.participants.value,
      category: e.target.category.value,
      description: e.target.description.value,
      imageUrl: e.target.imageUrl.value,
      createdBy: user.email,
    };

    fetch("https://auth-eco-trac-server-t1bc.vercel.app/challenges", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result) {
          setChallenges(data.result);
        } else {
          setChallenges([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setChallenges([]);
      });
  };

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8 gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {challenges.map((challenge, index) => (
            <ChallengesCard key={index} challenge={challenge}></ChallengesCard>
          ))}
        </div>

        <div className="flex justify-center">
          <div
            className="bg-white rounded-2xl shadow-md border-2 border-dashed border-gray-300 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer p-8 max-w-xs"
            onClick={openModal}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 hover:bg-green-200 transition">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Add New Challenge
              </h3>
              <p className="text-sm text-gray-500">
                Click to create a new eco-challenge
              </p>
            </div>
          </div>
        </div>

        {/* Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">
              Add New Challenge
            </h3>

            <form onSubmit={handleAddChallenge}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full focus:input-success"
                  placeholder="e.g., Plastic-Free Week"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  participants
                </label>
                <input
                  type="number"
                  name="participants"
                  className="input input-bordered w-full focus:input-success"
                  placeholder="e.g., Plastic-Free Week"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="input input-bordered w-full focus:input-success"
                  placeholder="e.g., Waste Reduction"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full focus:textarea-success"
                  rows="3"
                  placeholder="Describe your challenge..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  className="input input-bordered w-full focus:input-success"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="modal-action">
                <div className="flex gap-3 w-full">
                  <button type="submit" className="btn btn-success flex-1">
                    Add Challenge
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-ghost flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default Challenges1;
