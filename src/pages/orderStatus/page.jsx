import React, { useState,useEffect } from 'react'
import CategorySection from './CategorySection'
import OrderList from './OrderList'
import Configuration from './Configuration'
import { useSearch } from '../../contexts/SearchContext'

import { getPreparingOrders,getReadyOrders,getCollectedOrders,updateOrderStatus } from '../../api/service'

const OrderStatus = () => {
  const { searchValue } = useSearch();
  const [activeCategory, setActiveCategory] = useState("preparing")
  const [PreparingOrders, setPreparingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [collectedOrders, setCollectedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [showExpiryAlert, setShowExpiryAlert] = useState(false);
  const [expiryMessage, setExpiryMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const fetchOrders = () => {
    setLoading(true);
    let fetchFunction;
    
    if (activeCategory === "collected") {
      fetchFunction = getCollectedOrders;
    } else if (activeCategory === "ready") {
      fetchFunction = getReadyOrders;
    } else {
      fetchFunction = getPreparingOrders;
    }

    fetchFunction()
      .then((data) => {
        if (activeCategory === "collected") {
          setCollectedOrders(data);
        } else if (activeCategory === "ready") {
          setReadyOrders(data);
        } else {
          setPreparingOrders(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Check expiry date on mount
  useEffect(() => {
    const expiryDate = localStorage.getItem('expiryDate');
    
    if (expiryDate) {
      const today = new Date();
      const expiry = new Date(expiryDate);
      const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 0) {
        // Already expired
        setIsExpired(true);
        setExpiryMessage('Your subscription has expired. Please renew to continue using the service.');
        setShowExpiryAlert(true);
      } else if (daysUntilExpiry <= 3) {
        // Expiring within 3 days
        setExpiryMessage(`Your subscription will expire in ${daysUntilExpiry} day(s). Please renew soon to avoid service interruption.`);
        setShowExpiryAlert(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [activeCategory]);

  const getCurrentOrders = () => {
    let orders;
    if (activeCategory === "collected") {
      orders = collectedOrders;
    } else if (activeCategory === "ready") {
      orders = readyOrders;
    } else {
      orders = PreparingOrders;
    }

    // Filter by search value if provided
    if (searchValue.trim() !== '') {
      return orders.filter(order => 
        order.tokenNo && order.tokenNo.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return orders;
  };

  const handleMarkReady = (orderId) => {
    updateOrderStatus(orderId, 1)
      .then(() => {
        // Refresh orders after status update
        fetchOrders();
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const handleCollected = (orderId) => {
    updateOrderStatus(orderId, 2)
      .then(() => {
        // Refresh orders after status update
        fetchOrders();
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };
  
  const handleDelete = (tokenNo, activeCategory) => {
    // Show confirmation modal first
    setDeleteData({ tokenNo, activeCategory });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteData) return;
    
    const { tokenNo, activeCategory } = deleteData;
    let status;
    if(activeCategory === "collected"){
      status = 1;
    }else if(activeCategory === "ready"){
      status = 0;
    }
    
    updateOrderStatus(tokenNo, status)
      .then(() => {
        // Refresh orders after status update
        fetchOrders();
        setShowDeleteModal(false);
        setDeleteData(null);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        setShowDeleteModal(false);
        setDeleteData(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteData(null);
  };

 
  return (
    <div className='relative overflow-x-hidden '>
    
    {/* Expiry Date Alert Modal */}
    {showExpiryAlert && (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Subscription Alert
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            {expiryMessage}
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowExpiryAlert(false)}
              className="px-4 py-2 bg-[#16A34A] hover:bg-green-700 text-white rounded-md transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    )}

    <div className='px-5'>
      <div className='bg-white rounded-lg py-3 px-1 h-full '>

      <div className=''>
        <CategorySection 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}/>
    </div>
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <OrderList
          orders={getCurrentOrders()}
          onMarkReady={handleMarkReady}
          onMarkCollected={handleCollected}
          onDelete={handleDelete}
          activeCategory={activeCategory}
          isExpired={isExpired}
        />
      )}
    </div>
    
    </div>
    </div>
    <div className="fixed bottom-0 w-full">
        <Configuration  />
      </div>
    
    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Confirm Undo
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {deleteData?.activeCategory === "collected" ? "undo this collected order" : "undo this ready order"}? Token #{deleteData?.tokenNo}
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-white bg-[#DC2626] rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default OrderStatus