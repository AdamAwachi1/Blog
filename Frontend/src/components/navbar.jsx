import React, { useState } from "react";
import SignupPopup from "./signup";
import LoginPopup from "./login";

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleSignupPopup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 p-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex">
            <h1 className="text-xl font-bold text-white">Blog Site</h1>
          </div>
          <div className="space-x-4">
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
        />
      )}
    </>
  );
};

export default Navbar;
