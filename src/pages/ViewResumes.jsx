import { useEffect, useState, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import API from "../api/axios";

export default function ViewResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [fileType, setFileType] = useState("all");
  const [sortOrder, setSortOrder] = useState("new");

  const [page, setPage] = useState(1);
  const pageSize = 9;

  const [resumeModal, setResumeModal] = useState(null);

  // DELETE POPUP STATES
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // SUCCESS & ERROR POPUPS
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ ...popup, show: false }), 2000);
  };

  // Fetch resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resumes");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.resumes || [];
        setResumes(data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // FILTER + SORT
  const processedData = useMemo(() => {
    let list = [...resumes];

    if (search.trim()) {
      list = list.filter((r) =>
        (r.originalName || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (fileType !== "all") {
      list = list.filter((r) => (r.mimeType || "").includes(fileType));
    }

    list.sort((a, b) =>
      sortOrder === "new"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return list;
  }, [search, fileType, sortOrder, resumes]);

  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = processedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const formatDateTime = (d) =>
    new Date(d).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // DELETE FUNCTION
  const deleteResume = async () => {
    try {
      await API.delete(`/resumes/${deleteId}`);

      setResumes((prev) => prev.filter((r) => r._id !== deleteId));
      showPopup("Resume deleted successfully!", "success");
    } catch (err) {
      console.error("Delete error:", err);
      showPopup("Failed to delete resume!", "error");
    }

    setConfirmDelete(false);
    setDeleteId(null);
  };

  // viewer selection
  const getViewerURL = (url) => {
    if (url.endsWith(".pdf")) return url;
    return `https://docs.google.com/viewer?url=${encodeURIComponent(
      url
    )}&embedded=true`;
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18), rgba(129,140,248,.16)), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18), rgba(45,212,191,.16))",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* HEADER */}
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
              Uploaded Resumes
            </h1>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-4 mb-8">
              <input
                placeholder="Search resumes..."
                className="px-4 py-2 rounded-xl bg-slate-900/70 text-white border border-purple-400/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="px-3 py-2 rounded-xl bg-slate-900/70 text-white border border-blue-400/40"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="doc">DOC / DOCX</option>
              </select>
            </div>

            {/* LIST */}
            {loading ? (
              <p className="text-gray-300 text-lg">Loading...</p>
            ) : paginatedData.length === 0 ? (
              <p className="text-gray-300 text-lg">No resumes found.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedData.map((resume) => {
                  const name = resume.originalName || "resume";

                  return (
                    <div
                      key={resume._id}
                      className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 shadow-lg"
                    >
                      <p className="text-white font-semibold truncate">
                        {name}
                      </p>
                      <p className="text-xs text-gray-400">{resume.mimeType}</p>

                      <p className="mt-2 text-xs text-gray-300">
                        Uploaded: {formatDateTime(resume.createdAt)}
                      </p>

                      {/* BUTTONS */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setResumeModal(resume.resumeUrl)}
                          className="flex-1 px-3 py-2 bg-purple-400 text-black rounded-xl text-xs font-semibold"
                        >
                          View
                        </button>

                        <a
                          href={resume.resumeUrl}
                          download
                          className="flex-1 px-3 py-2 border border-gray-400 text-gray-200 rounded-xl text-xs text-center"
                        >
                          Download
                        </a>

                        <button
                          onClick={() => {
                            setDeleteId(resume._id);
                            setConfirmDelete(true);
                          }}
                          className="px-3 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-8 text-white">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-slate-800 rounded-xl disabled:opacity-40"
                >
                  Prev
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-slate-800 rounded-xl disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VIEWER MODAL */}
        {resumeModal && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[999]">
            <div className="bg-white rounded-2xl p-4 w-[80%] h-[80%] relative shadow-2xl">
              {/* ATTRACTIVE CLOSE BUTTON */}
              <button
                onClick={() => setResumeModal(null)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full text-xl shadow-lg transition"
              >
                ✕
              </button>

              {/* Google Viewer */}
              <iframe
                src={getViewerURL(resumeModal)}
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        )}

        {/* DELETE CONFIRM POPUP */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999]">
            <div className="bg-white w-[350px] p-6 rounded-2xl shadow-xl text-center">
              <h2 className="text-xl font-bold mb-2">Delete Resume?</h2>
              <p className="text-gray-700 mb-5">
                Are you sure you want to delete this resume?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteResume}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS / ERROR POPUP */}
        {popup.show && (
          <div className="fixed inset-0 flex justify-center items-center z-[999]">
            <div
              className={`px-6 py-4 rounded-xl shadow-2xl text-white ${
                popup.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {popup.message}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
