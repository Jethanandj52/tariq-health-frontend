import React, { useState } from "react";

const Hero = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20 bg-gradient-to-br from-blue-50 via-green-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      
      {/* ✅ Left Side */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-sm md:text-base font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">
          Welcome to HealthMate 🩺
        </h1>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Your <span className="text-green-600 dark:text-green-400">AI-Powered</span> Health Assistant
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto md:mx-0">
          Upload your reports, get instant AI analysis, and chat with your health assistant anytime. 
          Stay informed, stay healthy — the smart way 💡
        </p>

        {/* ✅ Buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-green-700 active:scale-95 transition"
          >
            Upload Report
          </button>

          <button
            onClick={() => setShowDemoModal(true)}
            className="bg-transparent border border-green-600 text-green-700 dark:text-green-400 py-3 px-6 rounded-full font-semibold hover:bg-green-100 dark:hover:bg-gray-800 transition"
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* ✅ Right Side Illustration */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="https://sharpensolutions.com/wp-content/uploads/2024/08/img-9.webp"
          alt="AI Health Analysis"
          className="w-80 sm:w-96 md:w-[480px] h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ✅ Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full -z-10"></div>

      {/* ✅ Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center relative">
            <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
              Upload Your Health Report
            </h2>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded mb-4"
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
              Analyze Now
            </button>
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ✅ Watch Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-[90%] md:w-[600px] p-6 text-center relative">
            <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
              HealthMate Demo 🎥
            </h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.youtube.com/embed/jFz3B9FJj7A"
                title="HealthMate Demo"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
