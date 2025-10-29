import React from "react";
import { FiActivity, FiClipboard, FiUser, FiFileText } from "react-icons/fi";

const Reports = () => {
  const dummyReports = [
    { id: 1, name: "John Doe", type: "Blood Test", status: "Analyzed", result: "Normal" },
    { id: 2, name: "Jane Smith", type: "X-Ray", status: "Pending", result: "—" },
    { id: 3, name: "Alex Brown", type: "MRI", status: "Analyzed", result: "Minor Issue" },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <FiClipboard className="text-blue-500 text-3xl" />
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Medical Reports Summary
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-3 sm:mt-0">
          Overview of patient diagnostics and status
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyReports.map((report) => (
          <div
            key={report.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-gray-700 rounded-full">
                  <FiUser className="text-blue-500 dark:text-blue-300 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {report.name}
                </h3>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  report.status === "Analyzed"
                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                }`}
              >
                {report.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <FiFileText className="text-blue-400" />
                <span>Type: {report.type}</span>
              </p>
              <p className="flex items-center gap-2">
                <FiActivity className="text-purple-400" />
                <span>Result: {report.result}</span>
              </p>
            </div>

            <div className="mt-6 text-right">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 float-right">
                <FiActivity className="text-white" />
                Open Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
