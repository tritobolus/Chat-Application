import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdConfirmationNumber } from "react-icons/md";
import axios from "axios";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");

  const [emailVerify, setEmailVerify] = useState(false);
  const [OTPLoading, setOTPLoading] = useState(false);

  const navigate = useNavigate();

  const getOTP = async (email) => {
    try {
      setOTPLoading(true);
      const res = await axios.get(
        "http://localhost:8000/authentication/verifyEmail",
        {
          params: {
            email: email,
          },
        },
      );
      setOTPLoading(false);

      console.log(res);
      alert("OTP snt to your email id");
      setOTP(res.data.OTP);
    } catch (error) {
      console.log(error.response.data.message);
      setOTPLoading(false);
      alert(error.response.data.message)
    }
  };

  const verifyOTP = () => {
    if (userOTP == OTP) {
      setEmailVerify(true);
      alert("OTP is verified!");
    } else {
      alert("OTP is incorrrect!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!email, !password, !username)) {
      alert("all field are required!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/authentication/signup",
        {
          username,
          email,
          password,
        },
      );
      console.log(res);

      if (res.status == 200) {
        alert("user Registerd!");
      }

      navigate("/signin");
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message)
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-purple-200">
      <div className="bg-white w-80  rounded-md shadow-xl flex flex-col gap-y-1">
        <div className="relative h-25 bg-purple-700 rounded-b-full rounded-t-md shadow-lg shadow-purple-300">
          <h1 className=" absolute top-7 left-10 text-2xl font-bold text-center  text-white mb-8">
            Wealcome to DevTalk
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex p-8 flex-col gap-6">
          {/* Email */}
          <div className="relative mb-8">
            <input
              id="email"
              type="email"
              placeholder=" "
              disabled={emailVerify}
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full px-4 pl-8 py-3 rounded-xl border border-gray-300
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200
                          ${emailVerify ? " cursor-not-allowed" : ""}
                        `}
            />
            <label
              htmlFor="email"
              className="absolute left-8 top-3 bg-white px-1 text-gray-500 rounded-2xl
                         transition-all duration-200
                          text-base
                         peer-focus:-top-3 peer-focus:left-5 peer-focus:text-sm peer-focus:text-purple-600 peer-focus:font-medium
                         peer-not-placeholder-shown:-top-3
                         peer-not-placeholder-shown:text-sm"
            >
              Email
            </label>

            <MdEmail className="absolute left-2 top-4 " />

            {/* buuton to get OTP */}
            {OTPLoading ? (
              <div className="loader absolute left-3 top-14"></div>
            ) : (
              <button
                type="button"
                onClick={() => getOTP(email)}
                className={` absolute left-3 top-13 text-sm  px-2 py-1 rounded-2xl ${email ? "opacity-100" : "opacity-50 hover:cursor-not-allowed"} ${OTP ? "hidden" : ""} bg-purple-300 mt-1 transition-all duration-150`}
              >
                Get OTP
              </button>
            )}

            <div
              className={`absolute  top-14 flex gap-x-2 ${!OTP && "hidden"} ${emailVerify && "hidden"} `}
            >
              {/*  ${!OTP && "hidden"} */}
              <input
                type="text"
                onChange={(e) => setUserOTP(e.target.value)}
                className={`px-2 py-1 text-sm border-2 focus:outline-none focus:border-purple-400 rounded-xl border-purple-300 w-20 `}
              />
              <button
                type="button"
                onClick={() => verifyOTP()}
                className="px-2 py-1 rounded-2xl bg-purple-300 text-sm"
              >
                Verify OTP
              </button>
            </div>
            <p
              className={`text-green-500 ${!emailVerify && "hidden"} absolute top-14 `}
            >
              Email verified
            </p>
          </div>

          {/* Username */}
          <div className="relative">
            <input
              id="username"
              type="text"
              placeholder=" "
              disabled={!emailVerify}
              onChange={(e) => setUsername(e.target.value)}
              className={`peer w-full px-4 pl-8 py-3 rounded-xl border border-gray-300
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200
                          ${!emailVerify ? "opacity-50 cursor-not-allowed" : ""}
                        `}
            />

            <label
              htmlFor="username"
              className={`absolute left-8 top-3 bg-white px-1 text-gray-500
                          transition-all duration-200 text-base
                          peer-focus:-top-3 peer-focus:left-5
                          peer-focus:text-sm peer-focus:text-purple-600 peer-focus:font-medium
                          peer-not-placeholder-shown:-top-3
                          peer-not-placeholder-shown:text-sm 
                          ${!emailVerify ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Username
            </label>

            <IoMdPerson
              className={`absolute left-2 top-4 ${
                !emailVerify ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder=" "
              disabled={!emailVerify}
              onChange={(e) => setPassword(e.target.value)}
              className={`peer w-full px-4 pl-8 py-3 rounded-xl border border-gray-300
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200
                          ${!emailVerify ? "opacity-50 cursor-not-allowed" : ""}
                        `}
            />

            <label
              htmlFor="password"
              className={`absolute left-8 top-3 bg-white px-1 text-gray-500
                          transition-all duration-200 text-base
                          peer-focus:-top-3 peer-focus:left-5
                          peer-focus:text-sm peer-focus:text-purple-600 peer-focus:font-medium
                          peer-not-placeholder-shown:-top-3
                          peer-not-placeholder-shown:text-sm 
                          ${!emailVerify ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Password
            </label>

            <RiLockPasswordFill
              className={`absolute left-2 top-4 ${
                !emailVerify ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              id="confirmPassword"
              type="password"
              placeholder=" "
              disabled={!emailVerify}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`peer w-full px-4 pl-8 py-3 rounded-xl border border-gray-300
                          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                          transition-all duration-200
                          ${!emailVerify ? "opacity-50 cursor-not-allowed" : ""}
                        `}
            />

            <label
              htmlFor="confirmPassword"
              className={`absolute left-8 top-3 bg-white px-1 text-gray-500
                          transition-all duration-200 text-base
                          peer-focus:-top-3 peer-focus:left-5
                          peer-focus:text-sm peer-focus:text-purple-600 peer-focus:font-medium
                          peer-not-placeholder-shown:-top-3
                          peer-not-placeholder-shown:text-sm 
                          ${!emailVerify ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Confirm Password
            </label>

            <MdConfirmationNumber
              className={`absolute left-2 top-4 ${
                !emailVerify ? "opacity-50 " : ""
              }`}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 hover:cursor-pointer
                             text-white font-medium py-3 rounded-xl
                             transition-all duration-200 shadow-md mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mb-7">
          Already have an account?
          <Link
            to="/signin"
            className="text-purple-600 font-medium cursor-pointer hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
