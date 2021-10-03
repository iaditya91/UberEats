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
  const hist = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerObj = {
      emailId: email_id,
      passwd: password,
      contactNo: contact_no,
      name: name,
    };
    dispatch(signupRestaurantRequest());
    try {
      const response = await axiosInstance.post('register/restaurants', customerObj);
      console.log(response);
      dispatch(signupRestaurantSuccess(response));
      sessionStorage.setItem('token', response.data.token);
      hist.push('/login/restaurant');
    } catch (error) {
      console.log(error);
      dispatch(signupRestaurantFailure(error));
    }
  };
  return (
    <div>
      <AppBar />
      <Container>
        <Row>
          <Col>

            {/* <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={uberlogoRes} alt="CustomerLogo" />

              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h3>Do you own a restaurant?</h3>
                  <p>Enroll your restaurant with us to get your orders online</p>
                </Carousel.Caption>
                <img className="d-block w-100" src={uberlogoRes} alt="RestaurantLogo" />
              </Carousel.Item>
            </Carousel> */}
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

                <Button type="submit" style={{ width: '50%' }}>
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
