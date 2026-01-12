import { Link } from "wouter";
import useAuthStore from "../store/AuthStore";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  let emailValid = false;
  let passwordValid = false;

  const [location, navigate] = useLocation();
  const userToken = useAuthStore((state) => state.userToken);
  
  const setUserToken = useAuthStore((state) => state.setUserToken);
  const checkEmailValidity = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if(emailRegex.test(email)){
      setEmailError("");
      emailValid = true;
    } else {
      setEmailError("Please enter a valid email address.");
      emailValid = false;
    }
  }
  
  const checkPasswordValidity = (password) => {
    if(password.length >= 5){
      setPasswordError("");
      passwordValid = true;
    } else {
      setPasswordError("Password must be at least 5 characters long.");
      passwordValid = false;
    }
  }

  const OnLogin = async () => {
    setEmailError("");
    setPasswordError("");

    checkEmailValidity(email);
    checkPasswordValidity(password);

    if (!emailValid || !passwordValid) return;

    await login({ email, password });
  
  };

    useEffect(() => {
    if (userToken) {
      navigate("/TodoList");
    }
  }, [userToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        
       
        <h1 className="text-2xl font-semibold text-center mb-6">
          Login to my notebook and todolist app.
        </h1>
        <div className="border-1 border-main-green rounded-md p-2 my-2">
            <p className="text-center my-2 text-main-green">
                This app is a project developed by me, using React and tailwind for the frontend, and ASP.NET Core for the backend. MySql was used as the database solution.
            </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main-green"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              checkEmailValidity(e.target.value);
            }}
            
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main-green"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              checkPasswordValidity(e.target.value);
            }}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <button className="w-full bg-main-green text-white py-2 rounded-md cursor-pointer transition hover:bg-main-green-dark" onClick={OnLogin}> Login </button>

          <Link to="/TodoList">
              <button className="w-full bg-main-green text-white py-2 rounded-md cursor-pointer transition hover:bg-main-green-dark" > Continue as guest</button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;