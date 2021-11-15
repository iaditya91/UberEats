/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getRestaurantData, getCustomerData, getSearchData } from '../functions/backendapicalls';
import { Button, SHAPE, SIZE } from 'baseui/button';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Card, StyledBody } from 'baseui/card';
import AppBar from '../components/AppBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles, StylesContext } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../config/axiosConfig';
import {addRestToFav} from '../reducers/actions/favActions';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';

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
      top: '17px',
      left: '80%',
    color: 'pink',
 }
}))

function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState([])
  const [userCity, setUserCity] = useState('nocity')
  const [displayrestaurants, setDisplayRestaurants] = useState([])
  const [filteredrestaurants, setFilteredRestaurants] = useState([])
  const [value, setValue] = React.useState('1')
  const [mode, setMode] = React.useState('')
  const hist = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  var custId = null;
  const searchState = useSelector(state=>state.search)
  const token =  sessionStorage.getItem('token');
  if(token){
      (async() =>{
          var decoded = await jwt_decode(token);
          custId = decoded.id;
      })()
  }

  useEffect(() => {
    if(custId){
      loadCustomerDetails(loadAllRestaurants)
    }
    else{
    loadAllRestaurants('nocity')
    }
  }, [custId])

  useEffect(() => {
    setDisplayRestaurants(filteredrestaurants)
  }, [filteredrestaurants])

  useEffect(() => {
    // console.log('im in search useffect '+ searchState)
    console.log(searchState)
    if(searchState.searchquery || searchState.searchquery != ''){
    getSearchData(searchState.searchquery)
      .then((res) => {
          console.log(res.data)
          setRestaurants(res.data.rest)
          setFilteredRestaurants(res.data.rest)
        })
    .catch((err) => console.log(err));}
  }, [searchState.searchquery])

  const loadCustomerDetails = (callback) => {
    // console.log('load custId details')
    getCustomerData(custId)
      .then((res) => {
        // console.log('user city in loadcustdetails '+ res.data.user.city);
        setUserCity(res.data.user.city)
        callback(res.data.user.city)
        // console.log(userCity)
      })
      .catch((err) => console.log(err));
      
      // callback()
  };

  const loadAllRestaurants = (curcity) => {
    getRestaurantData(curcity)
      .then((res) => {
        // console.log(res.data.restaurants);
        setRestaurants(res.data.restaurants);
        setDisplayRestaurants(res.data.restaurants);
      })
      .catch((err) => console.log(err));
  };

  const favClickHandler =(favRestaurant)=>{
    // console.log(favRestaurant)
    axiosInstance.post(`customers/favourites/${custId}`, {restId:favRestaurant._id})
        .then((data)=>{
            console.log(data)
        }).catch(error=>console.log(error))
    dispatch(addRestToFav({favRestaurant}))
  }

  const dietHandler =(diet)=>{
    // console.log(diet)
    let filteredrest = restaurants.filter(rest=>rest.dietary==diet)
    setDisplayRestaurants(filteredrest)
  }

  return (
    <div>
      <AppBar/>
    <div style={{marginTop: "30px"}} className="container-fluid">
      <div>
        <h4>All Stores</h4>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h3>Delivery Type</h3>

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
                <div key={res._id} className="col-md-4">
                    <Card key={res._id}  className={classes.card}
                      title={res.name}>
                        <div >
                      <img  style= {{ width: '280px' , height:'200px'}} onClick={()=>{hist.push(`/restaurantMain/${res._id}`)}} src={res.profileImg}/>
                      <StyledBody
                          className={classes.overlay}
                      ><IconButton varient="contained" onClick={()=>{
                        favClickHandler(res)}} aria-label="favorite"><FavoriteIcon/></IconButton></StyledBody>
                      </div>
                    </Card>
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