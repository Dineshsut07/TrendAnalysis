import React, { useContext, useState } from 'react';
import 'tailwindcss/tailwind.css';
import './Login.css'; // Import your custom CSS
import { Facebook, Google, Instagram, Twitter } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { AuthContext } from '../context/AuthContext.jsx';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // const { login } = useContext(AuthContext);
  // console.log(currentUser);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
      console.log(res);
    } catch (error) {
      setErr(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary"> {/* Background color from CSS */}
      <div className="form-container"> {/* Styles from CSS */}
        <p className="title text-gradient">Login</p> {/* Gradient text from CSS */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={handleChange}
            />
            <div className="forgot">
              <Link rel="noopener noreferrer" to="/">
                Forgot Password?
              </Link>
            </div>
          </div>
          <button type="submit" className="w-full p-4 mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign in
          </button>
          {err && <p className="text-center text-red-500">{err}</p>}
        </form>
        <div className="flex items-center justify-between mb-6 social-message"> {/* Spacing from CSS */}
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <div className="flex justify-center gap-4 social-icons"> {/* Centered and spaced social icons */}
          <button aria-label="Log in with Google" className="icon">
            <Google />
          </button>
          <button aria-label="Log in with Facebook" className="icon">
            <Facebook />
          </button>
          <button aria-label="Log in with Instagram" className="icon">
            <Instagram />
          </button>
        </div>
        <p className="signup">
          Don't have an account?
          <Link rel="noopener noreferrer" to="/register" className="">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
