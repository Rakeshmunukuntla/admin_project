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
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>

          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
          <div
            className={`max-w-6xl w-full transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 animate-gradient">
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-300">
                Welcome back! Manage your content with ease.
              </p>

              {/* Stats Bar */}
              {/* <div className="mt-8 flex justify-center gap-8 flex-wrap">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                  <span className="text-3xl font-bold text-white">24</span>
                  <p className="text-gray-300 text-sm">Total Blogs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                  <span className="text-3xl font-bold text-white">12</span>
                  <p className="text-gray-300 text-sm">Active Jobs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                  <span className="text-3xl font-bold text-white">156</span>
                  <p className="text-gray-300 text-sm">Total Views</p>
                </div>
              </div> */}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.to}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105`}
                  style={{
                    animationDelay: `${card.delay}ms`,
                    animation: isLoaded
                      ? "slideInUp 0.8s ease-out forwards"
                      : "none",
                  }}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>

                  {/* Hover Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div
                      className={`absolute inset-[-2px] bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 flex items-center space-x-6">
                    {/* Icon Container */}
                    <div
                      className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${card.gradient} p-4 text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-6`}
                    >
                      {card.icon}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                        {card.title}
                      </h2>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>

                    {/* Arrow Icon */}
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

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 text-center">
              <div className="inline-flex gap-4">
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(20px);
          }
          66% {
            transform: translateY(30px) translateX(-20px);
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

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>

      <Footer />
    </>
  );
}
