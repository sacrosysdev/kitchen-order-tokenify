import API from "./httpService";
import { GET_ORDERS, ORDER_STATUS } from "./endpoint";

export const getPreparingOrders = () => {
  const params = {
    status: 0,
  };
  return API.get(GET_ORDERS, { params })
    .then((res) => res.data.data)
    .catch((err) => {
      console.error("Error fetching orders:", err);
      throw err;
    });
};

export const getReadyOrders = () => {
    const params = {
      status: 1,
    };
    return API.get(GET_ORDERS, { params })
      .then((res) => res.data.data)
      .catch((err) => {
        console.error("Error fetching orders:", err);
        throw err;
      });
  };

  export const getCollectedOrders = () => {
    const params = {
      status: 2,
    };
    return API.get(GET_ORDERS, { params })
      .then((res) => res.data.data)
      .catch((err) => {
        console.error("Error fetching orders:", err);
        throw err;
      });
  };

  export const updateOrderStatus = (billNo,status) => {
    return API.put(ORDER_STATUS,{}, { headers: { billNo, status } })
      .then((res) => res.data.data)
      .catch((err) => {
        console.error("Error updating order status:", err);
        throw err;
      });
  };
