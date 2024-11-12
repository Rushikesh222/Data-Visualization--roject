import axios from "axios";
import Logo from "../assets/logo.png";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const Login = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = res;
      if (res.status === 200) {
        toast.success("Login Successfully");
        console.log(data);
        dispatch({ type: "SIGNIN", payload: data.data.token });

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.message.error);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    let flag = false;

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      flag = true;
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
      flag = true;
    }

    if (flag) {
      Object.values(validationErrors).forEach((errorMsg) => {
        toast.error(errorMsg);
      });
      return;
    }

    Login();
  };

  return (
    <div className="flex justify-center items-center w-full h-full xl:px-4 py-10 sm:px-8 md:px-12 lg:px-20 lg:py-0">
      <div className="bg-white shadow-2xl mt-28 p-6 md:p-8 rounded-2xl w-full max-w-md text-black flex flex-col gap-4">
        <div className="flex items-center justify-center space-x-4">
          <img src={Logo} className="w-14 md:w-16 lg:w-20" alt="logo" />
        </div>

        <form onSubmit={HandleSubmit} className="w-full">
          <div className="w-full mt-4">
            <lable className="text-gray-700">Email </lable>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 py-2.5 placeholder:text-base rounded-xl focus:ring-0 focus:border focus:border-[#A4BCFD] focus:outline-0 mt-1 px-3"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <lable className="text-gray-700">Password </lable>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 py-2.5 placeholder:text-base rounded-xl focus:ring-0 focus:border focus:border-[#A4BCFD] focus:outline-0 mt-1 px-3"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <button
              className="w-full bg-black mt-4 py-2 text-white text-lg rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span>
            Don’t have an account?
            <Link to="/signin" className="pl-1 text-[#0856cd] font-semibold">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
