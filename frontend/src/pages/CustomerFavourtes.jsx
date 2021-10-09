/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Grid} from '@material-ui/core';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHistory } from 'react-router';

const custId = 1
const useStyles = makeStyles((theme)=>({
    container:{
        margin: "30px 30px",
    }
})
)

export default function CustomerFavourtes() {
    const hist = useHistory()
    const favRest = useSelector(state=> state.favourite)
    const classes = useStyles()
    // const [favRestaurants, setFavRestaurants] = useState([])
    console.log(favRest.favRestaurants)
    // setFavRestaurants(favRest.favRestaurants)


  return (
    <div>
      <AppBar/>
      <div className={classes.container}>
      <Typography  component="div" variant="h5">Recently Added</Typography>
      </div>

      <div>
            <Grid container spacing={4} direction="row">
            {favRest.favRestaurants.length > 0  && favRest.favRestaurants.map((rest) => {
                    return (
                          <Grid item key={rest.restId} xs={4} >
                            <Card onClick={()=>{hist.push(`/restaurantMain/${rest.restId}`)}} sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex' }}>

                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                   {rest.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                   {rest.description}
                                </Typography></CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
                            </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={rest.profileImg}
                                alt="Dish Image"
                            />
                        </Card>
                        </Grid>
                     ) 

            })}
            </Grid>
        </div>
    </div>
  );
}