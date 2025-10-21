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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mb-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-green-600 mb-4">Add Family Member</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={member.name}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={member.age}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        />
        <input
          type="text"
          name="relation"
          placeholder="Relation (e.g. Mother)"
          value={member.relation}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddFamilyMember;
