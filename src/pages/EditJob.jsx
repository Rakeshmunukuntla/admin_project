import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Header from "./Header";
import Footer from "./Footer";
import { showToast } from "../toast";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    experience: "",
    description: "",
    skills: [],
    location: "",
    locationType: "Hybrid",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Project Managers",
    "SAP Hybris",
    "AEM",
    "React / Frontend",
    "Java backend",
    "QA / Automation",
    "DevOps",
    "UI/UX",
  ];

  const skillsList = [
    "Java",
    "SQL",
    "React",
    "SAP Hybris",
    "Python",
    "Spring Boot",
    "AWS",
    "DevOps",
    "Agile",
    "Jira",
    "Leadership",
    "AEM",
    "Cloud Services",
    "REST APIs",
    "Java Script",
    "Type Script",
    "Tailwind CSS",
    "Microservices",
    "Selenium",
    "Test Automation",
    "Kubernetes",
    "Docker",
    "Figma",
    "Design Systems",
    "User Research",
  ];

  const textOnly = /^[A-Za-z\s()\/-]*$/;

  useEffect(() => {
    API.get(`/jobs/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleSkillToggle = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Job title is required";
    else if (!textOnly.test(form.title))
      newErrors.title = "Only alphabets allowed";

    if (!form.category.trim()) newErrors.category = "Category is required";

    if (!form.experience.trim())
      newErrors.experience = "Experience is required";

    if (!form.location.trim()) newErrors.location = "Location is required";
    else if (!textOnly.test(form.location))
      newErrors.location = "Only alphabets allowed";

    if (!form.description.trim())
      newErrors.description = "Job description is required";

    if (form.skills.length === 0)
      newErrors.skills = "Select at least one skill";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await API.put(`/jobs/${id}`, form);
      showToast("Job updated successfully!", "success");
      setTimeout(() => navigate("/jobs"), 2000);
    } catch (err) {
      showToast("Failed to update job", "error");
    }
  };

  return (
    <>
      <Header />

      {/* ---------- Dashboard Background ---------- */}
      <div
        className="min-h-screen p-10 relative overflow-hidden flex justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* ---------- Dark Glass Card ---------- */}
        <div
          className="relative z-10 max-w-3xl w-full p-10 rounded-3xl shadow-2xl 
          bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
          border border-white/10"
        >
          <h1
            className="text-4xl font-extrabold text-center mb-10 
            bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Edit Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            {/* Title */}
            <div>
              <label className="font-semibold text-cyan-300">🏷 Job Title</label>
              <input
                className="w-full p-3 mt-1 rounded-xl bg-white/80 text-black border"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold text-cyan-300">📂 Category</label>
              <select
                className="w-full p-3 mt-1 rounded-xl bg-white/80 text-black border"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="font-semibold text-cyan-300">
                🎯 Experience
              </label>
              <input
                className="w-full p-3 mt-1 rounded-xl bg-white/80 text-black border"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              />
              {errors.experience && (
                <p className="text-red-400 text-sm">{errors.experience}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold text-cyan-300">
                📍 Job Location (City)
              </label>
              <input
                className="w-full p-3 mt-1 rounded-xl bg-white/80 text-black border"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              {errors.location && (
                <p className="text-red-400 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Location Type */}
            <div>
              <label className="font-semibold text-cyan-300">
                🌍 Location Type
              </label>
              <select
                className="w-full p-3 mt-1 rounded-xl bg-white/80 text-black border"
                value={form.locationType}
                onChange={(e) =>
                  setForm({ ...form, locationType: e.target.value })
                }
              >
                <option>Hybrid</option>
                <option>Remote</option>
                <option>On-site</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-cyan-300">
                📝 Job Description
              </label>
              <textarea
                className="w-full p-3 mt-1 rounded-xl bg-white/80 text-black border h-32"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
              {errors.description && (
                <p className="text-red-400 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <p className="font-semibold text-cyan-300">🧠 Skills Required</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {skillsList.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 bg-white/20 p-2 rounded-xl 
                      border border-white/20 cursor-pointer hover:bg-white/30 transition"
                  >
                    <input
                      type="checkbox"
                      checked={form.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="accent-cyan-400"
                    />
                    <span className="text-gray-200">{skill}</span>
                  </label>
                ))}
              </div>

              {errors.skills && (
                <p className="text-red-400 text-sm">{errors.skills}</p>
              )}
            </div>

            {/* Submit */}
            <button
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 
              text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30"
            >
              Update Job
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
