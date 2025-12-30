import { Link } from "wouter";

const LoginPage = () => {
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
        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main-green"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main-green"
          />
        </div>

        {/* Login Button */}

        <Link to="/TodoList">
            <button className="w-full bg-main-green text-white py-2 rounded-md cursor-pointer transition"> Login </button>
        </Link>

      </div>
    </div>
  );
};

export default LoginPage;