/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import uberlogoRes from '../images/uberLogoRes.png';
import AppBar from '../components/AppBar';
import translogo from '../images/logotransparent.jpg'
import RestaurantMain from './RestaurantMain';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon';

import axiosInstance from '../config/axiosConfig';
import {
  loginRestaurantRequest,
  loginRestaurantSuccess,
  loginRestaurantFailure,
} from '../reducers/actions/restaurant';

function LoginRestaurant() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const hist = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerObj = { emailId: email_id, passwd: password };
    dispatch(loginRestaurantRequest());
    try {
      const response = await axiosInstance.post('login/restaurants', customerObj);
      console.log(response);
      dispatch(loginRestaurantSuccess(response));
      sessionStorage.setItem('token', response.data.token);
      hist.push('/restaurantMain');
    } catch (error) {
      console.log(error);
      dispatch(loginRestaurantFailure(error));
    }
  };

  return (
    <div>
      <AppBar />
      <h3 align="center">Restaurant Login</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        
        <img src={translogo} width="300px" />
      </div>
      {/* <div style={{ justifyContent: 'center', width: '100%' }}>
				<p>Welcome Back</p>
			</div> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit} style={{ width: '50%' }}>
          <FormControl>
            <Input
              type="text"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
              autoFocus
            />
          </FormControl>
          <FormControl>
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
          </FormControl>
          <Button type="submit" style={{ width: '50%' }}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
export default LoginRestaurant;
