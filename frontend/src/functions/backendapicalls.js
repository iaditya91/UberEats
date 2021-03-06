/* eslint-disable */

import axiosInstance from '../config/axiosConfig';

export const getRestaurantData = async (city) => {
  return await axiosInstance.get(`customers/city/${city}`);
};

export const getCustomerData = async (custId) => {
  return await axiosInstance.get(`/customers/${custId}`);
};

export const getSearchData = async (searchquery) => {
  return await axiosInstance.get(`/restaurants/search/${searchquery}`);
};