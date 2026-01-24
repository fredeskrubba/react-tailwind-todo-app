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



  let emailValid = false;

  const [location, navigate] = useLocation();
  const userToken = useAuthStore((state) => state.userToken);
  
  
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
  

  const OnLogin = async () => {
    setEmailError("");


    checkEmailValidity(email);


    if (!emailValid) return;

    await login({ email, password });
  
  };

    useEffect(() => {
    if (userToken) {
      navigate("/TodoList");
    }
  }, [userToken]);

  return (
    <form className="min-h-screen flex items-center justify-center bg-gray-100" onSubmit={(e) => {
      e.preventDefault();
      OnLogin();
    }}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8" onMouseDown={(e)=> {if(e.key === "Enter"){OnLogin()}}}>
        
       
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
            }}
          />

        </div>
        <div className="flex flex-col gap-4">
          <button className="w-full bg-main-green text-white py-2 rounded-md cursor-pointer transition hover:bg-main-green-dark" type="submit"> Login </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;