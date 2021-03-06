/* eslint-disable */
import AppBar from '../components/AppBar'
import React,{useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Grid} from '@material-ui/core';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import {createCart, addDishToCart, addRestaurantDetailsToCart, resetCart} from '../reducers/actions/cartActions'
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router';
import { setRestaurantDetails } from '../reducers/actions/detActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';



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
    const [warningDish, setWarningDish] = useState({})
    const [openWarning, setOpenWarning] = React.useState(false);
    
    var custId = 1;
    if(token){
        const decoded = jwt_decode(token);
        var custId = decoded.id;
    }
    
    // localStorage.setItem('dishes',dishes)

    const handleWarningClose = () => {
        setOpenWarning(false);
      };

    const cardOnClickHandler = async (name)=>{
        console.log('card clicked!');
        console.log(name);
        
        try {
            if(JSON.stringify(cartState.restaurant)==='{}'){
                dispatch(addRestaurantDetailsToCart({restaurant}))
                dispatch(addDishToCart({dishId: name, quantity:1}))
            }
            else if(cartState.restaurant.restId==restaurant.restId){
                dispatch(addDishToCart({dishId: name, quantity:1}))
            }
            else{
                setWarningDish(name)
                setOpenWarning(true)
            }
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
                dispatch(setRestaurantDetails({restaurant: response.data.rest}))
            } catch (error) {
            console.log(error);}
        },[]);

    return (
        <div>
        <AppBar/>

            <div>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                <img style={{width:"100%", height:400}} src={restaurant.profileImg} alt="This is image of restaurant"/><br/>
                <div style={{ margin: "20px 20px 20px 20px"}}>
                <h5><b>{restaurant.name}</b></h5>
                {restaurant.address&&<p><b>Address: </b>{restaurant.address}<br/></p>}
                {restaurant.description&&<p><b>Description: </b>{restaurant.description}<br/></p>}
                </div>
                 </Typography>         
            
        </div>
        <br/><br/>
        <Typography variant="h3" color="text.secondary" component="div" style={{marginLeft:"10px"}}> Menu</Typography>
        <div style={{ margin: "20px 20px 20px 20px", display:"grid", gridGap:"20px",gridTemplateRows:"repeat(2,170px)",gridTemplateColumns:"repeat(auto-fill, 420px)"}}>
            {dishes.length > 0  && dishes.map((dish) => {
                    return (
                            <Card>
                            <Box style={{ display: 'flex' ,flexDirection:'columns', width:"100%", height:"100%"}}>
                            <CardContent style={{display: 'grid' ,gridTemplateRows:'repeat(2,30px)'}}>
                                <Typography component="div" variant="h5">
                                   {dish.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                   Price: {dish.dishPrice} $
                                </Typography>
                                <Typography style ={{height:"20px"}}variant="subtitle1" color="text.secondary" component="div">
                                   {dish.description}
                                </Typography>
                                <Button onClick={()=>cardOnClickHandler(dish)} variant="contained">Add to Cart</Button>
                            </CardContent>
                            <CardMedia style={{marginLeft:"auto"}}
                                component="img"
                                sx={{ width: 151 }}
                                image={dish.dishImg}
                                alt="Dish Image"
                            />
                            </Box>  
                        </Card>
                     ) 

            })}
        </div>

        <Dialog
        onClose={handleWarningClose}
        aria-labelledby="customized-dialog-title"
        open={openWarning}>
          <div style={{display:"flex", flexDirection:"row"}}>
        <DialogTitle id="customized-dialog-title" onClose={handleWarningClose}>
          Create new order?
        </DialogTitle>
        <IconButton style={{marginLeft:"auto"}} onClick={handleWarningClose}><CloseIcon /></IconButton></div>
        <DialogContent dividers>
        <Typography gutterBottom>
            Your order contains items from {cartState.restaurant.name}. Create a new order to add items from {restaurant.name}.
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button varient='contained' 
            onClick={(e)=>{
                e.preventDefault()
                handleWarningClose()
        }} style={{backgroundColor:"black", color:"white"}}>Cancel</Button>
        <Button varient='contained' 
            onClick={(e)=>{
                e.preventDefault()
                dispatch(resetCart())
                dispatch(addDishToCart({dishId: warningDish, quantity:1}))
                handleWarningClose()
        }} style={{backgroundColor:"black", color:"white"}}>New Order</Button>
        </DialogActions>
      </Dialog>
       </div>
    )
}