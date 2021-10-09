/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getRestaurantData, getCustomerData } from '../functions/backendapicalls';
import { Button, SHAPE, SIZE } from 'baseui/button';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Card, StyledBody } from 'baseui/card';
import AppBar from '../components/AppBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles, StylesContext } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {addRestToFav} from '../reducers/actions/favActions';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme)=>({
  media: {
    height: 0,
    paddingTop: '56.25%'
 },
 card: {
    position: 'relative',
 },
 overlay: {
    position: 'absolute',
      top: '5%',
      left: '80%',
    color: 'black',
 }
}))

function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState([])
  const [userCity, setUserCity] = useState('nocity')
  const [displayrestaurants, setDisplayRestaurants] = useState([])
  const [filteredrestaurants, setFilteredRestaurants] = useState([])
  const [value, setValue] = React.useState('1')
  const [mode, setMode] = React.useState('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('token');
  var custId = null;
  if(token){
  const decoded = jwt_decode(token);
     custId = decoded.id;
  }
  console.log(custId)

  useEffect(() => {
    if(custId){
      loadCustomerDetails(loadAllRestaurants)
    }
    else{
    loadAllRestaurants()
    }
  }, [])

  useEffect(() => {
    setDisplayRestaurants(filteredrestaurants)
  }, [filteredrestaurants])

  const loadCustomerDetails = (callback) => {
    console.log('load cust details')
    getCustomerData(custId)
      .then((res) => {
        console.log(res.data.user);
        setUserCity(res.data.user.city)
      })
      .catch((err) => console.log(err));
      console.log(usercity)
      callback()
  };

  const loadAllRestaurants = () => {
    getRestaurantData(userCity)
      .then((res) => {
        console.log(res.data.restaurants);
        setRestaurants(res.data.restaurants);
        setDisplayRestaurants(res.data.restaurants);
      })
      .catch((err) => console.log(err));
  };

  const favClickHandler =(favRestaurant)=>{
    dispatch(addRestToFav({favRestaurant}))
  }

  const dietHandler =(diet)=>{
    console.log(diet)  
    let filteredrest = restaurants.filter(rest=>rest.dietary==diet)
    setDisplayRestaurants(filteredrest)
  }

  return (
    <div>
      <AppBar/>
    <div className="container-fluid">
      <div>
        <h4>Crave it? get it</h4>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2>All Stores</h2>

            <RadioGroup
              
              onChange={(e) => {
                let curmode = e.currentTarget.value
                setMode(e.currentTarget.value)
                if(curmode==='Delivery' || curmode==='Pickup'){
                    let filteredrest = restaurants.filter(rest=> rest.deliveryType==curmode)
                    setDisplayRestaurants(filteredrest)
                }
                else{
                  setDisplayRestaurants(restaurants)
                }
              }
              }
              value={mode}
              name="number"
              align={ALIGN.vertical}
            >
              <Radio value="All">All</Radio>
              <Radio value="Delivery">Delivery</Radio>
              <Radio value="Pickup">Pickup</Radio>
            </RadioGroup>


            <h4>Dietary</h4>
            <Button shape={SHAPE.pill} size={SIZE.default} onClick={(e)=>dietHandler('Veg')}>
              Vegetarian
            </Button>
            <Button shape={SHAPE.pill} size={SIZE.default} onClick={(e)=>dietHandler('Vegan')}>
              Vegan
            </Button>
            <Button shape={SHAPE.pill} size={SIZE.default} onClick={(e)=>dietHandler('Non-veg')}>
              Non-veg
              </Button>
          </div>


          <div className="col-md-9">
            <div className="row">
            {displayrestaurants.map((res) => (
                <div className="col-md-4">
                  {/* <StyledLink href={`/restaurants/RestaurantPage/${res.rest_id}`}> */}
                    <Card key={res.restId} className={classes.card}
                      overrides={{ Root: { style: { width: '250px' } } }}
                      headerImage="https://source.unsplash.com/user/erondu/700x400"
                      title={res.name}>
                      
                      <StyledBody
                          className={classes.overlay}
                      ><IconButton onClick={()=>favClickHandler(res)} aria-label="favorite" component="span"><FavoriteIcon/></IconButton></StyledBody>
                      <StyledBody>{res.description}</StyledBody>
                      
                    </Card>
                  {/* </StyledLink> */}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}

export default CustomerDashboard;