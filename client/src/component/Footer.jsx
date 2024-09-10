import React, { useState } from "react";
import {toast} from "react-hot-toast"
import axios from 'axios'
// import { axios } from "axios";
export const Footer = () => {
  const [email,setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/email', {
        email
      });
      if(!email) {
        toast.error('Invalid email')
      }
      if (response.status === 200) {
        toast.success("Email sent successfully");
        console.log('Email sent successfully');
        setEmail('');
      } else {
        console.error('Email not sent');
      }
    } catch (error) {
      toast.error('Email not sent');

    }
  };
  return (
    <footer className="flex ">
      <div className="container flex mx-auto justify-between items-center">
        <div className="flex flex-col justify-center items-center">
        <span>Plant disease Detection</span>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className='w-96 border p-2'
                label="Name"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
        </div>
        </form>

        </div>
        <div className="flex gap-4 flex-col">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About Us</a>
          <a href="#" className="hover:text-gray-400">Services</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
        <img className="" src="/assets/home/foot.png" alt="" />
      </div>
    </footer>
  );
};
