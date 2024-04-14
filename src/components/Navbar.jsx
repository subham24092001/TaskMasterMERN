import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pika from "../assets/pika.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 464);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 464);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignout = async () => {
    try {
      localStorage.removeItem("userId");
      alert("User Logged Out Successfully..")
      // navigate("/login");
      // console.log("User Logged Out Successfully..");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="fixed h-11 font-bold bg-gradient-to-r from-indigo-300 via-blue-400 to-green-400 flex justify-between items-center w-screen px-4 md:px-10 lg:px-20 pt-2 text-md z-50 opacity-90">
      <img
        src={pika}
        alt="Logo"
        className="rounded-full mt-0 mb-1 h-10 w-10 hover:cursor-pointer bg-slate-100 scale-100 hover:scale-105"
        onClick={() => navigate('/')}
      />

      {!isMobile ? (
        <div className="flex gap-10">
          <NavLink to="/login" className="text-sm text-white font-medium bg-blue-500 rounded-lg p-1 hover:bg-blue-400 transition-all duration-300">Login</NavLink>
          <NavLink to="/signup" className="text-sm text-white font-medium bg-blue-500 rounded-lg p-1 hover:bg-blue-400 transition-all duration-300">Signup</NavLink>
          <button onClick={handleSignout} className="text-sm text-white font-medium bg-blue-500 rounded-lg p-1 hover:bg-blue-400 transition-all duration-300">Sign Out</button>
        </div>
      ) : (
        <div className="text-2xl p-1" onClick={() => setHide(!hide)}>
          {hide ? <FaTimes /> : <FaBars />}
        </div>
      )}

      {hide && (
        <div className="flex flex-col gap-1 absolute top-14 left-0 w-full bg-white shadow-md">
          <NavLink to="/login" className="text-sm mt-1 ml-1 text-white font-medium bg-blue-500 rounded-lg p-1 w-fit hover:bg-blue-400 transition-all duration-300">Login</NavLink>
          <NavLink to="/signup" className="text-sm ml-1 text-white font-medium bg-blue-500 rounded-lg p-1 w-fit hover:bg-blue-400 transition-all duration-300">Signup</NavLink>
          <NavLink to="/login" onClick={handleSignout} className="text-sm mb-1 ml-1 text-white font-medium bg-blue-500 rounded-lg p-1 w-fit hover:bg-blue-400 transition-all duration-300">Sign Out</NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
