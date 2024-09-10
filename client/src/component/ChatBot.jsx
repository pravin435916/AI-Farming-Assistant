import React, { useState } from 'react';
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { GoDotFill } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineSend } from "react-icons/ai";
// import './custom.css'
import axios from 'axios';
const ChatBot = () => {
    const [menu, setMenu] = useState(false);
    const popUP = () => {
        setMenu(!menu);
    }
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleMessageSubmit = async () => {
        if (!inputText.trim()) return;

        const newMessage = {
            text: inputText,
            sender: 'user'
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        try {
            const response = await axios.post('http://localhost:8000/chatbot', {
                message: inputText
            });
            setInputText('');

            const botResponse = {
                text: response.data,
                sender: 'bot'
            };

            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error sending message to the server:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const closePopup = () => {
        setMenu(false)
        // setMessages("");
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleMessageSubmit();
          setInputText('')
        }
      };
      
    return (
        <div className=''>
            <img
                className="fixed w-16 h-16  bottom-10 right-10 p-1 bg-white text-white rounded-full cursor-pointer z-50"
                onClick={popUP}
                src="/assets/ai_plant/g.avif" alt=""
                title="Talk to ChatBot"
            />
                {/* <img className='w-12 h-12' src="/assets/ai_plant/cute.avif" alt="" /> */}
            {/* </div> */}
            <AnimatePresence>
                {
                    menu && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 10 }}
                            exit={{ opacity: 0, y: 20 }}
                            onMouseLeave={() => setMenu(false)}
                            className="fixed flex justify-between items-center w-72 h-[26rem] bg-gray-100 flex-col right-20 bottom-32 rounded-lg overflow-hidden z-40">
                            <div className="flex w-full justify-between items-center bg-black h-18 text-white p-4 shadow-2xl">
                                <div className='flex gap-2'>
                                    <img className='w-12 h-12 rounded-full' src="/assets/ai_plant/pila.avif" alt="" />
                                    <div className='flex flex-col justify-center items-center'>
                                        <span>Chat Bot</span>
                                        <div className='flex items-center text-[#43EE7D]'>
                                            <span><GoDotFill /></span>
                                            <span> Online</span>
                                        </div>
                                    </div>
                                </div>
                                <span className='text-2xl cursor-pointer' onClick={closePopup}><RxCrossCircled /></span>
                            </div>
                            <div className="flex flex-col p-2 overflow-y-auto flex-end justify-end pt-4 h-full">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-1 my-2 p-2 rounded-lg ${message.sender === 'user' ? 'bg-white shad self-end' : 'bg-violet-400 shad'}`}
                                    >
                                                <span>{message.text}</span>
                                        {
                                            message.sender === 'user' ? (
                                                <div className='bg-green-400 w-8 h-8 p-2 border rounded-full'>
                                                    <img src="http://clipart-library.com/images/6Tp66Bp7c.png" alt="" />
                                                </div>
                                            ) :
                                                (
                                                        <img  className='w-8 h-8 border rounded-full' src="/assets/ai_plant/cute.avif" alt="" />
                                                    
                                                )
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className='w-full mx-10 px-6 py-4 rounded-lg flex gap-2 items-center bg-transparant'>
                                <input className='outline-none  border bg-transparant rounded-lg w-full text-black p-2'  onChange={handleInputChange} onKeyDown={handleKeyPress}  type="text" placeholder='Type your message here' />
                                <span className='text-3xl cursor-pointer text-green-600' onClick={handleMessageSubmit}><AiOutlineSend /></span>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>

        </div>
    );
};

export default ChatBot;