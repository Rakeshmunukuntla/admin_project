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

  // const textOnly = /^[A-Za-z\s]*$/;
  const textOnly = /^[A-Za-z\s()\/-]*$/;

  // Load job
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
      console.error(err);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-200 to-emerald-300 px-4 py-20">
        <div className="w-full max-w-3xl p-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-bold text-neutral-900 text-center mb-8">
            Edit Job
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="font-semibold text-neutral-900">
                🏷 Job Title
              </label>
              <input
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold text-neutral-900">
                📂 Category
              </label>
              <select
                className="w-full p-3 border rounded-xl bg-white/70"
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
                <p className="text-red-600 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="font-semibold text-neutral-900">
                🎯 Experience
              </label>
              <input
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              />
              {errors.experience && (
                <p className="text-red-600 text-sm">{errors.experience}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold text-neutral-900">
                📍 Job Location (City)
              </label>
              <input
                className="w-full p-3 border rounded-xl bg-white/70"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              {errors.location && (
                <p className="text-red-600 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Location Type */}
            <div>
              <label className="font-semibold text-neutral-900">
                🌍 Location Type
              </label>
              <select
                className="w-full p-3 border rounded-xl bg-white/70"
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
              <label className="font-semibold text-neutral-900">
                📝 Job Description
              </label>
              <textarea
                className="w-full p-3 border rounded-xl bg-white/70 h-32"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <p className="font-semibold text-neutral-900">
                🧠 Skills Required:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {skillsList.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 bg-white/50 p-2 rounded-xl border cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
              {errors.skills && (
                <p className="text-red-600 text-sm">{errors.skills}</p>
              )}
            </div>

            {/* Submit */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold shadow-lg">
              Update Job
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
