import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";

const ManageDoctors = () => {
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
  const [modalOpen, setModalOpen] = useState(false);

  const API_URL = "http://localhost:7000/api/doctors";

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setDoctors(data.doctors);
    } catch (err) {
      toast.error("Unable to load doctor list");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("timings.")) {
      const key = name.split(".")[1];
      setDoctor((prev) => ({
        ...prev,
        timings: { ...prev.timings, [key]: value },
      }));
    } else {
      setDoctor({ ...doctor, [name]: value });
    }
  };

  // Toggle available days
  const toggleDay = (day) => {
    setDoctor((prev) => {
      const updated = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: updated };
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/add`, doctor);
      toast.success(res.data.message || "Doctor added successfully");
      setModalOpen(false);
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

  // Delete doctor
  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of this doctor?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.info("Doctor removed");
      fetchDoctors();
    } catch {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700">Doctor Directory</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          <AiOutlinePlus /> Add New
        </button>
      </div>

      {/* Doctor Table */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200">
        {doctors.length === 0 ? (
          <p className="text-center text-gray-400">No doctors available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm md:text-base">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Specialty</th>
                  <th className="p-3 border">Experience</th>
                  <th className="p-3 border">Hospital</th>
                  <th className="p-3 border">City</th>
                  <th className="p-3 border">Fee</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-100 transition">
                    <td className="p-3 border">{doc.name}</td>
                    <td className="p-3 border">{doc.specialization}</td>
                    <td className="p-3 border text-center">{doc.experience} yrs</td>
                    <td className="p-3 border">{doc.hospitalName}</td>
                    <td className="p-3 border">{doc.city}</td>
                    <td className="p-3 border text-center">₹{doc.consultationFee}</td>
                    <td className="p-3 border">{doc.email}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center justify-center mx-auto gap-1"
                      >
                        <AiFillDelete /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-7 rounded-2xl shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Register Doctor
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={doctor.name}
                  onChange={handleChange}
                  placeholder="Doctor Full Name"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="phone"
                  value={doctor.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
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
                  placeholder="Experience in years"
                  required
                  className="p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  name="qualification"
                  value={doctor.qualification}
                  onChange={handleChange}
                  placeholder="Qualification"
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
                  placeholder="Image URL (optional)"
                  className="p-3 border rounded-lg w-full"
                />
              </div>

              {/* Available Days */}
              <div>
                <label className="font-medium text-gray-700">Available Days:</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <label key={day} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={doctor.availableDays.includes(day)}
                        onChange={() => toggleDay(day)}
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
                placeholder="Brief biography"
                rows="3"
                className="w-full p-3 border rounded-lg"
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
