import OrderCard from "./OrderCard";

const OrderList = ({ orders, onMarkReady, onMarkCollected ,onDelete, activeCategory }) => {
   
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
      {orders.map((order) => (
        <OrderCard
          key={order.tokenNo}
          order={order}
          onMarkReady={onMarkReady}
          onDelete={onDelete}
          activeCategory={activeCategory}
          onMarkCollected={onMarkCollected}
          

        />
      ))}
    </div>
  );
}
export default OrderList