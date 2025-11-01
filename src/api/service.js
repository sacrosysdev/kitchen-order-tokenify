import API, { AuthAPI } from "./httpService";
import { GET_ORDERS, ORDER_STATUS, Auth } from "./endpoint";

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

  export const AuthenticationDevice = (data) => {
    console.log('Auth API Request:', {
      url: `${import.meta.env.VITE_AUTH_API_URL}${Auth}`,
      data: data
    });
    return AuthAPI.post(Auth, data)
      .then((res) => {
        console.log('Auth API Response:', res.data);
        return res.data.data;
      })
      .catch((err) => {
        console.error("Error authenticating device:", err.response || err);
        throw err;
      });
  };