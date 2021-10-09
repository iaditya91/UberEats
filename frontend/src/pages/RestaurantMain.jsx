/* eslint-disable */
import AppBar from '../components/AppBar'
import React,{useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Grid} from '@material-ui/core';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';
import RestaurantHome from '../images/RestaurantHome.jpg'
import { useSelector, useDispatch } from 'react-redux';
import {createCart, addDishToCart} from '../reducers/actions/cartActions'
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router';



const token = sessionStorage.getItem('token');
// const restId =  1 //sessionStorage.getItem('restId')

const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1,
    },
    cardContainer: {
        width: '95vw',
        margin: '1rem auto'
    },
}));

export default function RestaurantMain(){
    const classes= useStyles()
    const {restId} = useParams()
    const dispatch = useDispatch()
    const [dishes,setDishes] = useState({})
    const [restaurant, setRestaurant] = useState({})
    const cartState = useSelector(state=> state.cart)
    
    var custId = 1;
    if(token){
        const decoded = jwt_decode(token);
        var custId = decoded.id;
    }
    
    // localStorage.setItem('dishes',dishes)

    const cardOnClickHandler = async (name)=>{
        console.log('card clicked!');
        //const dishes = localStorage.getItem(dishes);
        console.log(name);
        
        try {
            dispatch(addDishToCart({dishId: name}))
            // const response = await axiosInstance.post(`/customers/${restId}/cart`, {restId:1, dishId:name.dishId});
            // setRestaurant(response.data.rest)
            console.log(cartState)
        } catch (error) {
        console.log(error);}
    }

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`/restaurants/${restId}/dishes`);
            setDishes(response.data.dishes)
        } catch (error) {
        console.log(error);}
        },[]);

    useEffect(async ()=> {
            try {
                const response = await axiosInstance.get(`/restaurants/${restId}`);
                setRestaurant(response.data.rest)
                dispatch(createCart({custId}))
            } catch (error) {
            console.log(error);}
        },[]);

    return (
        <div>
        <AppBar/>

            <div>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                <img style={{width:"100%", height:400}} src={restaurant.profileImg} alt="This is image of restaurant"/><br/>
                {restaurant.name}<br/>
                Address: {restaurant.address}<br/>
                Description: {restaurant.description}<br/>
                 </Typography>         
            
        </div>
        <br/><br/>
        <Typography variant="h3" color="text.secondary" component="div"> Menu</Typography>
        <div>
            <Grid container spacing={4} direction="row">
            {dishes.length > 0  && dishes.map((dish) => {
                    return (
                        
                          <Grid item key={dish.dishId} xs={4} >
                            <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex' }}>

                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                   {dish.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                   Price: {dish.dishPrice} $
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                   {dish.description}
                                </Typography>
                                <Button onClick={()=>cardOnClickHandler(dish)} variant="contained">Add to Cart</Button>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
                            </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="/static/images/cards/live-from-space.jpg"
                                alt="Dish Image"
                            />
                        </Card>
                        </Grid>
                     ) 

            })}
            </Grid>
        </div>
       </div>
    )
}