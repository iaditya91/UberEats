/* eslint-disable */
import React,{useState} from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import {
//   HeaderNavigation,
//   ALIGN,
//   StyledNavigationList,
//   StyledNavigationItem,
// } from 'baseui/header-navigation';
// import { StyledLink } from 'baseui/link';
import { Button } from 'baseui/button';
import { List, Drawer,ListItem } from '@mui/material';

// import { FormControl } from 'baseui/form-control';
// import { useStyletron } from 'baseui';
// import { useHistory } from 'react-router';
import {
  Navbar, Nav, FormControl, Form, ListGroupItem,
} from 'react-bootstrap';
import uberlogo from '../images/ubereats.svg';
import { logoutCustomer } from '../reducers/actions/customer';
import { logoutRestaurant } from '../reducers/actions/restaurant';
// import uberlogo from '../images/uberlogo.jpeg';

export default function AppBarPrimary() {
  // const [css] = useStyletron();
  const history = useHistory();
  const [toggleDraw, setToggleDraw] = useState(false)
  const dispatch = useDispatch()
  const hist = useHistory()
  const Custtoken= useSelector(state=>state.customer);
  const Resttoken= useSelector(state=>state.restaurant);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setToggleDraw(open);
  };

  const logoutHandler = ()=>{
    dispatch(logoutRestaurant());
    dispatch(logoutCustomer());    
    hist.push('/')
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
        <ListItem><Link to="/register/restaurant">Register Restaurant</Link></ListItem>
        <ListItem><Link to="/restaurants/update">Update Restaurant</Link></ListItem>
        <ListItem><Link to="/login/restaurant">Login Restaurant</Link></ListItem>
        
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

          <Nav.Link href="/login/customer">Login</Nav.Link>
          <Nav.Link href="/register/customer">Register</Nav.Link>
          <Nav.Link href="#action2">Cart</Nav.Link>
          {(Custtoken.token || Resttoken.token)&&<Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
        </Nav>
        
        
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
