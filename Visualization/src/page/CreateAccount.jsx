import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import toast from "react-hot-toast";
import axios from "axios";
const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const CreateAccount = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = res;
      if (res.status === 200) {
        navigate("/");
        toast.success("Account Created Successfully");
      }
    } catch (error) {
      console.log(error);

      toast.error("hello");
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    let flag = false;

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
      flag = true;
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
      flag = true;
    }
    if (!formData.phone) {
      validationErrors.phone = "Phone Number is required";
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

    CreateAccount();
  };
  return (
    <div className="flex justify-center items-center w-full h-full xl:px-4 py-10 sm:px-8 md:px-12 lg:px-20 lg:py-0">
      <div className="bg-white mt-28 shadow-2xl p-6 md:p-8 rounded-2xl w-full max-w-md text-black flex flex-col gap-4">
        <div className="flex items-center justify-center space-x-4">
          <img src={Logo} className="w-14 md:w-16 lg:w-20" alt="logo" />
        </div>
        <form onSubmit={HandleSubmit} className="w-full">
          <div className="w-full mt-4">
            <lable className="text-gray-700">Full Name </lable>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  name="fullName"
                  className="w-full border border-gray-300 py-2.5 placeholder:text-base rounded-xl focus:ring-0 focus:border focus:border-[#A4BCFD] focus:outline-0 mt-1 px-3"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
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
          <div className="w-full mt-4">
            <lable className="text-gray-700">Phone Number </lable>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type="Number"
                  name="phone"
                  className="w-full border border-gray-300 py-2.5 placeholder:text-base rounded-xl focus:ring-0 focus:border focus:border-[#A4BCFD] focus:outline-0 mt-1 px-3"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="w-full bg-black mt-4 py-2 text-white text-lg rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
