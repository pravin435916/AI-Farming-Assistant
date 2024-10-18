import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import GoogleTranslate from "./GoogleTranslate";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error("Invalid email");
        return;
      }

      const response = await axios.post("http://localhost:8000/api/email", {
        email,
      });

      if (response.status === 200) {
        toast.success("Email sent successfully");
        setEmail("");
      } else {
        console.error("Email not sent");
        toast.error("Email not sent");
      }
    } catch (error) {
      toast.error("Email not sent");
    }
  };

  return (
    <footer className="bg-gray-800 text-white ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col items-start mb-6 md:mb-0 ml-4">
          <span className="text-xl font-bold mb-4">AI Farmer Assistant</span>
          <form onSubmit={handleSubmit} className="w-full ">
            <div className="flex flex-col md:flex-row items-center gap-2 " >
              <input
                className="w-32 md:w-52 border border-gray-400 p-2 bg-gray-700 text-white placeholder-gray-400"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
          {/* Add Google Translate component below the Subscribe button */}
          <div className="mt-4">
            <GoogleTranslate />
          </div>
        </div>

        {/* Center Links Section */}
        <div className="flex gap-4 flex-col text-center md:text-left">
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            About Us
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Contact
          </a>
        </div>

        {/* Right Section - Image */}
        <div className="">
          <img src="/assets/home/foot.png" alt="Footer Logo" className="w-[32rem] h-auto" />
        </div>
      </div>
    </footer>
  );
};
