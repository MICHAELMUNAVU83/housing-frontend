import React from "react";
import { Link } from "react-router-dom";

function SplashScreen({ setStoredToken }) {
  return (
    <div className=" background  bg-cover h-[100vh]">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Welcome to</h1>
        <h1 className="text-6xl font-bold text-white">Property Finder</h1>
        <h1 className="text-6xl font-bold text-white">App</h1>

        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SplashScreen;
