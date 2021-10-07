/* eslint-disable */

import axiosInstance from '../config/axiosConfig';

export const getRestaurantData = async (city) => {
  return await axiosInstance.get(`customers/city/${city}`);
};
