/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import uberlogo from '../images/ubereats.svg';
import AppBar from '../components/AppBar';
import { Link } from '@mui/material';

import axiosInstance from '../config/axiosConfig';
import {
  loginCustomerFailure,
  loginCustomerRequest,
  loginCustomerSuccess,
} from '../reducers/actions/customer';
import { useHistory } from 'react-router';

function LoginCustomer() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const hist = useHistory();
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerObj = { emailId: email_id, passwd: password };
    dispatch(loginCustomerRequest());
    try {
        const response = await axiosInstance.post('login/customers', customerObj);
        if(response.data.token){
        console.log(response);
        dispatch(loginCustomerSuccess(response));
        sessionStorage.setItem('token', response.data.token);
        hist.push('/');
      }
      else{
          setErrorMsg('Please enter valid credientails!')
      }
    } catch (error) {
      setErrorMsg('Please enter valid credientails!')
      console.log(error);
      dispatch(loginCustomerFailure(error));
    }
  };

  return (
    <div >
      <AppBar />
      <div>
      <div  style={{ display: 'flex', justifyContent: 'center',alignItems:'center',height:'25vh' }}>
        <img src={uberlogo} width="300px" />
      </div>
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
          {errorMsg && <p style={{color:'red',align: 'center'}}>{errorMsg}</p>}
          <Button type="submit" style={{ width: '50%' }}>
            Submit
          </Button>
        </form>
        
      </div>
     <p style={{ display: "flex", justifyContent: 'center' }}> New user? register yourself by clicking <Link href="/register/customer"> here</Link></p>
    </div>
    </div>
  );
}

export default LoginCustomer;
