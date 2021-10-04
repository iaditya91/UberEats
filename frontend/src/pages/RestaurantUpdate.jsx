/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import axiosInstance from '../config/axiosConfig';
import jwt_decode from 'jwt-decode';
import { Carousel, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import uberlogo from '../images/ubereats.svg';
import uberlogoRes from '../images/uberLogoRes.png';
import AppBar from '../components/AppBar';
import { useHistory } from 'react-router';

function RestaurantUpdate() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_no, setContact] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [start_time, setStarttime] = useState('');
  const [end_time, setEndtime] = useState('');
  const [delivery_type, setDeliverytype] = useState('');
  const hist = useHistory();
  

  const dispatch = useDispatch();

  const fetchRestaurantData = useCallback(async () => {
    const token = sessionStorage.getItem('token');
    const decoded = jwt_decode(token);
    const response = await axiosInstance.get(`restaurants/${decoded.id}`, {
      headers: { Authorization: token },
    });
    console.log(response);
    try {
      setEmail(response.data.rest.email_id);
      setPassword(response.data.rest.password);
      setContact(response.data.rest.contact_no);
      setName(response.data.rest.name);
      setCity(response.data.rest.city ? response.data.rest.city : '');
      setAddress(response.data.rest.address ? response.data.rest.address : '');
      setDescription(
        response.data.rest.description ? response.data.rest.description : ''
      );
      setStarttime(response.data.rest.start_time ? response.data.rest.start_time : '');
      setEndtime(response.data.rest.end_time ? response.data.rest.end_time : '');
      setDeliverytype(
        response.data.rest.delivery_type ? response.data.delivery_type : ''
      );
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerObj = {
      emailId: email_id,
      passwd: password,
      contactNo: contact_no,
      name,
      city,
      state,
      address,
      description,
      start_time,
      end_time,
      deliveryType: delivery_type,
    };
    const token = sessionStorage.getItem('token');
    const decoded = jwt_decode(token);
    console.log(token);
    try {
      const response = await axiosInstance.put(`restaurants/${decoded.id}`, customerObj, {
        headers: { Authorization: token },
      });
      console.log(response);
      hist.push('/restaurantAdmin');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);
  return (
    <div>
      <AppBar />
      <Container>
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={uberlogo} alt="CustomerLogo" />
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <h3>Do you own a restaurant?</h3>
                  <p>Enroll your restaurant with us to get your orders online</p>
                </Carousel.Caption>
                <img className="d-block w-100" src={uberlogoRes} alt="RestaurantLogo" />
              </Carousel.Item>
            </Carousel>
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
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    autoFocus
                  />
                </FormControl>
                <FormControl>
                  <Input
                    value={city}
                    type="city"
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

                <Button type="submit" style={{ width: '50%' }}>
                  Update
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RestaurantUpdate;
