import React, { useRef, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const tipsModalRef = useRef(null);

  // Fetch all tips from backend
  const fetchTips = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tips"); // তোমার server URL
      const data = await res.json();
      setTips(data);
    } catch (err) {
      console.error("Failed to fetch tips:", err);
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
    };

    try {
      const res = await fetch("http://localhost:3000/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTip),
      });
      const data = await res.json();
      console.log("Tip Added:", data);

      form.reset();
      tipsModalRef.current.close();

      fetchTips(); // Refresh list after adding
    } catch (err) {
      console.error("Failed to add tip:", err);
    }
  };

  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold text-green-700">Recent Tips</h1>

          {tips.length === 0 && (
            <p className="text-gray-600 mb-2">
              🎯 <strong>Helpful Hint:</strong> Choose a category that best
              matches your challenges.
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
              <form onSubmit={handleSubmit} className="fieldset">
                <label className="label">Title</label>
                <input
                  name="title"
                  type="text"
                  className="input w-full"
                  placeholder="Title"
                />

                <label className="label">Content</label>
                <textarea
                  name="content"
                  className="textarea textarea-bordered w-full"
                  placeholder="Write your tips here..."
                ></textarea>

                <label className="label">Category</label>
                <input
                  name="category"
                  type="text"
                  className="input w-full"
                  placeholder="Category (e.g. Waste, Energy)"
                />

                <button type="submit" className="btn btn-neutral mt-4">
                  Submit
                </button>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        {/* Tips List */}
        {tips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.slice(0, 3).map((tip) => (
              <div key={tip._id} className="card bg-white shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-green-600">{tip.title}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(tip.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{tip.content.slice(0, 60)}...</p>
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
