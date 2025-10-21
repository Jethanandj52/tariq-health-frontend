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
    setFormData({ ...formData, userAnswer: "" });
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
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      {/* Header */}
      <div className="text-center py-16 bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-800 dark:to-emerald-700 text-white">
        <h1 className="text-4xl font-bold mb-3">Contact HealthMate</h1>
        <p className="text-lg text-green-100 dark:text-gray-300">
          We’re here to support your health journey — reach out anytime!
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side — Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400">
            HealthMate Support Center
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have questions about appointments, doctors, or your health profile?
            Our support team is always ready to help.
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
          <div className="mt-8 border-2 border-green-200 dark:border-green-700 rounded-xl overflow-hidden shadow-md">
            <iframe
              title="HealthMate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28938.48124553708!2d74.315175!3d31.52037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904d3c5ff68ad%3A0xa2df9bb0dddf1a5b!2sLahore%20General%20Hospital!5e0!3m2!1sen!2s!4v1739783723568!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Right Side — Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700 p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-green-700 dark:text-green-400">
            Send Us a Message
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Type your message..."
            ></textarea>
          </div>

          {/* Simple Math Verification */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-medium">
              Solve: {math.a} + {math.b} =
            </span>
            <input
              type="number"
              name="userAnswer"
              value={formData.userAnswer}
              onChange={handleChange}
              className="w-20 p-2 border rounded-lg dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="button"
              onClick={verifyMath}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Verify
            </button>
          </div>

          {status && (
            <p
              className={`text-center mb-3 font-medium ${
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
            className={`w-full py-3 rounded-lg font-semibold transition ${
              verified
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
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
