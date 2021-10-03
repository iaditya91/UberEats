/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import axiosInstance from '../config/axiosConfig';
import AppBar from '../components/AppBar';
import uberlogo from '../images/ubereats.svg'

import {
  signupCustomerRequest,
  signupCustomerSuccess,
  signupCustomerFailure,
} from '../reducers/actions/signupActions';

const CustomerSignup = () => {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_no, setContact] = useState('');
  const [name, setName] = useState('');
  const hist = useHistory();
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [country, setCountry] = useState('');
  // const [about, setabout] = useState('');
  // const [dob, setdob] = useState('');
  // const [nickName, setNickname] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerObj = {
      emailId: email_id,
      passwd: password,
      contactNo: contact_no,
      name: name,
      // city,
      // state,
      // country,
      // about,
      // dob,
      // nickName,
    };
    dispatch(signupCustomerRequest());
    try {
      const response = await axiosInstance.post('register/customers', customerObj);
      console.log(response);
      dispatch(signupCustomerSuccess(response));
      sessionStorage.setItem('token', response.data.token);
      hist.push('/login/customer');
    } catch (error) {
      console.log(error);
      dispatch(signupCustomerFailure(error));
    }
  };
  return (
    <div>
      <AppBar />
      <div>
      
      
      
      <form autoComplete="off" onSubmit={handleSubmit} style={{ width: '50%' }}>
        <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={uberlogo} width="300px" />
      </div>
          <FormControl>
            <Input
              value={name}
              type="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              autoFocus
            />
          </FormControl>
          <FormControl>
            <Input
              value={email_id}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          <FormControl>
            <Input
              value={contact_no}
              type="number"
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact Number"
              autoFocus
            />
          </FormControl>

          <Button type="submit" style={{ width: '50%' }}>
            Register
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};
export default CustomerSignup;
