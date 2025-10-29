import React, { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    userAnswer: "",
  });

  const [math, setMath] = useState({ a: 0, b: 0 });
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    generateMath();
  }, []);

  const generateMath = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setMath({ a, b });
    setFormData((prev) => ({ ...prev, userAnswer: "" }));
    setVerified(false);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const verifyMath = () => {
    if (parseInt(formData.userAnswer) === math.a + math.b) {
      setVerified(true);
      setStatus("✅ Verified! You can now send your message.");
    } else {
      setVerified(false);
      setStatus("❌ Incorrect answer. Try again.");
      generateMath();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verified) {
      setStatus("⚠️ Please solve the verification first!");
      return;
    }
    setStatus("✅ Message sent successfully!");
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "", userAnswer: "" });
    generateMath();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-all duration-500">
      {/* Header */}
      <div className="text-center py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-600 text-white shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
          Contact <span className="text-yellow-300">HealthMate</span>
        </h1>
        <p className="text-lg opacity-90">
          We’re here to support your health journey — reach out anytime!
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            HealthMate Support Center
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Have questions about appointments, doctors, or your health profile?
            Our support team is always ready to help you 24/7.
          </p>

          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold">📍 Location:</span> Lahore, Pakistan
            </li>
            <li>
              <span className="font-semibold">📧 Email:</span> support@healthmate.com
            </li>
            <li>
              <span className="font-semibold">📞 Phone:</span> +92 300 9876543
            </li>
          </ul>

          {/* Google Map */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/30 dark:border-gray-700 shadow-2xl backdrop-blur-xl">
            <iframe
              title="HealthMate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28938.48124553708!2d74.315175!3d31.52037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904d3c5ff68ad%3A0xa2df9bb0dddf1a5b!2sLahore%20General%20Hospital!5e0!3m2!1sen!2s!4v1739783723568!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Side — Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-indigo-200/40 dark:hover:shadow-purple-900/40"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Send Us a Message
          </h2>

          {/* Inputs */}
          {["name", "email"].map((field) => (
            <div key={field} className="mb-5">
              <label className="block mb-2 font-medium capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                required
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="w-full p-3 rounded-xl border border-gray-300/40 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-500 transition-all"
              />
            </div>
          ))}

          <div className="mb-5">
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="w-full p-3 rounded-xl border border-gray-300/40 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-500 transition-all"
            ></textarea>
          </div>

          {/* Math Verification */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Solve: {math.a} + {math.b} =
            </span>
            <input
              type="number"
              name="userAnswer"
              value={formData.userAnswer}
              onChange={handleChange}
              className="w-20 p-2 rounded-lg border border-gray-300/40 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 text-center focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-500 outline-none"
            />
            <button
              type="button"
              onClick={verifyMath}
              className="px-4 py-2 text-sm rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all"
            >
              Verify
            </button>
          </div>

          {status && (
            <p
              className={`text-center mb-5 font-semibold ${
                status.includes("✅")
                  ? "text-green-500"
                  : status.includes("❌")
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={!verified}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
              verified
                ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
