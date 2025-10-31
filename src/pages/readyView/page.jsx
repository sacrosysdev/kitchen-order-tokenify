"use client";
import React, { useState } from "react";
import ReadyOrders from "./ReadyOrders";
import PreparingOrders from "./PreparingOrders";
import ThanksCard from "./ThanksCard";


const ReadyView = () => {


  return (
    <div className="relative overflow-x-hidden">
      <div className="py-5 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <PreparingOrders />
          <ReadyOrders />
         
        </div>
      </div>

      {/* ThanksCard section */}
      <div className="fixed bottom-0 w-full">
        <ThanksCard  />
      </div>

      {/* Modal */}
      
    </div>
  );
};

export default ReadyView;
