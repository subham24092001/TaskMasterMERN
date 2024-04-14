import React, { useState } from "react";
import baseURI from "../utils/constant.jsx";
import FormInput from "./FormInput.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address!",
      label: "Email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should contain 8-20 characters with at least 1 number, 1 special character, and 1 letter!",
      label: "Password",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,20}$",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post(`${baseURI}/login`, { email, password });
      if (response.data) {
        console.log("User Logged In..");
        localStorage.setItem("userId", response.data);
        navigate('/');
      } else {
        console.log("Invalid User");
        alert("Invalid User !!");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#9B5DE5] via-[#845EC2] to-[#D65DB1]">
      <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit} style={{ marginTop: "80px" }}>
        {inputs.map((input) => {
          return <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />;
        })}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
