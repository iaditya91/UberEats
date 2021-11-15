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
import { uploadFile } from 'react-s3';
import {awsConf} from '../config/awsConfig';

function CustomerUpdate() {
    const [email_id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact_no, setContact] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [about, setAbout] = useState('');
    const [nickName, setNickName] = useState('');
    const [image, setImage] = useState('');
    const hist = useHistory();
    
  
    const dispatch = useDispatch();
  
    const fetchRestaurantData = useCallback(async () => {
      const token = sessionStorage.getItem('token');
      const decoded = jwt_decode(token);
      const response = await axiosInstance.get(`customers/${decoded.id}`)
      // , {
      //   headers: { Authorization: token },
      // });
      console.log(response);
      try {
        setEmail(response.data.user.email_id);
        setPassword(response.data.user.password);
        setContact(response.data.user.contact_no);
        setName(response.data.user.name);
        setCity(response.data.user.city ? response.data.cust.city : '');
        setState(response.data.user.state ? response.data.cust.state : '');
        setAbout(
          response.data.user.about ? response.data.user.about : ''
        );
        setNickName(
          response.data.user.nickName ? response.data.user.nickName : ''
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
        country,
        about,
        profileImg: image,
        nickName
      };
      const token = sessionStorage.getItem('token');
      const decoded = jwt_decode(token);
      console.log(token);
      try {
        const response = await axiosInstance.put(`customers/${decoded.id}`, customerObj, {
          headers: { Authorization: token },
        });
        console.log(response);
        hist.push('/');
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
                  <FormControl>
                    <Input
                      value={country}
                      type="country"
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                      autoFocus
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      value={about}
                      type="text"
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="About"
                      autoFocus
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      value={nickName}
                      type="text"
                      onChange={(e) => setNickName(e.target.value)}
                      placeholder="Nick Name"
                      autoFocus
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        uploadFile(e.target.files[0], awsConf).then((data)=>{
                          setImage(data.location)}).catch(error=>{console.log(error)})
                        }}
                      placeholder="Customer Image"
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
  
  export default CustomerUpdate;
