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

const custId = 1

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
    const [restaurantNames, setRestaurantNames] = useState({})
    const [openReceipt, setOpenReceipt] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = useState({})
    console.log(restaurantNames)
    var restNames = {}

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`/customers/${custId}/orders`);
            
            setOrders(response.data.customerOrders)
            
            orders.map(async (order)=>{
              let restDetails = await axiosInstance.get(`/restaurants/${order.restId}`);
              // console.log(restDetails)
              // console.log(restDetails.data.rest.name)
              // console.log(order.restId)
              restNames[order.restId] = restDetails.data.rest.name
            })
            setRestaurantNames(restNames)
            // console.log('in view orders')
            // console.log(orders)
            // console.log(restaurantNames)
        } catch (error) {
        console.log(error);}
    },[]);

    console.log(restaurantNames)
    const viewReciptHandler = (orderId)=>{   
      // console.log(orders)
      // console.log(orderId)
      console.log('view recipt handler')
      const curorder = orders.filter(order=>order.orderId ==orderId)
      setOpenReceipt(true)
      setSelectedOrder(curorder[0])
      // console.log(curorder[0])
      // console.log(selectedOrder)
      
    }

    const handleReceiptClose = () => {
      setOpenReceipt(false);
    };

  return (

    <div>
      <AppBar/>
      <div className={classes.container}>

      <Typography  component="div" variant="h4">Past Orders</Typography>

      <div className={classes.Orders}>
            {orders.length>0 && orders.map(order=>  { 
              return <div style={{ border: "none", borderBottom: "1px dotted black" }}>{restaurantNames[order.restId]}<br/>
                      {order.orderDishes.length} items for ${order.totalPrice} . {order.orderPlacedTime.split('T')[0]} at {order.orderPlacedTime.split('T')[1].split(':')[0]}:{order.orderPlacedTime.split('T')[1].split(':')[0]} .  
                      <Link
                        component="button"
                        variant="body2"
                        onClick={()=>viewReciptHandler(order.orderId)}
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
          {selectedOrder.orderDishes && selectedOrder.orderDishes.map((item)=>{return (
            <div>{item.dish.name} ${item.dish.dishPrice}</div>)})}
          </Typography>
        </DialogContent>
      </Dialog>

    </div>
    </div>
  );
}