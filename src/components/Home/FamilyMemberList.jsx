import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddFamilyMember from "./AddFamilyMember";
import { useNavigate } from "react-router-dom";

const FamilyMemberList = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const userId = "670f1e1f3d9a2b456789abcd"; // test userId

  // ✅ Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`https://hackathon-backend-flax.vercel.app/api/family/user/${userId}`);
        const data = await res.json();
        if (data.success) setFamilyMembers(data.members);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  // ✅ Add new member
  const addMember = async (memberData) => {
    try {
      const res = await fetch("https://hackathon-backend-flax.vercel.app/api/family/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...memberData, user: userId }),
      });
      const data = await res.json();
      if (data.success) {
        setFamilyMembers([...familyMembers, data.member]);
        setShowForm(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
          👨‍👩‍👧‍👦 Family Members
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {/* ✅ Modal Popup for Add Member */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <AddFamilyMember onAdd={addMember} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* ✅ Family Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => (
          <div
            key={member._id}
            onClick={() => navigate(`/member/${member._id}`)}
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 border border-green-100 dark:border-gray-700 hover:scale-105 transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-400"
              />
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.relation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyMemberList;
