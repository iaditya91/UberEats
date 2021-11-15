/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';
import Button from '@mui/material/Button';
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
import Pagination from '../pagination/Pagination'
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

    // totalPages: 1,
    // currentPage: 1,
    // totalResults: 2,
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalResults, setTotalResults] = useState(2)
    console.log(totalPages)
    console.log(currentPage)
    console.log(totalResults)

    var custId = null;
    const token = sessionStorage.getItem('token');
    if(token){
        const decoded = jwt_decode(token);
        custId = decoded.id;
    }
    // console.log('custId')
    // console.log(custId)
    // console.log('restaurant names')
    // console.log(restaurantNames)
    var restNames = {}

    useEffect(() => {
      setDisplayOrders(filteredOrders)
    }, [filteredOrders])

    const getOrders = async ()=>{
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
            let totalResultsAvailable = totalResults
            let totalPgs = Math.ceil(totalResultsAvailable/response.data.customerOrders.length)
            setTotalPages(totalPgs)
        } catch (error) {
        console.log(error);}
    }

    useEffect(async ()=> {
        getOrders()
    },[]);

    // console.log(restaurantNames)
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

    const  changePage = (newPage) => {
      console.log('new page')
      console.log(newPage)
      setCurrentPage(newPage);
    }

    const changeTotalResults = (totalResultsToShow) => {
      console.log('new total results')
      setTotalResults(totalResultsToShow)
      setCurrentPage(1)
      // getOrders()
    }

    const cancelOrderHandler = (orderId) => {
      console.log('cancel order clicked!')
      console.log(orderId)
      const curorder = orders.filter(order=>order._id ==orderId)
      console.log(curorder[0].restId._id)
      axiosInstance.put(`restaurants/${curorder[0].restId._id}/updateorder/`, { orderStatus:"Cancelled", orderId:curorder[0]._id})
      .then((data)=>{
        console.log('orderStatus Changed')
      }).catch(error=>console.log(error))
    };

  return (

    <div>
      <AppBar/>
      <div className={classes.container}>

      <Typography  component="div" variant="h4">Past Orders</Typography>
          <FormControl  style={{minWidth: 120}}>
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
                  let curorders = orders.filter(order=> order.orderStatus=="Preparing")
                  console.log(curorders)
                  setFilteredOrders(curorders)
                }
                else if(e.target.value=="Delivered"){
                  let curorders = orders.filter(order=>  order.orderStatus=="Delivered" || order.orderStatus=="Pickup up")
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
              <MenuItem value="Delivered">Delivered</MenuItem>
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
                      <p>Order Status: {order.orderStatus}</p>
                      {order.orderStatus=="Placed" && <Button style={{borderRadius: 35,
                                                                      backgroundColor: "#b62121",
                                                                      padding: "9px 18px",
                                                                      fontSize: "13px"
                                                                  }}
                                                                  variant="contained" onClick={()=>{cancelOrderHandler(order._id)}}>Cancel Order</Button>}
                      <br/>
                      <br/>
                      
            </div>} )}
            <Pagination
                          totalPages={totalPages}
                          currentPage={currentPage}
                          changePage={changePage}
                          changeTotalResults={changeTotalResults}
                        />
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
          <Typography style = {{weight:'bold'}}>Items</Typography>
          <Typography gutterBottom>
          {selectedOrder.dishes && selectedOrder.dishes.map((item)=>{return (
            <div>{item.dish.name} ${item.dish.dishPrice* item.quantity}</div>)})}
          </Typography>
          <Typography gutterBottom>
            Total ${selectedOrder.totalPrice} (tax: ${selectedOrder.taxPrice})
          </Typography>
          {/* <DialogContent dividers> */}
          <Typography gutterBottom>
          {selectedOrder.orderAddress && <>Address: {selectedOrder.orderAddress}</>}
          
          </Typography>
          <Typography gutterBottom>
          {selectedOrder.orderNote &&<>Note: {selectedOrder.orderNote}</>}  </Typography>
          {/* </DialogContent> */}
        </DialogContent>
      </Dialog>

    </div>
    </div>
  );
}