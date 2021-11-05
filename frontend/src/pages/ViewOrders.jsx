/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import jwt_decode from 'jwt-decode';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles((theme)=>({
  container:{
    margin: "30px 30px",
    border: "10px",
    
  },
  Orders:{
    marginLeft: "30px",
    display: "grid",
    gridTemplateRows: "repeat(autoFit, 100px)",
  }
}));
     

export default function ViewOrders() {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [displayOrders, setDisplayOrders] = useState([]) 
    const [filteredOrders, setFilteredOrders] = useState([]) 
    const [restaurantNames, setRestaurantNames] = useState({})
    const [openReceipt, setOpenReceipt] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = useState({})
    var custId = null;
    const token = sessionStorage.getItem('token');
    if(token){
        const decoded = jwt_decode(token);
        custId = decoded.id;
    }
    console.log('restaurant names')
    console.log(restaurantNames)
    var restNames = {}

    useEffect(() => {
      setDisplayOrders(filteredOrders)
    }, [filteredOrders])

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`/customers/${custId}/orders`);
            console.log(response)
            
            setOrders(response.data.customerOrders)
            
            orders.map(async (order)=>{
              let restDetails = await axiosInstance.get(`/restaurants/${order.restId}`);
              console.log('rest Details from api:')
              console.log(restDetails)
              restNames[order.restId] = restDetails.data.rest.name
            })
            setRestaurantNames(restNames)
        } catch (error) {
        console.log(error);}
    },[]);

    console.log(restaurantNames)
    const viewReciptHandler = (orderId)=>{
      console.log('view recipt handler')
      const curorder = orders.filter(order=>order._id ==orderId)
      console.log(orders)
      console.log(curorder)
      setOpenReceipt(true)
      setSelectedOrder(curorder[0])
    }

    const handleReceiptClose = () => {
      setOpenReceipt(false);
    };

  return (

    <div>
      <AppBar/>
      <div className={classes.container}>

      <Typography  component="div" variant="h4">Past Orders</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Orders</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value="Preparing"
              label="Orders"
              onChange={(e)=>{
                console.log(e.target.value)
                if(e.target.value=="Placed"){
                  let curorders = orders.filter(order=> { return order.orderStatus=="Placed"})
                  console.log(curorders)
                  setFilteredOrders(curorders)
                }
                else if(e.target.value=="Preparing"){
                  let curorders = orders.filter(order=> {order.orderStatus=="Pickup up"})
                  console.log(curorders)
                  setFilteredOrders(curorders)
                }
                else if(e.target.value=="Delivered"){
                  let curorders = orders.filter(order=> { return order.orderStatus=="Delivered"|| order.orderStatus=="Pickup up"})
                  console.log(curorders)
                  setFilteredOrders(curorders)
                }
                else if(e.target.value=="Cancelled"){
                  let curorders = orders.filter(order=>order.orderStatus=="Cancelled")
                  console.log(curorders)
                  setFilteredOrders(curorders)
                }
              }}
            >
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Placed">Placed</MenuItem>
              <MenuItem value="Deliverd">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

      <div className={classes.Orders}>
            {displayOrders.length>0 && displayOrders.map(order=>  { 
              return <div style={{ border: "none", borderBottom: "1px dotted black" }}>{order.restId.name}<br/>
                      {order.dishes.length} items for ${order.totalPrice} . {order.orderPlacedTime.split('T')[0]} at {order.orderPlacedTime.split('T')[1].split(':')[0]}:{order.orderPlacedTime.split('T')[1].split(':')[0]} .  
                      <Link
                        component="button"
                        variant="body2"
                        onClick={()=>{
                          console.log('selected order')
                          console.log(order)
                          viewReciptHandler(order._id)}}
                      > View Receipt</Link>
                      <br/>
                      <br/>
            </div>} )}

       </div>

       <Dialog
        onClose={handleReceiptClose}
        aria-labelledby="customized-dialog-title"
        open={openReceipt}>
          <div style={{display:"flex", flexDirection:"row"}}>
        <DialogTitle id="customized-dialog-title" onClose={handleReceiptClose}>
          Receipt
        </DialogTitle>
        <IconButton style={{marginLeft:"auto"}}onClick={handleReceiptClose}><CloseIcon /></IconButton></div>
        <DialogContent dividers>
          <Typography gutterBottom>
            Total ${selectedOrder.totalPrice}
          </Typography>
          <Typography gutterBottom>
          {selectedOrder.dishes && selectedOrder.dishes.map((item)=>{return (
            <div>{item.dish.name} ${item.dish.dishPrice}</div>)})}
          </Typography>
        </DialogContent>
      </Dialog>

    </div>
    </div>
  );
}