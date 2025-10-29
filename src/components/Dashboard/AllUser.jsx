import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "./DashboardNav";
import Footer from "../Home/Footer";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://tariq-health-backend.vercel.app/auth/users");
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error("Unable to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tariq-health-backend.vercel.app/auth/users/${id}`);
      toast.success("User removed successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await axios.put(`https://tariq-health-backend.vercel.app/auth/users/${id}`, {
        isActive: !currentStatus,
      });
      toast.success(
        `User is now ${!currentStatus ? "Online" : "Offline"}`
      );
      fetchUsers();
    } catch (error) {
      toast.error("Status update failed");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto mt-24 px-4 md:px-8 mb-24">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          Registered Users
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col justify-between transition hover:scale-105"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {user.email}
                  </p>
                  <p
                    className={`mt-2 font-medium ${
                      user.isActive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {user.isActive ? "Online" : "Offline"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleToggle(user._id, user.isActive)}
                    className={`px-4 py-2 rounded-xl font-medium transition ${
                      user.isActive
                        ? "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {user.isActive ? "Set Offline" : "Set Online"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllUsers;
