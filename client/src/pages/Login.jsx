import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="relative min-h-screen flex w-full">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        src={"./bg-login.mp4"}
      ></video>

      {/* Left side (Topflow section) */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10 ">
        <div className="text-center">
          <h1 className="text-6xl text-black font-bold mb-4">Topflow</h1>
          <p className="text-2xl font-bold text-white">
            Revolutionize Your Team Collaboration
          </p>
        </div>
      </div>

      {/* Right side (Login/Register form) */}
      <div className="w-2/5 backdrop-blur-xl p-8 relative z-10 flex items-center justify-center">
        <div className="w-full bg-opacity-50 backdrop-blur-lg bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form
            onSubmit={() => {
              navigate("/dashboard");
            }}
          >
            {!isLogin && (
              <div className="mb-4">
                <label
                  className="block text-black text-lg mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-black text-lg mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-lg mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div className="mt-4 text-center">
            {isLogin ? (
              <p>
                New User?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p className="text-lg font-semibold">
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-500 hover:underline"
                >
                  Login here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
