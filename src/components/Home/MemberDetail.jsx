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

  // Fetch member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`https://hackathon-backend-flax.vercel.app/api/family/${id}`);
        const data = await res.json();
        if (data.success) setMember(data.member);
      } catch (err) {
        console.error("Error fetching member:", err);
      }
    };
    fetchMember();
  }, [id]);

  // Fetch member reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`https://hackathon-backend-flax.vercel.app/api/reports/member/${id}`);
        const data = await res.json();
        if (data.success) setReports(data.reports);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("familyMember", id);
      for (let key in formData) {
        if (key === "files") {
          Array.from(formData.files).forEach((file) => fd.append("files", file));
        } else {
          fd.append(key, formData[key]);
        }
      }

      const res = await fetch("https://hackathon-backend-flax.vercel.app/api/reports/add", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        alert("Report uploaded successfully!");
        setShowModal(false);
        setFormData({
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
        const resReports = await fetch(`https://hackathon-backend-flax.vercel.app/api/reports/member/${id}`);
        const dataReports = await resReports.json();
        if (dataReports.success) setReports(dataReports.reports);
      } else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleTranslate = async (targetLang) => {
    if (targetLang === "english") {
      setTranslatedText("");
      setLang("english");
      return;
    }
    setLoadingTrans(true);
    try {
      const res = await fetch("https://hackathon-backend-flax.vercel.app/api/reports/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: feedbackText, lang: targetLang }),
      });
      const data = await res.json();
      if (data.success) {
        setTranslatedText(data.translated);
        setLang(targetLang);
      } else alert("Translation failed");
    } catch (err) {
      alert("Translation error");
    } finally {
      setLoadingTrans(false);
    }
  };

  const handleFeedbackClick = (aiData) => {
    if (!aiData) setFeedbackText("⚠️ No AI feedback available");
    else if (typeof aiData === "object") setFeedbackText(aiData.feedback || JSON.stringify(aiData, null, 2));
    else setFeedbackText(aiData);

    setTranslatedText("");
    setLang("english");
    setShowFeedback(true);
  };

  if (!member) return <p className="text-center mt-20 text-gray-500 text-lg">Loading member data...</p>;

  return (
    <div className="mt-16 p-6 space-y-10 max-w-7xl mx-auto">
      {/* Member Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-green-100 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg">
        <img src={member.imageUrl} alt={member.name} className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md" />
        <div className="flex-1 text-center md:text-left space-y-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{member.name}</h1>
          <p className="text-green-600 dark:text-green-400 font-medium">{member.relation}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Added on {new Date(member.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 md:mt-0 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          ➕ Add Report
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">🧾 Reports</h2>
        {reports.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No reports uploaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead className="bg-green-50 dark:bg-gray-800">
                <tr>
                  {["Title", "Test", "Hospital", "Doctor", "BP", "Temp", "Sugar", "Date", "Files", "Feedback"].map((head) => (
                    <th key={head} className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r._id} className="hover:bg-green-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2">{r.title}</td>
                    <td className="px-4 py-2">{r.testName}</td>
                    <td className="px-4 py-2">{r.hospitalOrLab}</td>
                    <td className="px-4 py-2">{r.doctorName}</td>
                    <td className="px-4 py-2">{r.bpSystolic && r.bpDiastolic ? `${r.bpSystolic}/${r.bpDiastolic}` : "—"}</td>
                    <td className="px-4 py-2">{r.temperature || "—"}</td>
                    <td className="px-4 py-2">{r.fastingSugar || "—"}</td>
                    <td className="px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                      {r.files.map((f, i) => (
                        <a key={i} href={f.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline px-2 py-1 bg-green-50 dark:bg-gray-800 rounded-lg">
                          {f.fileType === "pdf" ? "📄 PDF" : "🖼️ Img"}
                        </a>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleFeedbackClick(r.aiAnalysis)}
                        className="text-green-600 dark:text-green-400 underline hover:text-green-800 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-11/12 md:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Upload Report</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { name: "title", placeholder: "Report Title" },
                { name: "testName", placeholder: "Test Name" },
                { name: "hospitalOrLab", placeholder: "Hospital / Lab" },
                { name: "doctorName", placeholder: "Doctor Name" },
                { name: "date", type: "date" },
                { name: "price", type: "number", placeholder: "Price" },
              ].map((input) => (
                <input
                  key={input.name}
                  name={input.name}
                  type={input.type || "text"}
                  placeholder={input.placeholder}
                  onChange={handleChange}
                  required={["title", "testName", "hospitalOrLab", "date"].includes(input.name)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-gray-200"
                />
              ))}

              <h4 className="font-semibold text-gray-700 dark:text-gray-300">Health Vitals</h4>
              <div className="grid grid-cols-2 gap-2">
                {["bpSystolic", "bpDiastolic", "temperature", "fastingSugar", "height", "weight"].map((v) => (
                  <input
                    key={v}
                    name={v}
                    type="number"
                    placeholder={v}
                    onChange={handleChange}
                    className="px-2 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ))}
              </div>

              <textarea
                name="additionalNotes"
                placeholder="Additional Notes"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="file"
                name="files"
                multiple
                accept=".pdf,image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 rounded-lg text-white hover:bg-gray-500 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-bold text-green-600 dark:text-green-400">🧠 AI Feedback</h2>
              <button onClick={() => setShowFeedback(false)} className="text-gray-500 hover:text-red-500">✕</button>
            </div>

            {/* Member Info */}
            <div className="flex items-center gap-4 bg-green-50 dark:bg-gray-800 p-3 rounded-xl shadow-inner">
              <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-lg border-2 border-green-500" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{member.name}</p>
                <p className="text-green-600 dark:text-green-400">{member.relation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Added on {new Date(member.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Select Language</label>
              <select
                value={lang}
                onChange={(e) => handleTranslate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="english">English</option>
                <option value="romanHindi">Hindi (Roman)</option>
                <option value="romanUrdu">Urdu (Roman)</option>
              </select>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl max-h-72 overflow-y-auto">
              {loadingTrans ? (
                <p className="text-center text-gray-600 dark:text-gray-300">Translating...</p>
              ) : (
                (translatedText || feedbackText).split("\n").map((line, i) => {
                  const heading = line.match(/\*\*(.+?)\*\*/);
                  if (heading) return <h4 key={i} className="text-green-600 dark:text-green-400 font-semibold border-l-4 border-green-400 pl-2 my-2">{heading[1]}</h4>;
                  if (line.trim().startsWith("- ")) return <li key={i} className="ml-6 list-disc text-gray-700 dark:text-gray-300">{line.replace("- ", "")}</li>;
                  return <p key={i} className="text-gray-700 dark:text-gray-300">{line}</p>;
                })
              )}
            </div>

            <button onClick={() => setShowFeedback(false)} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
