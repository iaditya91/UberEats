/* eslint-disable */
import AppBar from '../components/AppBar'
import React,{useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Grid} from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';

const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1,
    },
    cardContainer: {
        width: '95vw',
        margin: '1rem auto'
    },
}));

const cardOnClickHandler = async (name)=>{
    console.log('card clicked!');
    //const dishes = localStorage.getItem(dishes);
    console.log(name);
    
    try {
        const response = await axiosInstance.post(`/customers/11/cart`, {restId:1, dishId:name.dishId});
        // setRestaurant(response.data.rest)
        console.log(response)
    } catch (error) {
    console.log(error);}
    
}


{/* <div onClick={cardOnClickHandler}></div> */}
const dishCards = (dishes)=>{
    var rows = []
    for (var i = 0; i < dishes.length; i++) {
        var dish = dishes
        rows.push(
            <Grid item key={i} xs={4} >
                <Card onClick={()=>cardOnClickHandler(dish[i])} sx={{ display: 'flex' }}>
                 <Box sx={{ display: 'flex' }}>
                 <CardContent sx={{ flex: '1 0 auto' }}>
                     <Typography component="div" variant="h5">
                        {dishes[i].name}
                     </Typography>
                     <Typography variant="subtitle1" color="text.secondary" component="div">
                        {dishes[i].description}
                     </Typography>
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
         );
    }

    return  <Grid container spacing={4} direction="row">{rows} </Grid>;
}

export default function RestaurantMain(){
    const classes= useStyles()
    const [dishes,setDishes] = useState({})
    const [restaurant, setRestaurant] = useState({})
    const dishCardshtml= dishCards(dishes)
    // localStorage.setItem('dishes',dishes)

    

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`/restaurants/1/dishes`);
            setDishes(response.data.dishes)
        } catch (error) {
        console.log(error);}
        },[]);

    useEffect(async ()=> {
            try {
                const response = await axiosInstance.get(`/restaurants/1`);
                setRestaurant(response.data.rest)
            } catch (error) {
            console.log(error);}
        },[]);

    return (
        <div>
        <AppBar/>

            <div>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                <img style={{width:"100%"}}src={restaurant.profileImg} alt="This is image of restaurant"/><br/>
                {restaurant.name}<br/>
                Address: {restaurant.address}<br/>
                Description: {restaurant.description}<br/>
                 </Typography>         
            
        </div>
        <br/><br/>
        <Typography variant="h3" color="text.secondary" component="div"> Menu</Typography>
        <div>
           
            {dishCardshtml} 
           
        </div>
       </div>
    )
}