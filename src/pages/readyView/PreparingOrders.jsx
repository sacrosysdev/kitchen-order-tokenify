import React, { useState, useEffect } from "react";
import PrepareCard from "./PrepareCard";
import Waiting from "../../assets/svg/Waiting.svg";
import { motion, AnimatePresence } from "framer-motion";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

const PreparingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // Fetch initial orders
  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        const apiBaseUrl = localStorage.getItem("apiBaseUrl") || import.meta.env.VITE_API_URL;
        const { data } = await axios.get(
          `${apiBaseUrl}/kds/kitchen/orders/live`
        );
        console.log("📦 Initial Preparing Orders:", data);
        // Filter only Prepare orders
        const prepareOrders = data.data.filter(
          (order) => order.tdsStatus === "Prepare"
        );
        setOrders(prepareOrders);
      } catch (error) {
        console.error("❌ Failed to fetch initial preparing orders:", error);
      }
    };
    fetchInitialOrders();
  }, []);

  // Setup SignalR connection
  useEffect(() => {
    const signalrUrl = localStorage.getItem("signalrUrl") || import.meta.env.VITE_SIGNALR_URL;
    const hubUrl = `${signalrUrl}/kitchenorderhub`;
    console.log("🔗 Connecting to:", hubUrl);

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("✅ SignalR Connected (Preparing Orders)");
        setConnected(true);

        connection.on("OrderStatusUpdates", (data) => {
          console.log("📶 Preparing Orders Live Data:", data);
          setOrders((prev) => {
            const updated = [...prev];
            data.forEach((update) => {
              const existing = updated.find(
                (o) => o.tokenNo === update.tokenNo
              );
              if (existing) {
                // Update status
                existing.tdsStatus = update.tdsStatus;
              } else if (update.tdsStatus === "Prepare") {
                // Only add if status is Prepare
                updated.push(update);
              }
            });
            // Filter to keep only Prepare orders
            return updated.filter(
              (order) => order.tdsStatus === "Prepare"
            );
          });
        });
      } catch (err) {
        console.error("❌ SignalR Connection Failed:", err);
        setConnected(false);
        setTimeout(startConnection, 5000);
      }
    };

    startConnection();
    return () => connection.stop();
  }, [connection]);

  // Auto-scroll animation
  useEffect(() => {
    if (orders.length === 0) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 24) % orders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [orders]);

  // Filter only Prepare orders
  const preparingOrders = orders.filter(
    (order) => order.tdsStatus === "Prepare"
  );
  const currentTokens = preparingOrders.slice(startIndex, startIndex + 24);

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="uppercase font-bold text-[#404040] text-[20px]">
          Preparing Orders {connected ? "🟢" : "🔴"}
        </h1>
        <img src={Waiting} alt="Waiting" className="h-8 w-8 object-contain" />
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 py-3 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {currentTokens.map((order) => (
            <motion.div
              key={order.tokenNo}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5,
              }}
            >
              <PrepareCard tokenNo={order.tokenNo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {currentTokens.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No preparing orders yet...
        </p>
      )}
    </div>
  );
};

export default PreparingOrders;
