import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCC } from "../context/Context";
import { socket } from "../socket/socket";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { checkAuth, getUsers } = useCC();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!email, !password)) {
      alert("all field are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/authentication/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      await checkAuth();
      await getUsers();
      if (res.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // alert(error.response.data.message)
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-80 p-8 rounded-3xl shadow-xl"
      >
        <div className=" relative text-2xl h-20 font-bold text-center text-white bg-purple-700 rounded-b-full rounded-t-md shadow-lg  mb-8">
          <h1 className=" absolute top-2 left-4">Welcom To ChatApp</h1>
        </div>

        <div className="flex flex-col gap-6">
          {/* Email */}
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full px-4 py-3 rounded-xl border border-gray-300
                         focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                         transition-all duration-200`}
            />
            <label
              htmlFor="email"
              className="absolute left-4 bg-white px-1 text-gray-500
                         transition-all duration-200
                         top-3 text-base
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 peer-focus:font-medium
                         peer-not-placeholder-shown:-top-3
                         peer-not-placeholder-shown:text-sm"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              // disabled={!email}
              className={`peer w-full px-4 py-3 rounded-xl border border-gray-300
                         focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                         transition-all duration-200 `}
            />

            <label
              htmlFor="password"
              className={`absolute left-4 bg-white px-1 text-gray-500
                         transition-all duration-200
                         top-3 text-base
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 peer-focus:font-medium
                         peer-not-placeholder-shown:-top-3
                         peer-not-placeholder-shown:text-sm  `}
            >
              Password
            </label>
          </div>

          {/* Button */}
          <button
            className="bg-purple-600 hover:bg-purple-700 active:scale-95
                      text-white font-medium py-3 rounded-xl
                        transition-all duration-200 shadow-md"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="text-purple-600 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
