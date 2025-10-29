import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("https://hackathon-backend-flax.vercel.app/api/doctors/getDoctor");
        const data = await res.json();
        if (data.success) setDoctors(data.doctors.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">

      {/* Hero */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-purple-100 via-pink-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded-b-3xl shadow-inner">
        <h1 className="text-5xl font-extrabold mb-4 text-purple-700 dark:text-purple-400">
          Meet HealthMate 🩺
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          AI-driven healthcare companion that helps you understand reports, track health, 
          and make informed decisions—all while keeping your data safe and private.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 py-20 px-6 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-purple-700 dark:text-purple-400">
            Our Journey
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            HealthMate was created to make healthcare accessible and understandable for everyone.
          </p>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            By combining AI insights with personalized tips, we empower you to make better choices for your health.
          </p>
        </div>
        <img
          src="https://cdn.sanity.io/images/sqo8bpt9/production/0edd013f10a86650ad0c2271b089dc4b1a4c53d3-2400x1061.png?auto=format"
          alt="AI Health Assistant"
          className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
        />
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-purple-700 dark:text-purple-400">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-t-4 border-purple-400 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                🧠 Clarity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We make complex medical info simple so anyone can understand their health.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-t-4 border-pink-400 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">
                🔒 Privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data stays private. We ensure confidentiality with secure systems.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-t-4 border-teal-400 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">
                💚 Care
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI doesn’t replace humans—we enhance care and understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      

      {/* Doctor Modal */}
      
    </div>
  );
};

export default About;
