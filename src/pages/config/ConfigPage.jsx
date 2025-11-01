"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/Logo.svg";
import { updateApiBaseURL } from "../../api/httpService";

const ConfigPage = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    apiBaseUrl: "",
    signalrUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing config from localStorage on mount
  useEffect(() => {
    const apiBaseUrl = localStorage.getItem("apiBaseUrl") || "";
    const signalrUrl = localStorage.getItem("signalrUrl") || "";

    setConfig({
      apiBaseUrl,
      signalrUrl,
    });
  }, []);

  const handleChange = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!config.apiBaseUrl.trim()) {
      setError("API Base URL is required");
      return;
    }

    if (!config.signalrUrl.trim()) {
      setError("SignalR URL is required");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = config.apiBaseUrl.trim();
      
      // Store in localStorage
      localStorage.setItem("apiBaseUrl", apiUrl);
      localStorage.setItem("signalrUrl", config.signalrUrl.trim());

      // Update axios instances immediately
      updateApiBaseURL(apiUrl);

      setSuccess("Configuration saved successfully!");
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Failed to save configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all configuration?")) {
      localStorage.removeItem("apiBaseUrl");
      localStorage.removeItem("signalrUrl");
      setConfig({
        apiBaseUrl: "",
        signalrUrl: "",
      });
      setError("");
      setSuccess("");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="w-16 h-16" />
            <div>
              <h1 className="text-3xl font-bold text-[#23732D] uppercase">
                Configuration
              </h1>
              <p className="text-gray-600 text-sm">API Settings</p>
            </div>
          </div>
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* API Base URL */}
          <div>
            <label
              htmlFor="apiBaseUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              API Base URL
            </label>
            <input
              type="url"
              id="apiBaseUrl"
              value={config.apiBaseUrl}
              onChange={(e) => handleChange("apiBaseUrl", e.target.value)}
              placeholder="https://your-api-domain.com/api/"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Main API base URL for orders and kitchen data
            </p>
          </div>

          {/* SignalR URL */}
          <div>
            <label
              htmlFor="signalrUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              SignalR Hub URL
            </label>
            <input
              type="url"
              id="signalrUrl"
              value={config.signalrUrl}
              onChange={(e) => handleChange("signalrUrl", e.target.value)}
              placeholder="https://signalr-domain.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-transparent outline-none transition-all text-gray-800 placeholder-gray-400"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              SignalR hub URL for real-time updates
            </p>
          </div>

          {/* Messages */}
          {error && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Configuration"
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>

          {/* Current Values Display */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Current Configuration:
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-gray-600">API:</span>{" "}
                <span className="text-gray-800">
                  {config.apiBaseUrl || "Not set"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">SignalR:</span>{" "}
                <span className="text-gray-800">
                  {config.signalrUrl || "Not set"}
                </span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> After saving configuration, please refresh
                the page or navigate away and back to apply the changes. The app
                will use these URLs for all API calls instead of environment
                variables.
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ConfigPage;

