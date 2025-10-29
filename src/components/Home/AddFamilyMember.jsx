import React, { useState } from "react";

const AddFamilyMember = ({ onAdd, onCancel }) => {
  const [member, setMember] = useState({ name: "", age: "", relation: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (member.name && member.age && member.relation) {
      onAdd(member);
      setMember({ name: "", age: "", relation: "" }); // reset form
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white/70 via-white/40 to-white/20 dark:from-gray-900/60 dark:via-gray-800/40 dark:to-gray-900/20 backdrop-blur-2xl p-8 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
    >
      <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-6 text-center">
        ➕ Add Family Member
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={member.name}
          onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-500 transition-all"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={member.age}
          onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-500 transition-all"
        />

        <input
          type="text"
          name="relation"
          placeholder="Relation (e.g. Mother)"
          value={member.relation}
          onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-500 transition-all"
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl font-medium bg-gray-200/70 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:bg-gray-300/80 dark:hover:bg-gray-600 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 shadow-md hover:shadow-lg transition-all"
        >
          Save Member
        </button>
      </div>
    </form>
  );
};

export default AddFamilyMember;
