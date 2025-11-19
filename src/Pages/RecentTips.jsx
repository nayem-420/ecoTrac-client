import React, { use, useRef, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AuthContext } from "../Provider/AuthProvider";

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const tipsModalRef = useRef(null);
  const { user } = use(AuthContext);

  const fetchTips = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/tips");

      if (!res.ok) {
        throw new Error("Failed to fetch tips");
      }

      const data = await res.json();
      console.log("Tips data:", data);

      // ✅ Check if data is array or object
      if (Array.isArray(data)) {
        setTips(data);
      } else if (data.success && Array.isArray(data.tips)) {
        setTips(data.tips);
      } else {
        console.error("Unexpected data format:", data);
        setTips([]);
      }
    } catch (err) {
      console.error("Failed to fetch tips:", err);
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleTipsModal = () => {
    tipsModalRef.current.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newTip = {
      title: form.title.value,
      content: form.content.value,
      category: form.category.value,
      email: user?.email || user, // ✅ Email properly handle korchi
    };

    try {
      const res = await fetch("http://localhost:3000/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTip),
      });

      const data = await res.json();
      console.log("Tip Added:", data);

      if (data.success) {
        form.reset();
        tipsModalRef.current.close();

        // ✅ Refresh tips list
        await fetchTips();
      } else {
        alert(data.message || "Failed to add tip");
      }
    } catch (error) {
      console.error("Error adding tip:", error);
      alert("Failed to add tip. Please try again.");
    }
  };

  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-green-700">Recent Tips</h1>

          {!loading && tips.length === 0 && (
            <p className="text-gray-600 mb-2">
              🎯 <strong>Helpful Hint:</strong> Be the first to add a tip!
            </p>
          )}

          <button
            onClick={handleTipsModal}
            className="btn btn-outline btn-success flex items-center gap-2"
          >
            Add Your Tips <CiCirclePlus size={20} />
          </button>

          {/* Modal */}
          <dialog
            ref={tipsModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Add New Tip</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter tip title"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    name="content"
                    className="textarea textarea-bordered w-full"
                    placeholder="Write your tips here..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <input
                    name="category"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="e.g. Waste, Energy, Water"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Submit Tip
                </button>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-sm btn-ghost">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
          </div>
        )}

        {/* Tips List */}
        {!loading && tips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.slice(0, 6).map((tip) => (
              <div
                key={tip._id}
                className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="card-title text-green-600">{tip.title}</h2>
                    <span className="badge badge-outline badge-sm">
                      {tip.category}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">
                    {tip.content.slice(0, 100)}
                    {tip.content.length > 100 && "..."}
                  </p>

                  <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                    <span>{new Date(tip.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && tips.length > 6 && (
          <div className="text-center mt-6">
            <button className="btn btn-outline btn-primary">
              View All Tips ({tips.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTips;
