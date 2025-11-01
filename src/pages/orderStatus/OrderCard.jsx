import { Clock, X } from "lucide-react";
import { LuUndo2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";


const  OrderCard = ({ order, onMarkReady, onDelete, activeCategory, onMarkCollected, isExpired }) => {
    
  return (
    <div className={`bg-[#FAFAFA] rounded-lg border-l-4 ${ activeCategory === "preparing" ? "border-[#16A34A] ": activeCategory === "ready" ? "border-[#0088FF]" : "border-[#8C8C8C]"} p-4 hover:shadow-md transition-shadow flex flex-col justify-between`}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
        <h3 className={`text-xl font-bold ${activeCategory === "collected" ? "text-gray-500" : "text-black"}`}>{order.tokenNo}</h3>
        
      </div>
      <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <Clock className="w-4 h-4" />
          <span>{order.orderTime}</span>
        </div>

      {/* Order Items */}
      <div className="space-y-2 mb-2">
        {order.orderDetails.map((item, idx) => (
          <div key={idx} className="text-sm">
            <div className="font-medium text-gray-800">
              <div className="flex items-center gap-1">
              {item.quantity}<IoClose className="w-4 h-4 text-gray-800" />{item.itemName}
              
              </div>
              <div className="flex items-center">
              {item.customMessage && <div className="flex items-center gap-1"><MdOutlineMessage className="w-4 h-4 text-gray-500 mt-1 " />{item.customMessage}</div>}
              </div>
              </div>
            
          </div>
        ))}
      </div>
      </div>

      {/* Actions */}
      {!isExpired && (
        <div className="flex gap-2 ">
          {(activeCategory === "ready" || activeCategory === "preparing") && (<button
            onClick={() => {
          if (activeCategory === "preparing") {
            onMarkReady(order.tokenNo);
          } else if (activeCategory === "ready") {
            onMarkCollected(order.tokenNo); // 👈 use parent function here
          }
        }}
            className={`flex-1  ${ activeCategory === "preparing" ? "bg-[#16A34A] hover:bg-green-700":"bg-[#0088FF] hover:bg-blue-700"} cursor-pointer text-white font-light py-1.5 px-4 rounded-md  transition-colors`}
          >
            { activeCategory === "preparing" ? "Mark Ready" : "Mark as Collected"}
          </button>)}
          {activeCategory !== "preparing" && <button
            onClick={() => onDelete(order.tokenNo,activeCategory)}
            className={` ${ activeCategory === "collected"  ?  "flex-1 ":""} bg-[#8C8C8C] hover:bg-[#8C8C8C] flex justify-center cursor-pointer text-white py-1.5 px-3 rounded-md transition-colors`}
          >
           {activeCategory === "collected"  ?"Undo":null}<LuUndo2 className="mt-1 ml-1"/>
          </button>}
        </div>
      )}
    </div>
  );
}
export default OrderCard