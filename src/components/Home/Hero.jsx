import React, { useState } from "react";

const Hero = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative pt-30 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">

      {/* ✅ Left Side */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Your <span className="text-purple-600 dark:text-purple-400">Smart Health Companion</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto md:mx-0">
          Upload your medical reports, get instant AI insights, and track your health easily. 
          MedEase helps you stay informed and make smarter health decisions effortlessly 💡
        </p>

        {/* ✅ Buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8">
          <button
            
            className="bg-purple-600 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-purple-700 active:scale-95 transition"
          >
            Stay Safe 
          </button>

          <button
            
            className="bg-transparent border border-purple-600 text-purple-700 dark:text-purple-400 py-3 px-6 rounded-full font-semibold hover:bg-purple-100 dark:hover:bg-gray-800 transition"
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* ✅ Right Side Illustration */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="https://www.thoroughcare.net/hs-fs/hubfs/2024%20main%20image_v11-min.png?width=1918&height=1250&name=2024%20main%20image_v11-min.png"
          alt="AI Health Assistant"
          className="w-80 sm:w-96 md:w-[480px] h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* ✅ Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/40 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200/40 blur-3xl rounded-full -z-10"></div>

      {/* ✅ Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center relative">
            <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              Upload Your Medical Report
            </h2>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded mb-4"
            />
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
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
            <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              MedEase Demo 🎥
            </h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.youtube.com/embed/jFz3B9FJj7A"
                title="MedEase Demo"
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
