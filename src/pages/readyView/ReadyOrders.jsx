import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { motion, AnimatePresence } from "framer-motion";
import ReadyCard from "./ReadyCard";
import Delivery from "../../assets/svg/Delivery.svg";
import axios from "axios";

const ReadyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [popup, setPopup] = useState(null); // popup order number

  // Fetch initial orders
  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/kds/kitchen/orders/live`
        );
        const readyOrders = data.data.filter(
          (order) => order.tdsStatus === "Ready"
        );
        setOrders(readyOrders);
      } catch (error) {
        console.error("❌ Failed to fetch initial orders:", error);
      }
    };
    fetchInitialOrders();
  }, []);

  // Setup SignalR connection
  useEffect(() => {
    const hubUrl = `${import.meta.env.VITE_SIGNALR_URL}/kitchenorderhub`;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  // Announce token via SpeechSynthesis
  const announceToken = (tokenNo) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Token number ${tokenNo} is ready for pickup`
      );
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      // fallback beep
      const audio = new Audio("/notification.mp3");
      audio.play().catch((err) =>
        console.error("Audio play failed:", err)
      );
    }
  };

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        setConnected(true);
        console.log("✅ Connected to SignalR (ReadyOrders)");

        connection.on("OrderStatusUpdates", (data) => {
          setOrders((prevOrders) => {
            const updated = [...prevOrders];
            let newReadyOrder = null;

            data.forEach((update) => {
              const existing = updated.find(
                (o) => o.tokenNo === update.tokenNo
              );

              if (existing) {
                existing.tdsStatus = update.tdsStatus;
              } else if (update.tdsStatus === "Ready") {
                updated.push(update);
                newReadyOrder = update;
              }

              if (
                existing &&
                existing.tdsStatus === "Ready" &&
                !prevOrders.some((o) => o.tokenNo === existing.tokenNo)
              ) {
                newReadyOrder = existing;
              }
            });

            if (newReadyOrder) {
              setPopup(newReadyOrder.tokenNo);
              announceToken(newReadyOrder.tokenNo);
              setTimeout(() => setPopup(null), 5000);
            }

            return updated.filter((order) => order.tdsStatus === "Ready");
          });
        });
      } catch (err) {
        console.error("❌ SignalR Error:", err);
        setConnected(false);
        setTimeout(startConnection, 10000);
      }
    };

    startConnection();
    return () => {
      connection.stop();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [connection]);

  const readyOrders = orders.filter((order) => order.tdsStatus === "Ready");

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="uppercase font-bold text-[#404040] text-[20px] flex items-center">
          Ready for Pickup <span className="ml-1">{connected ? "🟢" : "🔴"}</span>
        </h1>
        <img src={Delivery} alt="delivery" className="h-8 w-8 object-contain" />
      </div>

      {/* Ready Orders Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 py-3 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {readyOrders.map((order) => (
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
              <ReadyCard tokenNo={order.tokenNo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {readyOrders.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No ready orders yet...</p>
      )}

      {/* 🔔 Popup Notification (Top Center) */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-xl px-10 py-6 text-center z-50 border border-gray-200"
            style={{
              width: "340px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="text-green-600 text-8xl font-bold mb-3">#{popup}</h2>
            <p className="text-gray-700 text-lg font-semibold">
              Hi! Your order is ready.
              <br /> Come pick it up!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadyOrders;
