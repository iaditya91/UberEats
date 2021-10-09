/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// const custId = 1

const useStyles = makeStyles((theme)=>({
  container:{
    margin: "30px 30px",
    border: "10px",
    
  },
  Orders:{
    marginLeft: "30px",
    display: "grid",
    gridTemplateRows: "repeat(autoFit, 100px)",
  },
  column1:{
    margin: "30px 30px",
    float: "left",
    width:"20%",
    paddingLeft: "70px",
    height: "400px"
},
column2:{
    float: "left",
    width:"60%",
    paddingLeft: "70px",
    paddingTop: "30px",
    height: "400px"
}
}));
     

export default function ViewOrders() {
    const classes = useStyles()
    const [orders, setOrders] = useState([]) 
    const [displayOrders, setDisplayOrders] = useState([]) 
    const [filteredOrders, setFilteredOrders] = useState([]) 
    const [openProfile, setOpenProfile] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState({})
    var restId = null;
    const token = sessionStorage.getItem('token');
    if(token){
        const decoded = jwt_decode(token);
        restId = decoded.id;
    }

    const viewProfileHandler = async(custId)=>{
      console.log('view recipt handler')
      const response = await axiosInstance.get(`/customers/${custId}`);
      console.log(response.data.user)
      setOpenProfile(true)
      setSelectedCustomer(response.data.user)
    }

    const handleProfileClose = () => {
      setOpenProfile(false);
    };

    useEffect(() => {
      setDisplayOrders(filteredOrders)
    }, [filteredOrders])

    useEffect(async ()=> {
        try {
            const response = await axiosInstance.get(`/restaurants/${restId}/orders`);         
            console.log(response.data)
            setOrders(response.data.restaurantOrders)
        } catch (error) {
        console.log(error);}
    },[]);

  return (

    <div>
      <AppBar/>
      <div className={classes.column1}>

        <Typography  component="div" variant="h4">Orders</Typography>  
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="new"
              onChange={(e)=>{
                console.log(e)
                let curorders = orders.filter(order=> order.orderStatus==e.target.value)
                setFilteredOrders(curorders)
              }}
              name="radio-buttons-group"
            >
              <FormControlLabel value="Placed" control={<Radio />} label="New Orders" />
              <FormControlLabel value="Delivered" control={<Radio />} label="Delivered Orders" />
              <FormControlLabel value="Cancelled" control={<Radio />} label="Canceled Orders" />
            </RadioGroup>
          </FormControl>

      </div>

      <div className={classes.column2}>
      <Typography  component="p" variant="h6">Received Orders</Typography>
          {displayOrders.map(order=>{
            return (
            <div style={{width:`100%`, backgroundColor:`white`, border: "none", borderBottom: "1px dotted black"}}>
              Order recieved from customer {order.custId}<br/>
              <Link
                        component="button"
                        variant="body2"
                        onClick={()=>viewProfileHandler(order.custId)}
                      > View Profile</Link>
              <Typography  component="p" variant="subtitle1">Order Details</Typography>
              {order.orderDishes.map(dish=> <div>{dish.dish.name}  {dish.dish.dishPrice}</div>)}
              Price: {order.totalPrice} $<br/>
              Set Order Status: <Button>Preparing</Button> <Button>Cancel</Button><br/>
              {order.orderType?
                <p>Set Delivery Status: <Button>Pickup Ready</Button> <Button>Customer Pickuped</Button></p>:<p><Button>Delivery Ready</Button> <Button>Delivered</Button></p>}
            </div>
            )
      })  
    }
      </div>

      <Dialog
        onClose={handleProfileClose}
        aria-labelledby="customized-dialog-title"
        open={openProfile}>
          <div style={{display:"flex", flexDirection:"row"}}>
        <DialogTitle id="customized-dialog-title" onClose={handleProfileClose}>
          Customer Profile
        </DialogTitle>
        <IconButton style={{marginLeft:"auto"}}onClick={handleProfileClose}><CloseIcon /></IconButton></div>
        <DialogContent dividers>
          {/* <img src={selectedCustomer.profileImg} style={{height:"100px", width:"100px"}} alt="Profile Image"/> */}
          <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={selectedCustomer.profileImg}
                                alt="Profile Image"
                            />
        <Typography gutterBottom>
            Name: {selectedCustomer.name}<br/>
            Email Id: {selectedCustomer.emailId}<br/>
            Contact No: {selectedCustomer.contactNo}<br/>
            NickName: {selectedCustomer.nickName}<br/>
            About: {selectedCustomer.about}<br/>
            City: {selectedCustomer.city}<br/>
            State: {selectedCustomer.state}<br/>
            Country: {selectedCustomer.country}<br/>
          </Typography>
          {/* <Typography gutterBottom>
            Total ${selectedCustomer.totalPrice}
          </Typography> */}
          {/* <Typography gutterBottom>
          {selectedCustomer.orderDishes && selectedCustomer.orderDishes.map((item)=>{return (
            <div>{item.dish.name} ${item.dish.dishPrice}</div>)})}
          </Typography> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}