import { Clock, X } from "lucide-react";

const  OrderCard = ({ order, onMarkReady, onDelete, activeCategory, onMarkCollected }) => {
    console.log(activeCategory)
  return (
    <div className={`bg-[#FAFAFA] rounded-lg border-l-4 ${ activeCategory === "preparing" ? "border-[#16A34A] ": activeCategory === "ready" ? "border-[#0088FF]" : "border-[#DC2626]"} p-4 hover:shadow-md transition-shadow flex flex-col justify-between`}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold">{order.id}</h3>
        
      </div>
      <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <Clock className="w-4 h-4" />
          <span>{order.time}</span>
        </div>

      {/* Order Items */}
      <div className="space-y-2 mb-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="text-sm">
            <div className="font-medium text-gray-900">{item.name}</div>
            {item.details && (
              <div className="ml-4 space-y-0.5">
                {item.details.map((detail, detailIdx) => (
                  <div key={detailIdx} className="flex items-start gap-1 text-gray-600">
                    <span className="mt-1.5 w-1 h-1 bg-gray-400 rounded-full "></span>
                    <span className="italic">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 ">
        {(activeCategory === "ready" || activeCategory === "preparing") && (<button
          onClick={() => {
        if (activeCategory === "preparing") {
          onMarkReady(order.id);
        } else if (activeCategory === "ready") {
          onMarkCollected(order.id); // 👈 use parent function here
        }
      }}
          className={`flex-1  ${ activeCategory === "preparing" ? "bg-[#16A34A] hover:bg-green-700":"bg-[#0088FF] hover:bg-blue-700"} cursor-pointer text-white font-light py-1.5 px-4 rounded-md  transition-colors`}
        >
          { activeCategory === "preparing" ? "Mark Ready" : "Mark as Collected"}
        </button>)}
        <button
          onClick={() => onDelete(order.id)}
          className={` ${ activeCategory === "collected"  ?  "flex-1 ":""} bg-[#DC2626] hover:bg-red-700 flex justify-center cursor-pointer text-white py-1.5 px-3 rounded-md transition-colors`}
        >
          <X />
        </button>
      </div>
    </div>
  );
}
export default OrderCard