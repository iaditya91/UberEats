/* eslint-disable */
import React from 'react';
import AppBar from '../components/AppBar'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme=>({
    column1:{
        float: "left",
        width:"60%",
        // padded: "70px",
        paddingLeft: "70px",
        height: "300px"
    },
    column2:{
        float: "left",
        width:"40%",
        // padded: "10px",
        paddingLeft: "70px",
        paddingTop: "30px",
        height: "300px"
    }
}))

export default function OrderCheckout(){
    const cartState = useSelector(state=>state.cart)
    const classes = useStyles()
    const placeOrderHandler = ()=>{
        console.log("Placeorder clicked")
    }
    return (
        <div>
            <AppBar />
            {cartState.custId}
            {cartState.dishes}
            <div className={classes.column1} style={{backgroundColor:"#b8b7fd"}}>
                    <Typography component="div" variant="h2">
                        {/* {cartState[0].restId} */}Restaurant Name
                     </Typography>
                     <Typography component="div" variant="h6">
                        {/* {cartState[0].restId} */}Your Items
                     </Typography>
                     {cartState.dishes.map(dish=>{
                        return(<div>
                            {dish.name} Price: {dish.dishPrice}$
                            </div>)
                     }
                    )}
                    Select Delivary Address<br/>
                    or Add your delivary Address
             </div>
             <div className={classes.column2} style={{backgroundColor:"#b8b7fd"}}>
             <Button sx={{'background-color': "green"}} onClick={()=>placeOrderHandler()} variant="contained">Place Order</Button>
             <Typography component="div" variant="h5">
                        {/* {cartState[0].restId} */}Total: 
                     </Typography>
             </div>
            
        </div>
    );
};