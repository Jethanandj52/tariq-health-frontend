import React from "react";
import { FiBarChart2, FiActivity } from "react-icons/fi";

const Reports = () => {
  const dummyReports = [
    { id: 1, name: "John Doe", type: "Blood Test", status: "Analyzed", result: "Normal" },
    { id: 2, name: "Jane Smith", type: "X-Ray", status: "Pending", result: "—" },
    { id: 3, name: "Alex Brown", type: "MRI", status: "Analyzed", result: "Minor Issue" },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <FiBarChart2 className="text-green-500 text-3xl" />
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">Reports Overview 📋</h2>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-green-100 dark:bg-gray-700">
          <tr>
            <th className="p-3 border dark:border-gray-600">Patient Name</th>
            <th className="p-3 border dark:border-gray-600">Report Type</th>
            <th className="p-3 border dark:border-gray-600">Status</th>
            <th className="p-3 border dark:border-gray-600">Result</th>
            <th className="p-3 border dark:border-gray-600 text-center">AI Chat</th>
          </tr>
        </thead>
        <tbody>
          {dummyReports.map((report) => (
            <tr
              key={report.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-3 border dark:border-gray-600">{report.name}</td>
              <td className="p-3 border dark:border-gray-600">{report.type}</td>
              <td
                className={`p-3 border dark:border-gray-600 font-medium ${
                  report.status === "Analyzed"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {report.status}
              </td>
              <td className="p-3 border dark:border-gray-600">{report.result}</td>
              <td className="p-3 border text-center dark:border-gray-600">
                <button className="flex items-center justify-center mx-auto gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition">
                  <FiActivity /> Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
