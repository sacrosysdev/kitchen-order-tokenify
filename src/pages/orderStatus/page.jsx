import React, { useState } from 'react'
import CategorySection from './CategorySection'
import { ordersData } from '../../constants'
import OrderList from './OrderList'
import Configuration from './Configuration'

const OrderStatus = () => {
  const [activeCategory, setActiveCategory] = useState("preparing")
  const [orders, setOrders] = useState(ordersData);
  console.log(orders, "ordereererd")

  const filteredOrders = orders.filter(order => order.status === activeCategory);

  const handleMarkReady = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'ready' } : order
    ));
  };

  const handleCollected = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'collected' } : order
    ));
  };
  const handleDelete = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const getCategoryCount = (categoryId) => {
    return orders.filter(order => order.status === categoryId).length;
  };
      
  return (
    <div className='relative overflow-x-hidden'>
    <div className='bg-white rounded-lg py-5 px-8 h-full '>

      <div className=''>
        <CategorySection 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}/>
    </div>
    <div>
       <OrderList
          orders={filteredOrders}
          onMarkReady={handleMarkReady}
          onMarkCollected={handleCollected}
          onDelete={handleDelete}
          activeCategory={activeCategory}
        />
    </div>
    
    </div>
    <div className="fixed bottom-0 w-full">
        <Configuration  />
      </div>
    </div>
  )
}

export default OrderStatus