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
import uberlogo from '../images/ubereats.svg';
import { logoutCustomer } from '../reducers/actions/customer';
import { logoutRestaurant } from '../reducers/actions/restaurant';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect } from 'react';

export default function AppBarPrimary() {
  const [toggleDraw, setToggleDraw] = useState(false)
  const dispatch = useDispatch()
  const hist = useHistory()
  const Custtoken= useSelector(state=>state.customer);
  const Resttoken= useSelector(state=>state.restaurant);
  const [cart, setCart] = useState({});
  
  const [openCart, setOpenCart] = React.useState(false);
  const handleClickOpenCart = () => { setOpenCart(true);};
  const handleCloseCart = () => { setOpenCart(false); };
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
    hist.push('/')
  }

  const checkOutHandler =()=>{
    console.log('Checkout handler')
    hist.push('/orderCheckout')
  }

  return (
    <Navbar bg="light" expand="lg">
      {/* Drawer */}
      <Button  onClick={toggleDrawer('toggleDraw', true)}>
        Menu
      </Button>
    <Drawer
      anchor={'left'}
      open={toggleDraw}
      onClose={toggleDrawer('toggleDraw', false)}
    >
      <List>
     
        <ListItemButton><Link to="/login/restaurant">Restaurant Login</Link></ListItemButton>
        <ListItemButton><Link to="/register/restaurant">Register Your Restaurant</Link></ListItemButton>
        
        
      </List>
    </Drawer>

      <Navbar.Brand href="/">
        <img src={uberlogo} width="200px" alt="text" />
      </Navbar.Brand>
      <div style={{marginLeft:'auto'}}>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="mr-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>

          {(!Custtoken.token && !Resttoken.token)&&<Nav.Link href="/login/customer">Login</Nav.Link>}
          {(Custtoken.token)&&<Nav.Link onClick={()=>hist.push('/')}>Home</Nav.Link>}
          {(Custtoken.token)&&<Nav.Link onClick={()=>hist.push('/customerFavorites')}>Favourites</Nav.Link>}
          {(Custtoken.token)&&<Nav.Link onClick={()=>hist.push('/customer/update')}>Update Profile</Nav.Link>}
          {(Custtoken.token)&&<Nav.Link onClick={()=>hist.push('/viewOrders')}>View Orders</Nav.Link>}
          {(Resttoken.token)&&<Nav.Link onClick={()=>hist.push('/viewRestaurantOrders')}>View Orders</Nav.Link>}
          {(Custtoken.token)&&<Nav.Link onClick={handleClickOpenCart}>Cart</Nav.Link>}
          <Dialog
              open={openCart}
              onClose={handleCloseCart}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Cart"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              {/* <Box    component="form" 
                      sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                      noValidate
                      autoComplete="off"> */}
              <Box    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                          <form  >
                          <div>
                          {cart.length > 0  && cart.map((item) => {
                            return (
                               <div>
                                <Typography component="div" variant="h6">
                                   {item.name}
                                </Typography>
                                <Typography component="div" variant="subtitle1">
                                  Price: {item.dishPrice} $
                             </Typography>
                               </div>
                            )
                          })}
                          {/* <Typography component="div" variant="h5">Total: {totalSum}$</Typography> */}
                          </div>
                          <Button variant="contained" onClick={checkOutHandler}>Go To Checkout</Button>
                          </form>
              </Box>
              </DialogContentText>
          </DialogContent>
          </Dialog>
          {(Custtoken.token || Resttoken.token)&&<Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
        </Nav>
        
        
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
}