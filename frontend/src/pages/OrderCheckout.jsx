/* eslint-disable */
import React from 'react';
import AppBar from '../components/AppBar'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import axiosInstance from '../config/axiosConfig';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import {setDelivaryAddress} from "../reducers/actions/orderActions"
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles(theme=>({
    column1:{
        float: "left",
        width:"60%",
        paddingLeft: "70px",
        height: "400px"
    },
    column2:{
        float: "left",
        width:"40%",
        paddingLeft: "70px",
        paddingTop: "30px",
        height: "400px"
    }
}))

export default function OrderCheckout(){
    const cartState = useSelector(state=>state.cart)
    const orderState = useSelector(state=>state.order)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [address, setAddress] = useState()
    const [newAddress, setNewAddress] = useState()
    const [selectedAddress, setSelectedAddress] = useState()
    const [successmessage, setSuccessMessage] = useState("")
    const [popUpMessageOpen, setPopUpMessageOpen] = useState(false)
    const custId = 1 //cartState.custId
    // console.log("orderState")
    // console.log(orderState[orderState.length - 1])

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`customers/${custId}/addresses`);
            // console.log('address from table')
            // console.log(response.data.existingAddresses)
            dispatch(setDelivaryAddress({address:response.data.existingAddresses}))
        } catch (error) {
        console.log(error);}
        },[newAddress]);

        useEffect(async ()=> {
            try {
                const response = await axiosInstance.get(`customers/${custId}/addresses`);
                // console.log('address from table')
                // console.log(response.data.existingAddresses)
                dispatch(setDelivaryAddress({address:response.data.existingAddresses}))
            } catch (error) {
            console.log(error);}
            },[]);

    const placeOrderHandler = async ()=>{
        console.log("Placeorder clicked")

        // console.log(selectedAddress[0].address)
        const orderObj ={
            orderType:"Delivery",
            price: totalSum,
            taxPrice: tax,
            totalPrice: total,
            orderAddress: selectedAddress[0].address,
            cartItems: cartState.dishes
        }
        try {
            // const response = await axiosInstance.post(`/customers/${custId}/orders/init`, orderObj);
            // console.log(response)
            // setSuccessMessage(response.data.message)
            setSuccessMessage("this is message")
            setPopUpMessageOpen(true)
        } catch (error) {
            console.log(error);}
    }

    var totalSum = 0
    if(cartState.dishes.length>0){
        cartState.dishes.map(dish=>{
            totalSum = totalSum +dish.dishPrice
        })
    }
    var tax = Math.round(totalSum * (0.0925)*100)/100
    var total = totalSum + tax
    

    const newAddressOnChange =(event)=>{
        const { value}= event.target
        setAddress(value)
        // console.log(address)
    }
    const addAddressHandler = async()=>{
         try {
             const response = await axiosInstance.post(`customers/${custId}/addresses`,{address});
            //  console.log(response);
            setNewAddress(address)
         } catch (error) {
         console.log(error);
    }};

    const delivaryOnSelectHandler =(event)=>{
        const {name, value} = event.target
        // console.log(event.target.value)
        const addr = orderState.filter(order=>order.id==event.target.value)
        console.log('addr')
        console.log(addr)
        setSelectedAddress(addr)
        console.log(selectedAddress)
    }

    return (
        <div>
            <AppBar />
            <div className={classes.column1} style={{backgroundColor:"#b8b7fd"}}>
                    <Typography component="div" variant="h2">
                        {(cartState.dishes.length>0 && cartState.dishes[0].restId)&&<div>Restaurant Name: {cartState.dishes[0].restId}</div> }
                     </Typography>
                     <Typography component="div" variant="h6">
                        Your Items
                     </Typography>
                     {cartState.dishes.map(dish=>{
                        return(<Typography sx={{fontWeight:"bold"}} component="div" variant="subtitle1">
                            {dish.name} Price: {dish.dishPrice}$
                            </Typography>)
                     }
                    )}

                <div>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Select a Delivary Address</FormLabel>
                    <RadioGroup
                        onChange={delivaryOnSelectHandler}
                        aria-label="delivary address"
                        name="radio-buttons-group"
                    //   value={selectedAddress}
                    >
                      {orderState.length>0 && orderState.map(del_address=>{
                            return(<FormControlLabel key={del_address.id}  sx={{fontWeight:"bold"}} value={del_address.id}  control={<Radio />} label={del_address.address}/>)
                        })}
                    </RadioGroup>
                    
                    </FormControl> 
                </div>
                or Add a new delivary Address
                <form>
                    <TextField name="address" onChange={newAddressOnChange} id="filled-basic" label="New Delivary Address" variant="standard" />
                    <Button onClick={addAddressHandler} varient='contained'>Add Address</Button>
                    </form>
                    
                    
             </div>
             <div className={classes.column2} style={{backgroundColor:"#b8b7fd"}}>
             <Button sx={{'background-color': "green"}} onClick={()=>placeOrderHandler()} variant="contained">Place Order</Button>
             {(selectedAddress)&&<Typography component="div" variant="subtitle1">Selected Delivary Address: {selectedAddress[0].address}
                     </Typography>}
             <Typography component="div" variant="subtitle1">Total: {totalSum} $
                     </Typography>
            <Typography component="div" variant="subtitle1">Estimated Tax: {tax} $
                     </Typography>
             <Typography component="div" variant="h5">Total Price: {total} $
                     </Typography>
             </div>

             {successmessage&&<Snackbar
                anchorOrigin={ "bottom", "center" }
                open={popUpMessageOpen}
                onClose={setPopUpMessageOpen(false)}
                message={successmessage}
                // key={vertical + horizontal}
                />}
            
        </div>
    );
};