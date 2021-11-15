/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Grid} from '@material-ui/core';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHistory } from 'react-router';

// const custId = 1
const useStyles = makeStyles((theme)=>({
    container:{
        margin: "30px 30px",
    }
})
)

export default function CustomerFavourtes() {
    const hist = useHistory()
    const classes = useStyles()
    const [favRest, setFavRest] = useState([])
    var custId = null;
    const token =  sessionStorage.getItem('token');
    if(token){
        (async() =>{
            var decoded = await jwt_decode(token);
            custId = decoded.id
        })()
    }

  useEffect(() => {
    axiosInstance.get(`customers/favourites/${custId}`)
        .then((data)=>{
            setFavRest(data.data.favRests)
        }).catch(error=>console.log(error))
  }, [])

  console.log('this is favrest:')
  console.log(favRest)


  return (
    <div>
      <AppBar/>
      <div className={classes.container}>
      <Typography  component="div" variant="h5">Recently Added</Typography>
      </div>

      <div style={{ marginLeft: "10px", display:"grid", gridGap:"10px",gridTemplateRows:"repeat(2,170px)",gridTemplateColumns:"repeat(auto-fill, 450px)"}}>
            {favRest.length>0 && favRest.map((rest) => {
                    return (
                            <Card onClick={()=>{hist.push(`/restaurantMain/${rest.restId._id}`)}}>
                            <Box style={{ display: 'flex' ,flexDirection:'columns', width:"100%", height:"100%"}}>

                            <CardContent style={{display: 'grid' ,gridTemplateRows:'repeat(2,30px)'}} >
                                <Typography style={{justifyContent:'center'}} component="div" variant="h5">
                                   {rest.restId.name}
                                </Typography>
                                <Typography style={{justifyContent:'center'}} variant="subtitle1" color="text.secondary" component="div">
                                   {rest.restId.description}
                                </Typography></CardContent>
                            
                                <CardMedia style={{marginLeft:"auto"}}
                                component="img"
                                sx={{ width: 151 }}
                                image={rest.restId.profileImg}
                                alt="Dish Image"
                            />
                            </Box>
                            
                        </Card>) 

            })}
        </div>
    </div>
  );
}