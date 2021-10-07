/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getRestaurantData } from '../functions/restaurants';
import { Button, SHAPE, SIZE } from 'baseui/button';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Card, StyledBody } from 'baseui/card';
import AppBar from '../components/AppBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles, StylesContext } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {addRestToFav} from '../reducers/actions/favActions';

const useStyles = makeStyles((theme)=>({
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
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
  const [restaurants, setRestaurants] = useState([]);
  const [value, setValue] = React.useState('1');
  const [loading, setLoading] = useState(false);
  const [searchValue, setsearchValue] = useState('');
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(propertyNames);
    loadAllRestaurants();
    // addSearchInput();
  }, []);

  const addSearchInput = (value) => {
    setsearchValue({ searchValue: value });
  };
  console.log(restaurants);


  const loadAllRestaurants = () => {
    getRestaurantData('hyderabad')
      .then((res) => {
        //console.log(Object.values(res.data));
         console.log(res.data.restaurants);
        setRestaurants(res.data.restaurants);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const favClickHandler =(favRestaurant)=>{
    console.log('working!')
    dispatch(addRestToFav({favRestaurant}))
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
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              name="number"
              align={ALIGN.vertical}
            >
              <Radio value="11">Delivary</Radio>
              <Radio value="22">Pickup</Radio>
            </RadioGroup>
            <Button shape={SHAPE.pill} size={SIZE.default} onClick="filterrestuarants()">
              Pickup
            </Button>
            <RadioGroup
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              name="number"
              align={ALIGN.vertical}
            >
              <Radio value="1">Picked for you(default)</Radio>
              <Radio value="2">Most Popular</Radio>
              <Radio value="3">Rating</Radio>
              <Radio value="4">Delivery time</Radio>
            </RadioGroup>
            <h4>Dietary</h4>
            <Button shape={SHAPE.pill} size={SIZE.default} onClick="filterrestuarants">
              Vegetarian
            </Button>
            <Button shape={SHAPE.pill} size={SIZE.default}>
              Vegan
            </Button>
            <Button shape={SHAPE.pill} size={SIZE.default}>
              Non-veg
              </Button>
          </div>


          <div className="col-md-9">
            <div className="row">
            {restaurants.map((res) => (
                <div className="col-md-4">
                  {/* <StyledLink href={`/restaurants/RestaurantPage/${res.rest_id}`}> */}
                    <Card className={classes.card}
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