import React, { useState } from "react";

const UploadReport = ({ onAdd, onCancel }) => {
  const [report, setReport] = useState({ title: "", date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (report.title && report.date) {
      onAdd(report);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md mt-4 border border-gray-300 dark:border-gray-700"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Report Title"
          value={report.title}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        />
        <input
          type="date"
          name="date"
          value={report.date}
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-400 dark:bg-gray-700 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
        >
          Save Report
        </button>
      </div>
    </form>
  );
};

export default UploadReport;
