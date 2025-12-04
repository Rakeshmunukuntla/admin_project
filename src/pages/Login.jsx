import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      alert("Invalid login");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* PAGE BACKGROUND */}
      <div
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-[#020617]"
            : "bg-gradient-to-br from-white to-slate-200"
        }`}
        style={{
          backgroundImage:
            theme === "dark"
              ? "linear-gradient(0deg, transparent 24%, rgba(56,189,248,.18) 25%, rgba(56,189,248,.18) 26%, transparent 27%, transparent 74%, rgba(129,140,248,.16) 75%, rgba(129,140,248,.16) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37,99,235,.18) 25%, rgba(37,99,235,.18) 26%, transparent 27%, transparent 74%, rgba(45,212,191,.16) 75%, rgba(45,212,191,.16) 76%, transparent 77%, transparent)"
              : "",
          backgroundSize: "80px 80px",
        }}
      >
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px] animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* DARK / LIGHT TOGGLE */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-6 right-6 text-white bg-white/10 backdrop-blur-xl p-3 rounded-full border border-white/20 hover:bg-white/20 transition"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>

        {/* LOGIN BOX */}
        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div
            className="rounded-3xl p-10 border backdrop-blur-2xl shadow-2xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(225,255,255,0.55), rgba(212,241,255,0.45), rgba(198,230,255,0.65))",
              borderColor: "rgba(255,255,255,0.25)",
            }}
          >
            {/* ANIMATED LOGO */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg animate-pulse-slow">
                <svg
                  className="w-10 h-10 text-white drop-shadow-xl"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-4xl font-extrabold text-center text-slate-900 drop-shadow-sm">
              Admin Login
            </h2>
            <p className="text-center text-slate-700/70 mb-8">
              Access your admin panel
            </p>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-3 mb-4 rounded-xl bg-white/60 focus:bg-white/90 backdrop-blur-xl border border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/60 focus:bg-white/90 backdrop-blur-xl border border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
              >
                👁
              </button>
            </div>

            {/* SOCIAL LOGIN */}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 py-4 font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2.5s infinite;
        }
      `}</style>

      <Footer />
    </>
  );
}
