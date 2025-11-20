import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router";
import ChallengesCard from "./ChallengesCard";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

const Challenges = () => {
  const modalRef = useRef(null);
  const loadedData = useLoaderData();
  const [challenges, setChallenges] = useState(
    Array.isArray(loadedData) ? loadedData : []
  );
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const resetForm = () => {
    setNewChallenge({
      title: "",
      category: "",
      description: "",
      imageUrl: "",
    });
  };

  const closeModal = () => {
    const hasData =
      newChallenge.title ||
      newChallenge.category ||
      newChallenge.description ||
      newChallenge.imageUrl;

    if (hasData) {
      Swal.fire({
        title: "Close the form?",
        text: "Unsaved changes will be lost.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          resetForm();
          modalRef.current?.close();
        }
      });
    } else {
      modalRef.current?.close();
    }
  };

  const handleSubmit = async () => {
    if (
      !newChallenge.title ||
      !newChallenge.category ||
      !newChallenge.description ||
      !newChallenge.imageUrl
    ) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        text: "Please fill out all inputs before submitting.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://auth-eco-trac-server.vercel.app/challenges",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newChallenge),
        }
      );

      const data = await response.json();

      if (data.success && data.challenge && data.challenge._id) {
        setChallenges([...challenges, data.challenge]);

        Swal.fire({
          icon: "success",
          title: "Challenge Added!",
          text: "Your new eco-challenge was created successfully.",
          confirmButtonColor: "#16a34a",
        });

        resetForm();
        modalRef.current?.close();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message || "Could not add challenge.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error adding challenge:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Something went wrong. Try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const validChallenges = challenges.filter(
    (challenge) => challenge && challenge._id
  );

  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-green-700">
            All Eco-Friendly Challenges
          </h1>
          <p className="text-gray-600 text-center max-w-2xl">
            Browse and join our environmental challenges to make a positive
            impact on the planet
          </p>
        </div>

        {/* Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">
              Add New Challenge
            </h3>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Title
                </label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, title: e.target.value })
                  }
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
                  value={newChallenge.category}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      category: e.target.value,
                    })
                  }
                  className="input input-bordered w-full focus:input-success"
                  placeholder="e.g., Waste Reduction"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      description: e.target.value,
                    })
                  }
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
                  value={newChallenge.imageUrl}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      imageUrl: e.target.value,
                    })
                  }
                  className="input input-bordered w-full focus:input-success"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="modal-action">
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-success flex-1"
                  >
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
            </div>
          </div>
        </dialog>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {validChallenges.length > 0 ? (
            <>
              {validChallenges.map((challenge, index) => (
                <ChallengesCard
                  key={challenge._id}
                  challenge={challenge}
                  index={index}
                />
              ))}

              {/* Add New Challenge Card */}
              <div
                className="card bg-white shadow-md rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-green-500 hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                onClick={openModal}
              >
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] p-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 hover:bg-green-200 transition-colors">
                    <Plus className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Add New Challenge
                  </h3>
                  <p className="text-gray-500 text-center text-sm">
                    Click to create a new eco-challenge
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-gray-500 col-span-full">
                No challenges available.
              </p>

              {/* Add New Challenge Card when no challenges exist */}
              <div
                className="card bg-white shadow-md rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-green-500 hover:shadow-lg hover:scale-105 transition-all cursor-pointer col-span-full max-w-sm mx-auto"
                onClick={openModal}
              >
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] p-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 hover:bg-green-200 transition-colors">
                    <Plus className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Add New Challenge
                  </h3>
                  <p className="text-gray-500 text-center text-sm">
                    Click to create a new eco-challenge
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
