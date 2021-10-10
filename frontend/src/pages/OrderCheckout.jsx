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
import { useHistory } from 'react-router';
import Dialog from '@mui/material/Dialog';
import jwt_decode from 'jwt-decode';
import {resetCart} from '../reducers/actions/cartActions'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@mui/material/DialogActions';

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
    const hist = useHistory()
    const cartState = useSelector(state=>state.cart)
    const orderState = useSelector(state=>state.order)
    const detState = useSelector(state=>state.details)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [address, setAddress] = useState()
    const [newAddress, setNewAddress] = useState()
    const [selectedAddress, setSelectedAddress] = useState()
    const [openSuccessMsg, setOpenSuccessMsg] = React.useState(false);
    var custId = null;
    const token = sessionStorage.getItem('token');
    if(token){
        const decoded = jwt_decode(token);
        custId = decoded.id;
    }

    const handleSuccessMsgClose = () => {
        hist.push('/')
        setOpenSuccessMsg(false);
      };

    // const custId = cartState.custId
    // console.log(detState.rest)

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`customers/${custId}/addresses`);
            dispatch(setDelivaryAddress({address:response.data.existingAddresses}))
        } catch (error) {
        console.log(error);}
        },[newAddress]);

        useEffect(async ()=> {
            try {
                const response = await axiosInstance.get(`customers/${custId}/addresses`);
                dispatch(setDelivaryAddress({address:response.data.existingAddresses}))
            } catch (error) {
            console.log(error);}
            },[]);

    const placeOrderHandler = async ()=>{
        console.log("Placeorder clicked")
        let dishes = []
        for(let i =0;i<cartState.dishes.length;i++){
            dishes.push(cartState.dishes[i].dish)
        }
        // console.log(dishes)

        const orderObj ={
            orderType:"Delivery",
            price: totalSum,
            taxPrice: tax,
            totalPrice: total,
            orderAddress: selectedAddress[0].address,
            cartItems: dishes
        }
        try {
            const response = await axiosInstance.post(`/customers/${custId}/orders/init`, orderObj);
            console.log("HERE")
            console.log(response)
            setOpenSuccessMsg(true)
        } catch (error) {
            console.log(error);}
    }

    var totalSum = 0
    if(cartState.dishes.length>0){
        cartState.dishes.map(dish=>{
            totalSum = totalSum +dish.dish.dishPrice
        })
    }
    totalSum = Math.round(totalSum*100)/100
    var tax = Math.round(totalSum * (0.0925)*100)/100
    var total = Math.round((totalSum + tax)*100)/100
    

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
            <div className={classes.column1}>
                    <Typography component="div" variant="h4">
                    {/* {cartState.dishes[0].restId} */}
                        {(cartState.dishes.length>0)&&<div>Restaurant Name: {cartState.restaurant.name} </div> }
                     </Typography>
                     <Typography component="div" variant="h6">
                        Your Items
                     </Typography>
                     {cartState.dishes.map(dish=>{
                        return(<Typography sx={{fontWeight:"bold"}} component="div" variant="subtitle1">
                            {dish.quantity} {dish.dish.name} (Price: {dish.dish.dishPrice * dish.quantity}$)
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
             <div className={classes.column2}>
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

             <Dialog
                onClose={handleSuccessMsgClose}
                aria-labelledby="customized-dialog-title"
                open={openSuccessMsg}>
                  <div style={{display:"flex", flexDirection:"row"}}>
                {/* <DialogTitle id="customized-dialog-title" onClose={handleSuccessMsgClose}>
                  Create new order?
                </DialogTitle> */}
                <IconButton style={{marginLeft:"auto"}} onClick={handleSuccessMsgClose}><CloseIcon /></IconButton></div>
                <DialogContent dividers>
                <Typography gutterBottom>
                    Order Placed Successfully
                  </Typography>
                </DialogContent>
                <DialogActions>
                <Button varient='contained' 
                    onClick={(e)=>{
                        e.preventDefault()
                        dispatch(resetCart())
                        handleSuccessMsgClose()
                }} style={{backgroundColor:"black", color:"white"}}>Go To Home</Button>
                </DialogActions>
      </Dialog>
        </div>
    );
};