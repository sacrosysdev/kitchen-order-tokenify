"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Bg from "../../assets/images/StartBg.jpg";
import Logo from "../../assets/svg/Logo.svg";
import { AuthenticationDevice } from "../../api/service";

const StartScreen = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!clientId.trim() || !activationCode.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const data = {
        client_id: clientId.trim(),
        product_code: 17,
        device_uuid: "",
        device_name: "",
        device_model: "",
        device_hardware: "",
        activation_code: activationCode.trim()
      };
      const response = await AuthenticationDevice(data);
      console.log('Authentication successful:', response);
      
      // Store ClientID and expiry_date in localStorage
      if (response && response.ClientID && response.expiry_date) {
        localStorage.setItem('clientId', response.ClientID.toString());
        localStorage.setItem('expiryDate', response.expiry_date);
      }
      
      // Navigate to status page on success
      navigate("/status");
    } catch (err) {
      console.error('Authentication failed:', err);
      setError(err?.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full text-white font-poppins bg-cover bg-center overflow-hidden relative"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(22, 163, 74, 0.9) 0%, rgba(34, 197, 94, 0.9) 100%),
          url(${Bg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md px-8 py-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <motion.img
            src={Logo}
            alt="Logo"
            className="w-20 h-20 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.h1
            className="text-4xl font-bold text-[#23732D] uppercase tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Tokenify
          </motion.h1>
          <motion.p
            className="text-gray-600 mt-2 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Smart Queues • Faster Futures
          </motion.p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Client ID Field */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
              Client ID
            </label>
            <input
              type="text"
              id="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter your Client ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
              disabled={isLoading}
            />
          </motion.div>

          {/* Activation Code Field */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label htmlFor="activationCode" className="block text-sm font-medium text-gray-700 mb-2">
              Activation Code
            </label>
            <input
              type="text"
              id="activationCode"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="Enter your Activation Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
              disabled={isLoading}
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Kitchen Order Management System
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StartScreen;
