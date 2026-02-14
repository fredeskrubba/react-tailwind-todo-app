import { Link } from "wouter";
import useAuthStore from "../store/AuthStore";
import useMainStore from "../store/Mainstore";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import LoadingIcon from "../components/LoadingIcon";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const loginGuest = useAuthStore((state) => state.loginGuest);

  const [emailError, setEmailError] = useState("");



  let emailValid = false;

  const [location, navigate] = useLocation();
  const userToken = useAuthStore((state) => state.userToken);
  const isLoading = useMainStore((state) => state.isLoading);
  const setIsLoading = useMainStore((state) => state.setIsLoading);

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
    setIsLoading(true)
    setEmailError("");


    checkEmailValidity(email);


    if (!emailValid) return;

    await login({ email, password });
    setIsLoading(false)
  };

    useEffect(() => {
    if (userToken) {
      navigate("/TodoList");
    }
  }, [userToken]);

  const onGuestLogin = async () => {
    setIsLoading(true)
    await loginGuest();
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center px-12 bg-main-green text-white">
          <h1 className="text-4xl font-bold mb-6">
            Notebook & To-Do App - by Frederik Skrubbeltrang
          </h1>

          <p className="text-lg mb-4">
            This application helps you organize your daily tasks and notes
            in one simple place.
          </p>

          <ul className="space-y-3 text-base">
            <li>• Create and manage notebooks</li>
            <li>• Add, edit, and complete to-do items</li>
            <li>• Secure login with guest access</li>
          </ul>

          <p className="mt-6 text-sm opacity-90">
            Built with React & Tailwind on the frontend,  
            ASP.NET Core backend, and MariaDB database.
          </p>
      </div>
      <form className="min-h-screen flex items-center justify-center bg-gray-100" onSubmit={(e) => {
        e.preventDefault();
        OnLogin();
      }}>
        <div className="w-full max-w-md bg-white rounded-xs shadow-md p-8" onMouseDown={(e)=> {if(e.key === "Enter"){OnLogin()}}}>
          
        
          <h1 className="text-2xl font-semibold text-center mb-6">
            Login with an account or as a guest
          </h1>
          <div className="border-1 border-main-green rounded-xs p-2 my-2 text-center text-main-green">
              <p className=" my-2 ">
                  Accounts for this application are created manually by me.
                  If I haven’t set up an account for you, please use the Guest mode.
              </p>
              <p>When using guest mode</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You can fully explore the app and its features</li>
                <li>All notes and to-do items are saved normally</li>
                <li>Guest data is automatically and permanently deleted after 12 hours</li>
              </ul>
          </div>
          <div className="border-1 border-main-green rounded-xs p-2 my-2 text-center text-main-green">
              <p>Due to the deployment being free tier, logging in for the first time might take up to 30 seconds, thank you for your patience</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-main-green"
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
              className="w-full border border-gray-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-main-green"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

          </div>
          {
            isLoading ? <LoadingIcon/> : 
            <div className="flex flex-col gap-4">
              <button className="w-full bg-main-green text-white py-2 rounded-xs cursor-pointer transition hover:bg-main-green-dark" type="submit"> Login </button>

              <button className="w-full bg-main-green text-white py-2 rounded-xs cursor-pointer transition hover:bg-main-green-dark" type="button" onClick={()=> {onGuestLogin()}}> Continue as guest </button>
            </div>
          }
        </div>
      </form>
    </div>
  );
};

export default LoginPage;