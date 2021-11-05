/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import axiosInstance from '../config/axiosConfig';
import uberlogo from '../images/ubereats.svg';
import uberlogoRes from '../images/uberLogoRes.png';
import { Carousel, Container } from 'react-bootstrap';
import translogo from '../images/logotransparent.jpg'
import { Row, Col } from 'react-bootstrap';
import AppBar from '../components/AppBar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { uploadFile } from 'react-s3';
import {awsConf} from '../config/awsConfig';

import {
  signupRestaurantRequest,
  signupRestaurantSuccess,
  signupRestaurantFailure,
} from '../reducers/actions/RestSignupActions';

const RestaurantSignup = () => {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_no, setContact] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [deliveryType, setDeliveryType] = useState('')
  const hist = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerObj = {
      emailId: email_id,
      passwd: password,
      contactNo: contact_no,
      name: name,
      city,
      state,
      description,
      profileImg,
      deliveryType
    };
    dispatch(signupRestaurantRequest());
    try {
      const response = await axiosInstance.post('register/restaurants', customerObj);
      console.log('response after restaurant creation')
      console.log(response);
      dispatch(signupRestaurantSuccess(response));
      sessionStorage.setItem('token', response.data.token);
      hist.push('/login/restaurant');
    } catch (error) {
      console.log('restauant signup error');
      console.log(error);
      // dispatch(signupRestaurantFailure(error));
    }
  };
  return (
    <div>
      <AppBar />
      <Container>
        <Row>
          <Col>
            <img src ={translogo} height='250' width='250' float='right'/>
            <h2>Create Your Own Restaurant</h2>
          </Col>
          <Col>
            <form autoComplete="off" onSubmit={handleSubmit} style={{ width: '50%' }}>
              <div>
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
                <FormControl>
                  <Input
                    value={city}
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    autoFocus
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={state}
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    autoFocus
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.description)}
                    placeholder="Description"
                    autoFocus
                  />
                </FormControl>
                <input
                    type="file"
                    onChange={(e) => {
                      uploadFile(e.target.files[0], awsConf).then((data)=>{
                        setProfileImg(data.location)}).catch(error=>{console.log(error)})
                      }}
                    placeholder="Restaurant Image"
                    autoFocus
                />
                <TextField style ={{marginTop:"10px" ,width: "250px"}}
                    select
                    name="category"
                    id="category-select"
                    value={deliveryType}
                    label="DeliveryType"
                    onChange={(e)=>setDeliveryType(e.target.value)}
                >
                    <MenuItem value={"Delivery"}>Delivery and PickUp</MenuItem>
                    <MenuItem value={"Delivery"}>Delivery</MenuItem>
                    <MenuItem value={"Pickup"}>Pickup</MenuItem>
                </TextField>

                <Button type="submit" style={{ marginLeft: "10px", marginTop:"10px",width: '50%' }}>
                  Register
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantSignup;
