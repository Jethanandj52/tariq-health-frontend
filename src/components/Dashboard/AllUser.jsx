import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "./DashboardNav";
import Footer from "../Home/Footer";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:7000/auth/users");
      setUsers(res.data.users || []);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hackathone-backend-hazel.vercel.app/auth/users/${id}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  // ✅ Toggle user active status
  const handleToggle = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:7000/auth/users/${id}`, {
        isActive: !currentStatus,
      });
      toast.success(
        `User is now ${!currentStatus ? "Active (Online)" : "Inactive (Offline)"}`
      );
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto mt-24 px-4 md:px-8 mb-20">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-100">
          All Registered Users
        </h1>

        {/* ✅ Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold">
                <tr>
                  <th className="p-3 border dark:border-gray-600">Name</th>
                  <th className="p-3 border dark:border-gray-600">Email</th>
                  <th className="p-3 border dark:border-gray-600">Status</th>
                  <th className="p-3 border dark:border-gray-600 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 border dark:border-gray-600">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-3 border dark:border-gray-600">
                      {user.email}
                    </td>

                    {/* ✅ Status Toggle */}
                    <td className="p-3 border dark:border-gray-600 text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                       
                        {/* <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div> */}
                      </label>
                      <span
                        className={`ml-2 text-xs font-medium ${
                          user.isActive
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {user.isActive ? "Online" : "Offline"}
                      </span>
                    </td>

                    {/* ✅ Delete Button */}
                    <td className="p-3 border text-center dark:border-gray-600">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AllUser;
