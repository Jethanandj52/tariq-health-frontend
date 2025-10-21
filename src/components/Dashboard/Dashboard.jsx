import React from "react";
import { FiUsers, FiActivity, FiHeart } from "react-icons/fi";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const diseaseData = [
    { name: "Diabetes", value: 35 },
    { name: "Hypertension", value: 25 },
    { name: "Thyroid", value: 15 },
    { name: "Heart Disease", value: 25 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <FiUsers className="text-green-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">254</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <FiHeart className="text-green-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total Doctors
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">48</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <FiActivity className="text-green-500 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Reports Analyzed
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">340</p>
        </div>
      </div>

      {/* Disease Stats Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Common Diseases (AI Report Insights)
        </h3>
        <div className="w-full h-72">
          {/* <ResponsiveContainer>
            <PieChart>
              <Pie
                data={diseaseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name }) => name}
              >
                {diseaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
