import React, { useEffect, useState } from "react";

const MyActivities = ({ email }) => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/my-activities?email=${email}`
      );
      const data = await res.json();
      if (data.success) setActivities(data.challenges);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
    }
  };

  useEffect(() => {
    if (email) fetchActivities();
  }, [email]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Challenge Title</th>
            <th>Category</th>
            <th>Joined At</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act, index) => (
            <tr key={act._id} className={index % 2 === 0 ? "bg-base-200" : ""}>
              <th>{index + 1}</th>
              <td>{act.title}</td>
              <td>{act.category}</td>
              <td>{new Date(act.joinedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyActivities;
