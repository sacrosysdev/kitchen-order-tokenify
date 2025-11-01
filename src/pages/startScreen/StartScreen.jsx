"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ React Router import
import Bg from "../../assets/images/StartBg.jpg";

const StartScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/status"); // ✅ Navigate after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // cleanup timer
  }, [navigate]);

  return (
    <motion.div
      className="flex flex-col gap-3 items-center justify-center h-screen w-full text-white font-dm bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center, rgba(35,115,45,0.8) 0%, rgba(0,45,13,0.95) 80%),
          url(${Bg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Title */}
      <motion.h1
        className="text-7xl font-bold uppercase drop-shadow-lg tracking-wider"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        Tokenify
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl drop-shadow-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      >
        Smart Queues &nbsp;•&nbsp; Faster Futures
      </motion.p>

      {/* Floating light animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-transparent to-[#23732D]/10 pointer-events-none"
        animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default StartScreen;