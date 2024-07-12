import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessField: '',
    organizationName: '',
    businessDescription: '',
    phone: '',
    terms: false,
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', inputs);
      navigate("/login");
      console.log(res);
    } catch (error) {
      setErr(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 bg-primary">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-[#212e48] rounded-lg shadow-lg md:flex-row">
        
        {/* Part 1: Basic Information */}
        <div className="w-full p-8 text-white md:w-1/2">
          <p className="mb-4 text-3xl font-bold text-gradient">Register</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="username" className="text-sm font-semibold">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">New Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
          </form>
          {err && <p className="mt-2 text-red-500">{err}</p>}
        </div>

        {/* Part 2: Additional Information */}
        <div className="flex flex-col items-center justify-center w-full p-8 bg-gray-100 md:w-1/2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="businessField" className="text-sm font-semibold">Business Field</label>
              <input
                type="text"
                name="businessField"
                id="businessField"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="organizationName" className="text-sm font-semibold">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                id="organizationName"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="businessDescription" className="text-sm font-semibold">Business Description</label>
              <textarea
                name="businessDescription"
                id="businessDescription"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="w-4 h-4"
                onChange={handleChange}
              />
              <label htmlFor="terms" className="text-sm font-semibold">I agree to the terms and conditions</label>
            </div>
            <button type="submit" className="w-full p-4 mt-4 text-white bg-blue-500 rounded-xl">Sign up</button>
          </form>
          <p className="mt-4 text-lg">
  Already have an account?
  <Link to="/login" className="ml-1 text-blue-500">Sign in</Link>
</p>

        </div>
      </div>
    </div>
  );
};

export default Register;
