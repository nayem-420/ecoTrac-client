import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateChallenge = () => {
  const challenge = useLoaderData();
  const navigate = useNavigate();

  const { _id, title, category, description, imageUrl } = challenge;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      imageUrl: e.target.photo.value,
      description: e.target.description.value,
    };

    try {
      console.log("Sending update request for ID:", _id);
      console.log("FormData:", formData);

      const res = await fetch(`http://localhost:3000/challenges/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Backend Response:", data);

      if (data.success) {
        Swal.fire({
          title: "Updated!",
          text: "Challenge updated successfully",
          icon: "success",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          navigate(`/challenges/${_id}`);
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: data.message || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error updating challenge:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update challenge. Check console for details.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
        <h1 className="text-4xl font-bold text-center pt-6">
          Update Challenge
        </h1>
        <form onSubmit={handleSubmit} className="card-body">
          <fieldset className="fieldset">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="input input-bordered rounded-2xl"
              placeholder="Challenge Title"
              required
            />

            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              name="category"
              defaultValue={category}
              className="input input-bordered rounded-2xl"
              placeholder="Category"
              required
            />

            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              name="photo"
              defaultValue={imageUrl}
              className="input input-bordered rounded-2xl"
              placeholder="Image URL"
              required
            />

            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={description}
              className="textarea textarea-bordered"
              placeholder="Challenge Description"
              rows="4"
              required
            ></textarea>

            <button type="submit" className="btn btn-neutral mt-4">
              Update Challenge
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateChallenge;
