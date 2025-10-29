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

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 space-y-10 transition-all">
      {/* Header */}
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-8">
        Dashboard Overview
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Total Users",
            icon: <FiUsers />,
            value: "254",
            color: "from-indigo-500 to-purple-500",
          },
          {
            title: "Total Doctors",
            icon: <FiHeart />,
            value: "48",
            color: "from-pink-500 to-rose-500",
          },
          {
            title: "Reports Analyzed",
            icon: <FiActivity />,
            value: "340",
            color: "from-emerald-500 to-teal-500",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`relative p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all border border-white/20 dark:border-gray-700`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl`}
            ></div>
            <div className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
              {card.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              {card.title}
            </h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Disease Stats Chart Section */}
      <div className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 shadow-xl border border-white/20 dark:border-gray-700 backdrop-blur-md">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Common Diseases (AI Report Insights)
        </h3>

        <div className="w-full h-72 flex items-center justify-center text-gray-500 dark:text-gray-400">
          {/* Uncomment to activate chart */}
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
          <span className="italic text-sm">
            Chart visualization coming soon...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
