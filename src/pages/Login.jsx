import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      alert("Invalid login");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header></Header>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>

          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md mx-4 transform transition-all duration-500 hover:scale-105"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden group">
            {/* Gradient Border Animation */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500"></div>

            {/* Content Container */}
            <div className="relative">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-6">
                    <svg
                      className="w-10 h-10 text-white"
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
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold text-center text-white mb-2">
                Admin Portal
              </h2>
              <p className="text-center text-gray-300/70 mb-8 text-sm">
                Enter your credentials to continue
              </p>

              {/* Input Fields */}
              <div className="space-y-5">
                {/* Email Field */}
                <div className="relative group">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10 ${
                      emailFocused ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
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
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 text-white border border-white/10 
                             placeholder-gray-500 backdrop-blur-xl
                             focus:outline-none focus:border-blue-400/50 focus:bg-white/10
                             hover:bg-white/[0.07] transition-all duration-300
                             focus:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10 ${
                      passwordFocused ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 text-white border border-white/10 
                             placeholder-gray-500 backdrop-blur-xl
                             focus:outline-none focus:border-blue-400/50 focus:bg-white/10
                             hover:bg-white/[0.07] transition-all duration-300
                             focus:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 z-10"
                  >
                    {showPassword ? (
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mt-6 text-sm">
                <label className="flex items-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-300">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 rounded border-gray-600 bg-gray-800/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full mt-8 py-4 px-4 rounded-xl font-semibold text-white overflow-hidden
                         bg-gradient-to-r from-blue-500 to-purple-600
                         hover:from-blue-600 hover:to-purple-700
                         transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-300
                         shadow-lg hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                <span
                  className={`relative z-10 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Sign In
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>

              {/* Additional Options */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                  >
                    Contact Admin
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer></Footer>
    </>
  );
}
