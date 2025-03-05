import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie"; // Import js-cookie
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSuccess = async (response) => {
    const credential = response.credential;
    console.log("Login Success:", credential);

    // Send the Google token to your backend for verification
    try {
      const res = await axios.post("https://editor-app-backend.onrender.com/api/verifyGoogleToken", { token: credential });
      const { token } = res.data;
      console.log("Backend JWT:", token);

      // Store JWT in cookies
      Cookies.set("authToken", token, { expires: 7, path: "" }); // JWT expires in 7 days

      // Navigate to another page (for example: /dashboard)
      navigate("/editor");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="700949662841-d3117kc51jqgl0pllibqn9holath6pj4.apps.googleusercontent.com">
      <div className="login-container">
        <motion.div className="login-card enlarged" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="login-content">
            <h2 className="login-title">Login</h2>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} redirectUri="http://localhost:3000" />
            <p className="login-text">Sign in with Google to continue.</p>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
