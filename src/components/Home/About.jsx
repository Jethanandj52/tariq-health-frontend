import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // ✅ Fetch first 4 doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("https://hackathon-backend-flax.vercel.app/api/doctors/getDoctor");
        const data = await res.json();
        if (data.success) {
          setDoctors(data.doctors.slice(0, 4)); // sirf pehle 4 doctors
        } else {
          console.error("Failed to load doctors:", data.message);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* ✅ Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-200 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-b-3xl shadow-inner">
        <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-400 mb-4">
          We’re HealthMate 🩺
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          An AI-powered health companion designed to simplify your healthcare journey.
          We help you understand your reports, track your health, and make better
          lifestyle choices — all with the power of Gemini AI.
        </p>
      </section>

      {/* ✅ About HealthMate Story */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-20 px-6 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-green-700 dark:text-green-400">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            HealthMate was born out of a need for clear, personalized, and AI-driven
            healthcare understanding. Many people receive medical test reports but
            struggle to interpret them — and that’s where we step in.
          </p>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            With advanced AI models like Gemini integrated into our system, HealthMate
            explains complex results in simple language — English or Roman Urdu — and
            offers personalized health tips while respecting your privacy.
          </p>
        </div>
        <img
          src=" https://cdn.ucraft.com/fs/user_files/206856/media/images/image-hero-batcheditor-fotor-1.webp"
          alt="AI Health Assistant"
          className="rounded-2xl shadow-lg hover:scale-105 transform transition duration-500"
        />
      </section>

      {/* ✅ Mission & Values */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-green-700 dark:text-green-400">
            What Drives Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-t-4 border-green-400 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">
                🧠 Simplicity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We simplify healthcare data so everyone can understand their body
                better — no medical degree needed.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-t-4 border-blue-400 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                🔒 Privacy First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your health reports are yours. We ensure full confidentiality with
                encrypted data handling.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-t-4 border-teal-400 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3 text-teal-600 dark:text-teal-400">
                💚 Compassion
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Behind every line of code, there’s care. Our mission is to empower,
                not replace — humans helping humans through AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Team Section (Dynamic Doctors) */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-green-700 dark:text-green-400">
          Meet Our Medical Experts 👨‍⚕️👩‍⚕️
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <img
                src={`${doc.imageUrl}`}
                alt={doc.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-4 border-green-300 dark:border-green-600"
              />
              <h3 className="text-lg font-semibold">{doc.name}</h3>
              <p className="text-green-600 dark:text-green-400 mb-1">
                {doc.specialization}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-3">
                {doc.hospitalName}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Experience: {doc.experience} years
              </p>
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="bg-green-600 text-white py-2 px-5 rounded-full text-sm hover:bg-green-700 active:scale-95 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/doctors"
            className="bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            View All Doctors
          </Link>
        </div>
      </section>

      {/* ✅ Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-lg w-full relative">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setSelectedDoctor(null)}
            >
              &times;
            </button>
            <div className="text-center">
              <img
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
                className="w-28 h-28 mx-auto rounded-full border-4 border-green-400 mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold mb-1">{selectedDoctor.name}</h2>
              <p className="text-green-600 dark:text-green-400 mb-3">
                {selectedDoctor.specialization}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Qualification:</strong> {selectedDoctor.qualification}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Hospital:</strong> {selectedDoctor.hospitalName}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Address:</strong> {selectedDoctor.hospitalAddress}, {selectedDoctor.city}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Experience:</strong> {selectedDoctor.experience} years
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Consultation Fee:</strong> Rs. {selectedDoctor.consultationFee}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Available Days:</strong> {selectedDoctor.availableDays.join(", ")}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Timings:</strong> {selectedDoctor.timings.start} - {selectedDoctor.timings.end}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-4 italic">
                “{selectedDoctor.bio}”
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
