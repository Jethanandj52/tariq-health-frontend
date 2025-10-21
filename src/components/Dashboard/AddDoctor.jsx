import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiPlus, FiMail, FiPhone } from "react-icons/fi";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    qualification: "",
    hospitalName: "",
    hospitalAddress: "",
    city: "",
    consultationFee: "",
    availableDays: [],
    timings: { start: "", end: "" },
    imageUrl: "",
    bio: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const API_URL = "http://localhost:7000/api/doctors"; // ✅ change if deployed

  // 🔹 Fetch doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setDoctors(data.doctors);
    } catch (err) {
      toast.error("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // 🔹 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("timings.")) {
      const field = name.split(".")[1];
      setDoctor((prev) => ({
        ...prev,
        timings: { ...prev.timings, [field]: value },
      }));
    } else {
      setDoctor({ ...doctor, [name]: value });
    }
  };

  // 🔹 Handle days (checkbox)
  const handleDayToggle = (day) => {
    setDoctor((prev) => {
      const isSelected = prev.availableDays.includes(day);
      const updatedDays = isSelected
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: updatedDays };
    });
  };

  // 🔹 Submit doctor form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/add`, doctor);
      toast.success(res.data.message || "Doctor added successfully ✅");
      setShowModal(false);
      fetchDoctors();

      setDoctor({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        qualification: "",
        hospitalName: "",
        hospitalAddress: "",
        city: "",
        consultationFee: "",
        availableDays: [],
        timings: { start: "", end: "" },
        imageUrl: "",
        bio: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add doctor");
    }
  };

  // 🔹 Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.info("Doctor deleted successfully");
      fetchDoctors();
    } catch {
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-20 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
          Doctors Management 🩺
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          <FiPlus /> Add Doctor
        </button>
      </div>

      {/* Doctor Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        {doctors.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No doctors added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="bg-green-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Specialization</th>
                  <th className="p-3 border">Experience</th>
                  <th className="p-3 border">Hospital</th>
                  <th className="p-3 border">City</th>
                  <th className="p-3 border">Fee</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3 border">{doc.name}</td>
                    <td className="p-3 border">{doc.specialization}</td>
                    <td className="p-3 border text-center">
                      {doc.experience} yrs
                    </td>
                    <td className="p-3 border">{doc.hospitalName}</td>
                    <td className="p-3 border">{doc.city}</td>
                    <td className="p-3 border text-center">₹{doc.consultationFee}</td>
                    <td className="p-3 border flex items-center gap-2">
                      <FiMail className="text-green-500" /> {doc.email}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition flex items-center justify-center gap-1 mx-auto"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
              Add New Doctor 👨‍⚕️
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={doctor.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="phone"
                  value={doctor.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="specialization"
                  value={doctor.specialization}
                  onChange={handleChange}
                  placeholder="Specialization"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="number"
                  name="experience"
                  value={doctor.experience}
                  onChange={handleChange}
                  placeholder="Experience (yrs)"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="qualification"
                  value={doctor.qualification}
                  onChange={handleChange}
                  placeholder="Qualification (e.g. MBBS, MD)"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="hospitalName"
                  value={doctor.hospitalName}
                  onChange={handleChange}
                  placeholder="Hospital Name"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="hospitalAddress"
                  value={doctor.hospitalAddress}
                  onChange={handleChange}
                  placeholder="Hospital Address"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="city"
                  value={doctor.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="number"
                  name="consultationFee"
                  value={doctor.consultationFee}
                  onChange={handleChange}
                  placeholder="Consultation Fee"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={doctor.imageUrl}
                  onChange={handleChange}
                  placeholder="Doctor Image URL (optional)"
                  className="p-3 border rounded-lg w-full"
                />
              </div>

              {/* Available Days */}
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Available Days:
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <label key={day} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={doctor.availableDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              {/* Timings */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  name="timings.start"
                  value={doctor.timings.start}
                  onChange={handleChange}
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="time"
                  name="timings.end"
                  value={doctor.timings.end}
                  onChange={handleChange}
                  className="p-3 border rounded-lg w-full"
                />
              </div>

              {/* Bio */}
              <textarea
                name="bio"
                value={doctor.bio}
                onChange={handleChange}
                placeholder="Short bio about the doctor"
                rows="3"
                className="w-full p-3 border rounded-lg"
              />

              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
              >
                Save Doctor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDoctor;
