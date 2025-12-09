import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const dashboardCards = [
    {
      to: "/create-blog",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      title: "Create Blog",
      description: "Write a new blog post",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0",
    },

    {
      to: "/blogs",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: "Manage Blogs",
      description: "Edit or delete existing posts",
      gradient: "from-purple-500 to-pink-500",
      delay: "100",
    },

    {
      to: "/create-job",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Create Job",
      description: "Post a new job opening",
      gradient: "from-green-500 to-emerald-500",
      delay: "200",
    },

    {
      to: "/jobs",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      title: "Manage Jobs",
      description: "Update job listings",
      gradient: "from-orange-500 to-red-500",
      delay: "300",
    },

    {
      to: "/job-applications",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h4M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm3 0V3a1 1 0 011-1h2a1 1 0 011 1v1"
          />
        </svg>
      ),
      title: "Manage Applications",
      description: "Review candidate applications",
      gradient: "from-teal-500 to-indigo-500",
      delay: "400",
    },

    {
      to: "/view-resumes",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      title: "View Resumes",
      description: "Browse uploaded resumes",
      gradient: "from-sky-500 to-cyan-500",
      delay: "500",
    },

    {
      to: "/start-conversation",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h8M8 14h5M5 20l2-3h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v13z"
          />
        </svg>
      ),
      title: "Start Conversation",
      description: "View contact submissions",
      gradient: "from-indigo-500 to-fuchsia-500",
      delay: "600",
    },

    {
      to: "/ready-to-get-started",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Ready to Get Started",
      description: "Configure hiring workflow",
      gradient: "from-emerald-500 to-lime-400",
      delay: "700",
    },

    // ⭐ NEW: CREATE EVENT
    {
      to: "/create-event",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Create Event",
      description: "Post a new event",
      gradient: "from-yellow-400 to-orange-500",
      delay: "800",
    },

    // ⭐ NEW: MANAGE EVENTS
    {
      to: "/events",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      ),
      title: "Manage Events",
      description: "Edit or delete events",
      gradient: "from-pink-500 to-red-400",
      delay: "900",
    },
    // ⭐ NEW: EVENT REGISTRATIONS
    {
      to: "/event-registrations",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 9h8m-8 4h5m-5-8h.01M9 16h.01"
          />
        </svg>
      ),
      title: "Event Registrations",
      description: "View all event attendees",
      gradient: "from-indigo-400 to-purple-500",
      delay: "1000",
    },
  ];

  return (
    <>
      <Header />

      <div
        className="min-h-screen p-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%,transparent 74%, rgba(129,140,248,.16) 75%,rgba(129,140,248,.16) 76%,transparent 77%,transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%,rgba(37,99,235,.18) 26%,transparent 27%,transparent 74%, rgba(45,212,191,.16) 75%,rgba(45,212,191,.16) 76%,transparent 77%,transparent)",
          backgroundSize: "80px 80px",
          backgroundColor: "#020617",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-sky-900/70"></div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
          <div
            className={`max-w-6xl w-full transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 animate-gradient">
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-300">
                Welcome back! Manage your content with ease.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.to}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105"
                  style={{
                    animationDelay: `${card.delay}ms`,
                    animation: isLoaded
                      ? "slideInUp 0.8s ease-out forwards"
                      : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  <div className="absolute inset-0 rounded-2xl">
                    <div
                      className={`absolute inset-[-2px] bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}
                    ></div>
                  </div>

                  <div className="relative p-8 flex items-center space-x-6">
                    <div
                      className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${card.gradient} p-4 text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-6`}
                    >
                      {card.icon}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                        {card.title}
                      </h2>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>

      <Footer />
    </>
  );
}
