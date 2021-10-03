/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import RestaurantHome from '../images/RestaurantHome.jpg'

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <AppBar/>
      <img style={{width:"100%", height:"100%"}} src={RestaurantHome}/>
    </div>
  );
}
