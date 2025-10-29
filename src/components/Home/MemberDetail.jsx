import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MemberDetail = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [lang, setLang] = useState("english");
  const [loadingTrans, setLoadingTrans] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 🧾 Upload form data
  const [formData, setFormData] = useState({
    title: "",
    testName: "",
    hospitalOrLab: "",
    doctorName: "",
    date: "",
    price: "",
    additionalNotes: "",
    bpSystolic: "",
    bpDiastolic: "",
    temperature: "",
    fastingSugar: "",
    height: "",
    weight: "",
    files: [],
  });

  // 🌍 Translate AI feedback
  const handleTranslate = async (targetLang) => {
    try {
      setLoadingTrans(true);
      const res = await fetch(
        "https://hackathon-backend-flax.vercel.app/api/reports/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: feedbackText, lang: targetLang }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setLang(targetLang);
        setTranslatedText(data.translated);
      } else alert("Translation failed");
    } catch (err) {
      alert("Translation error");
    } finally {
      setLoadingTrans(false);
    }
  };

  // 🧍 Fetch member
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(
          `https://hackathon-backend-flax.vercel.app/api/family/${id}`
        );
        const data = await res.json();
        if (data.success) setMember(data.member);
      } catch (err) {
        console.error("Error fetching member:", err);
      }
    };
    fetchMember();
  }, [id]);

  // 📄 Fetch member reports
  const fetchReports = async () => {
    try {
      const res = await fetch(
        `https://hackathon-backend-flax.vercel.app/api/reports/member/${id}`
      );
      const data = await res.json();
      if (data.success) setReports(data.reports);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [id]);

  // ✍️ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, files: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 📤 Upload new report
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("familyMember", id);
      for (let key in formData) {
        if (key === "files") {
          for (let file of formData.files) fd.append("files", file);
        } else {
          fd.append(key, formData[key]);
        }
      }

      const res = await fetch(
        "https://hackathon-backend-flax.vercel.app/api/reports/add",
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Report uploaded successfully!");
        setShowModal(false);
        fetchReports();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // 💬 Open feedback modal
  const handleFeedbackClick = (aiData) => {
    if (!aiData) {
      setFeedbackText("⚠️ No AI feedback available");
    } else if (typeof aiData === "object") {
      setFeedbackText(aiData.feedback || JSON.stringify(aiData, null, 2));
    } else {
      setFeedbackText(aiData);
    }
    setTranslatedText("");
    setLang("english");
    setShowFeedback(true);
  };

  if (!member) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="mt-20 bg-white dark:bg-gray-900 rounded-2xl p-6">
      {/* 👤 Member Info */}
      <div className="text-center mb-6">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-24 h-24 mx-auto rounded-full border-4 border-green-400 mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
        <p className="text-green-600 dark:text-green-400 font-medium mb-2">
          {member.relation}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Added on: {new Date(member.createdAt).toLocaleDateString()}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          ➕ Add Report
        </button>
      </div>

      {/* 📋 Reports Table */}
      <div className="mt-8 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-3">🧾 Uploaded Reports</h3>
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports uploaded yet.</p>
        ) : (
          <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2">Title</th>
                <th className="p-2">Test</th>
                <th className="p-2">Hospital</th>
                <th className="p-2">Doctor</th>
                <th className="p-2">BP</th>
                <th className="p-2">Temp</th>
                <th className="p-2">Sugar</th>
                <th className="p-2">Date</th>
                <th className="p-2 text-center">Files</th>
                <th className="p-2 text-center">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-2">{r.title}</td>
                  <td className="p-2">{r.testName}</td>
                  <td className="p-2">{r.hospitalOrLab}</td>
                  <td className="p-2">{r.doctorName}</td>
                  <td className="p-2">
                    {r.bpSystolic && r.bpDiastolic
                      ? `${r.bpSystolic}/${r.bpDiastolic}`
                      : "—"}
                  </td>
                  <td className="p-2">{r.temperature || "—"}</td>
                  <td className="p-2">{r.fastingSugar || "—"}</td>
                  <td className="p-2">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    {r.files.map((f, i) => (
                      <a
                        key={i}
                        href={f.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline mr-2"
                      >
                        {f.fileType === "pdf" ? "📄 PDF" : "🖼️ Img"}
                      </a>
                    ))}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleFeedbackClick(r.aiAnalysis)}
                      className="text-green-600 underline hover:text-green-800"
                    >
                      View Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📤 Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Upload Report
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Report Title"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="testName"
                placeholder="Test Name"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="hospitalOrLab"
                placeholder="Hospital / Lab"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="doctorName"
                placeholder="Doctor Name"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                name="date"
                type="date"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />

              <h4 className="mt-3 mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Health Vitals
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="bpSystolic"
                  type="number"
                  placeholder="BP Systolic"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="bpDiastolic"
                  type="number"
                  placeholder="BP Diastolic"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="temperature"
                  type="number"
                  placeholder="Temp (°C)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="fastingSugar"
                  type="number"
                  placeholder="Sugar (mg/dL)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="height"
                  type="number"
                  placeholder="Height (cm)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  name="weight"
                  type="number"
                  placeholder="Weight (kg)"
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>

              <textarea
                name="additionalNotes"
                placeholder="Additional Notes"
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded"
              />
              <input
                name="files"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleChange}
                className="w-full p-2 mt-2 mb-3 border rounded"
                required
              />

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 rounded-lg"
                >
                  Cancel
                </button>
               <button
  type="submit"
  className={`px-4 py-2 text-white rounded-lg transition ${
    isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
  }`}
  disabled={isUploading}
>
  {isUploading ? "Uploading..." : "Upload"}
</button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* 💬 Feedback Modal */}
      {showFeedback && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md pt-20 pb-20">
    <div className=" m-20 relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-[95%] sm:w-[600px] p-6 border border-gray-200 dark:border-gray-700 transition-all animate-fadeIn">

      {/* 🔝 Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4 ">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
          🧠 AI Health Feedback
        </h2>
        <button
          onClick={() => setShowFeedback(false)}
          className="text-gray-500 hover:text-red-500 text-lg transition"
        >
          ✕
        </button>
      </div>

      {/* 👤 Member Info */}
      {member && (
        <div className="flex items-center gap-4 mb-5 bg-green-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-green-200 dark:border-green-700 shadow-sm">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-16 h-16 rounded-2xl border-2 border-green-400 shadow-md"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-lg">
              {member.name}
            </p>
            <p className="text-green-600 dark:text-green-400 text-sm">
              {member.relation}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Added on {new Date(member.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* 🌐 Language Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1 font-medium">
          🌍 Select Language:
        </label>
        <select
          onChange={(e) => {
            const selectedLang = e.target.value;
            if (selectedLang === "english") setTranslatedText("");
            else handleTranslate(selectedLang);
          }}
          value={lang}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-400"
        >
          <option value="english">English</option>
          <option value="romanHindi">Hindi (Roman)</option>
          <option value="romanUrdu">Urdu (Roman)</option>
        </select>
      </div>

      {/* 🩺 AI Feedback Section */}
      <div className="max-h-[55vh] overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-inner">
        {loadingTrans ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Translating...
          </p>
        ) : (
          <div className="space-y-3 text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
            {(translatedText || feedbackText)
              .split("\n")
              .map((line, i) => {
                // agar heading format "**Heading**" hai
                const heading = line.match(/\*\*(.+?)\*\*/);
                if (heading) {
                  return (
                    <h4
                      key={i}
                      className="text-green-600 dark:text-green-400 font-semibold text-base mt-4 mb-1 border-l-4 border-green-400 pl-2"
                    >
                      {heading[1]}
                    </h4>
                  );
                }
                // agar bullet point ya paragraph hai
                if (line.trim().startsWith("- ")) {
                  return (
                    <li
                      key={i}
                      className="list-disc ml-6 text-gray-700 dark:text-gray-300"
                    >
                      {line.replace("- ", "")}
                    </li>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {line}
                  </p>
                );
              })}
          </div>
        )}
      </div>

      {/* 🚪 Footer Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowFeedback(false)}
          className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-md transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MemberDetail;
