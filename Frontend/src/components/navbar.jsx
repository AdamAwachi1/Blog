import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupPopup from "./signup";
import LoginPopup from "./login";

const Navbar = ({ user, setUser }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleSignupPopup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <nav className="bg-gray-800 p-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex">
            <Link to="/">
              <h1 className="text-xl font-bold text-white">Blog Site</h1>
            </Link>
          </div>
          <div className="space-x-4">
            {user ? (
              <>
                <span className="text-white">Welcome, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={toggleSignupPopup}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Signup
                </button>
                <button
                  onClick={toggleLoginPopup}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {isSignupOpen && (
        <SignupPopup
          onClose={toggleSignupPopup}
          onSwitchToLogin={toggleLoginPopup}
        />
      )}
      {isLoginOpen && (
        <LoginPopup
          onClose={toggleLoginPopup}
          onSwitchToSignup={toggleSignupPopup}
          onLogin={(userData) => {
            setUser(userData);
            setIsLoginOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
