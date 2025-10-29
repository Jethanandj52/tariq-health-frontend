import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddFamilyMember from "./AddFamilyMember";
import { useNavigate } from "react-router-dom";

const FamilyMemberList = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `https://hackathon-backend-flax.vercel.app/api/family/user/${userId}`
        );
        const data = await res.json();
        if (data.success) setFamilyMembers(data.members);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, [userId]);

  const addMember = async (memberData) => {
    try {
      const res = await fetch(
        "https://hackathon-backend-flax.vercel.app/api/family/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...memberData, user: userId }),
        }
      );
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
    <div className="max-w-7xl mx-auto px-6 mt-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
          👨‍👩‍👧‍👦 Family Members
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-[90%] max-w-md p-6 animate-slide-in relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl transition"
            >
              ✕
            </button>
            <AddFamilyMember
              onAdd={addMember}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Family Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => (
          <div
            key={member._id}
            onClick={() => navigate(`/member/${member._id}`)}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 border border-green-100 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer p-5 flex flex-col items-center text-center"
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-400 shadow-md mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{member.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{member.relation}</p>
          </div>
        ))}

        {/* Placeholder if no members */}
        {familyMembers.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-10">
            No family members added yet. Click "Add Member" to start.
          </p>
        )}
      </div>
    </div>
  );
};

export default FamilyMemberList;
