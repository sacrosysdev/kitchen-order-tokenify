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
        const apiBaseUrl = localStorage.getItem("apiBaseUrl") || import.meta.env.VITE_API_URL;
        const { data } = await axios.get(
          `${apiBaseUrl}/kds/kitchen/orders/live`
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
    const signalrUrl = localStorage.getItem("signalrUrl") || import.meta.env.VITE_SIGNALR_URL;
    const hubUrl = `${signalrUrl}/kitchenorderhub`;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, []);

  const announceToken = (tokenNo) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      return;
    }
  
    const message = `Token number ${tokenNo} is ready for pickup`;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.pitch = 1;
  
    const speakWithVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        console.warn("No voices found yet");
        return;
      }
  
      const femaleVoice =
        voices.find((v) =>
          /(female|woman|zira|linda|amy|aria|natasha|nicole|emma|us english)/i.test(v.name)
        ) || voices.find((v) => v.lang.startsWith("en"));
  
      if (femaleVoice) utterance.voice = femaleVoice;
  
      // cancel any ongoing speech before speaking
      window.speechSynthesis.cancel();
  
      // 👇 delay slightly to ensure proper start
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 200);
    };
  
    // 👇 Wait for voices if not loaded yet
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakWithVoice();
      };
    } else {
      speakWithVoice();
    }
  };
  

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        setConnected(true);
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
