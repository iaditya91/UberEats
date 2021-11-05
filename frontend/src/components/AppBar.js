/* eslint-disable */
import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
// import { Button } from 'baseui/button';
import { List, Drawer,ListItem } from '@mui/material';
import {
  Navbar, Nav, FormControl, Form, ListGroupItem,
} from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import uberlogo from '../images/ubereats.svg';
import {setCartReduxFromDB} from '../reducers/actions/cartActions'
import { logoutCustomer } from '../reducers/actions/customer';
import { logoutRestaurant } from '../reducers/actions/restaurant';
import { setSearchQuery } from '../reducers/actions/searchAction'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { updateDishQuantity} from '../reducers/actions/cartActions'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import axiosInstance from '../config/axiosConfig';
import jwt_decode from 'jwt-decode';


export default function AppBarPrimary() {
  const [toggleDraw, setToggleDraw] = useState(false)
  const dispatch = useDispatch()
  const hist = useHistory()
  const [custId,setCustId] = useState()
  const [restId,setRestId] = useState()
  const Custtoken= useSelector(state=>state.customer);
  const Resttoken= useSelector(state=>state.restaurant);
  const [searchquery, setCurSearchQuery] = useState('')
  const [cart, setCart] = useState({});
  
  const [openCart, setOpenCart] = React.useState(false);

  useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(token){
        const decoded = jwt_decode(token);
        if(decoded.role=='customer'){
          // console.log('im here')
          dispatch(setCartReduxFromDB({custId:decoded.id}))
          setCustId(decoded.id)
        }
        else if(decoded.role == 'restaurant'){
          setRestId(decoded.id)
        }
      }
  }, [Custtoken.token, Resttoken.token])

  const handleClickOpenCart = () => { 
    axiosInstance.get(`/customers/${custId}/cart`)
        .then((data)=>{
          console.log(data);
        }).catch(error=>console.log(error))
    setOpenCart(true);
  };

  //cart close
  const handleCloseCart = () => { 
    setOpenCart(false);
    console.log('cart closed')
    // axiosInstance.post(`/customers/${custId}/cart`, cartState)
    //     .then((data)=>{
    //       console.log(data);
    //     }).catch(error=>console.log(error))

    console.log(cartState);
   };
  const cartState = useSelector(state=>state.cart)
  
  useEffect(() => {
      
      setCart(cartState.dishes)
  }, [cartState])


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setToggleDraw(open);
  };

  const logoutHandler = ()=>{
    dispatch(logoutRestaurant());
    dispatch(logoutCustomer());
    sessionStorage.clear('token');
    setRestId(null)
    setCustId(null)
    hist.push('/')
  }

  const checkOutHandler =()=>{
    console.log('Checkout handler')
    hist.push('/orderCheckout')
  }

  return (
    <Navbar bg="light" expand="lg">
      {/* Drawer */}
      <IconButton  onClick={toggleDrawer('toggleDraw', true)}>
        <MenuIcon/>
      </IconButton>
    <Drawer
      anchor={'left'}
      open={toggleDraw}
      onClose={toggleDrawer('toggleDraw', false)}
    >
      <List>
     
        <ListItemButton onClick={()=>hist.push('/login/restaurant')}><h6>Restaurant Login</h6></ListItemButton>
        <ListItemButton onClick={()=>hist.push('/register/restaurant')}><h6>Register Your Restaurant</h6></ListItemButton>
        
      </List>
    </Drawer>

      <Navbar.Brand href="/">
        <img style={{marginLeft: "20px"}}src={uberlogo} width="200px" alt="text" />
      </Navbar.Brand>
      <div style={{marginLeft:'auto'}}>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          
          {(!Resttoken.token)&&<Form className="d-flex">
            <FormControl type="search" placeholder="Search" onChange={(e)=>setCurSearchQuery(e.target.value)} className="mr-2" aria-label="Search" />
            <Button variant="outline-success" onClick={(e)=>{
              e.preventDefault();
              console.log("i'm in appbar "+searchquery)
              dispatch(setSearchQuery({searchquery}))
            }}>Search</Button>
          </Form>}

          {(!custId && !restId)&&<Nav.Link href="/login/customer">Login</Nav.Link>}
          {(custId)&&<Nav.Link onClick={()=>hist.push('/')}>Home</Nav.Link>}
              {(restId)&&<Nav.Link onClick={()=>hist.push('/restaurantAdmin')}>Home</Nav.Link>}
          {(custId)&&<Nav.Link onClick={()=>hist.push('/customerFavorites')}>Favourites</Nav.Link>}
          {(custId)&&<Nav.Link onClick={()=>hist.push('/customer/update')}>Update Profile</Nav.Link>}
          {(custId)&&<Nav.Link onClick={()=>hist.push('/viewOrders')}>View Orders</Nav.Link>}
          {(restId)&&<Nav.Link onClick={()=>hist.push('/viewRestaurantOrders')}>View Orders</Nav.Link>}
          {(custId)&&<Nav.Link onClick={handleClickOpenCart} style={{background:"black",borderRadius:"20px",color:"white",width:"60px"}}>Cart {cartState.dishes.length}</Nav.Link>}
          <Dialog
              open={openCart}
              onClose={handleCloseCart}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Cart"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <Box    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                          <form  >
                          <div>
                          {cart.length > 0  && cart.map((item) => {
                            return (
                               <div key={item.dish._id}>
                                <Typography component="div" variant="h6">
                                   {item.dish.name} 
                                </Typography>
                                <Typography component="div" variant="subtitle1">
                                  Price: {item.dish.dishPrice * item.quantity} $   
                                 <button onClick={(e)=>{
                                   e.preventDefault()
                                  //  console.log('-')
                                   dispatch(updateDishQuantity({custId, dishId: item.dish, quantity:item.quantity-1}))
                                   }}>-</button> {item.quantity}
                                   <button onClick={(e)=>{
                                     e.preventDefault()
                                    //  console.log('+')
                                     dispatch(updateDishQuantity({custId, dishId: item.dish, quantity:item.quantity+1}))
                                     }}>+</button>
                             </Typography>
                               </div>
                            )
                          })}
                          </div>
                          <Button variant="contained" onClick={checkOutHandler}>Go To Checkout</Button>
                          </form>
              </Box>
              </DialogContentText>
          </DialogContent>
          </Dialog>
          {(custId || restId)&&<Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
        </Nav>
        
        
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
}