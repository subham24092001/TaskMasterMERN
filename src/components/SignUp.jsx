import React, { useState } from 'react';
import FormInput from './FormInput.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURI from "../utils/constant.jsx";

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      errorMessage: 'Username should include 3-16 characters and should not include any special characters!',
      label: 'Name',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Please enter a valid email address!',
      label: 'Email',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should contain 8-20 characters with at least 1 number, 1 special character, and 1 letter!',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,20}$',
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords do not match!',
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      await axios.post(`${baseURI}/signup`, { name, email, password });
      alert('Signed Up Successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#9B5DE5] via-[#845EC2] to-[#D65DB1]">
      <div className="pt-16">
        <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6" onSubmit={handleSubmit}>
          {inputs.map((input) => {
            return <FormInput key={input.id} {...input} value = {values[input.name]} onChange={onChange} />;
          })}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
