import { useState } from "react";
import API from "../api/axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { showToast } from "../toast";

export default function CreateJob() {
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

  const textOnlyRegex = /^[A-Za-z\s()\/-]*$/;

  const validateForm = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Job Title is required";
    else if (!textOnlyRegex.test(form.title))
      newErrors.title = "Only alphabets allowed";

    if (!form.category) newErrors.category = "Category is required";

    if (!form.experience.trim())
      newErrors.experience = "Experience is required";

    if (!form.location.trim()) newErrors.location = "City is required";
    else if (!textOnlyRegex.test(form.location))
      newErrors.location = "Only alphabets allowed";

    if (!form.description.trim())
      newErrors.description = "Description is required";

    if (form.skills.length === 0)
      newErrors.skills = "Select at least one skill";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSkillToggle = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await API.post("/jobs", form);
      showToast("Job created successfully!", "success");
      setTimeout(() => navigate("/jobs"), 1800);
    } catch (err) {
      showToast("Error creating job", "error");
    }
  };

  return (
    <>
      <Header />

      {/* ---------------- SAME BACKGROUND AS DASHBOARD ---------------- */}
      <div
        className="min-h-screen p-8 relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        {/* ---------------- FORM CARD ---------------- */}
        <div className="relative z-10 w-full max-w-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-3xl shadow-2xl border border-white/10">
          <h1
            className="text-4xl font-extrabold text-center mb-8 
            bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Create Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            {/* Title */}
            <div>
              <label className="block font-semibold mb-1 text-cyan-300">
                🏷 Job Title
              </label>
              <input
                placeholder="e.g., Project Manager"
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1 text-cyan-300">
                📂 Category
              </label>
              <select
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block font-semibold mb-1 text-cyan-300">
                🎯 Experience
              </label>
              <input
                placeholder="e.g., 5+ years"
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
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
              <label className="block font-semibold mb-1 text-cyan-300">
                📍 Job Location (City)
              </label>
              <input
                placeholder="e.g., Hyderabad"
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              {errors.location && (
                <p className="text-red-400 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Location Type */}
            <div>
              <label className="block font-semibold mb-1 text-cyan-300">
                🌍 Location Type
              </label>
              <select
                className="w-full p-3 rounded-xl bg-white/80 text-black border"
                value={form.locationType}
                onChange={(e) =>
                  setForm({ ...form, locationType: e.target.value })
                }
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1 text-cyan-300">
                📝 Job Description
              </label>
              <textarea
                className="w-full p-3 rounded-xl bg-white/80 text-black border h-32"
                placeholder="Enter job description…"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              {errors.description && (
                <p className="text-red-400 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <p className="font-semibold mb-2 text-cyan-300">
                🧠 Skills Required:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillsList.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 bg-white/40 p-2 rounded-xl border cursor-pointer hover:bg-white/60"
                  >
                    <input
                      type="checkbox"
                      checked={form.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="accent-cyan-500"
                    />
                    <span className="text-black">{skill}</span>
                  </label>
                ))}
              </div>

              {errors.skills && (
                <p className="text-red-400 text-sm">{errors.skills}</p>
              )}
            </div>

            {/* Submit */}
            <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold text-lg shadow-lg">
              Create Job
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
