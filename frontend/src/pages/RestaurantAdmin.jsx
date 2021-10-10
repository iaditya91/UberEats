/* eslint-disable */
import AppBar from '../components/AppBar'
import React,{useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Grid} from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axiosInstance from '../config/axiosConfig';
import RestaurantHome from '../images/RestaurantHome.jpg'
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import jwt_decode from 'jwt-decode';
import { uploadFile } from 'react-s3';
import {awsConf} from '../config/awsConfig';

const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1,
    },
    cardContainer: {
        width: '95vw',
        margin: '1rem auto'
    },
}));


{/* <div onClick={cardOnClickHandler}></div> */}
const dishCards = (dishes)=>{
    var rows =[]
    for (var i = 0; i < dishes.length; i++) {
        rows.push(
            <Grid item key={i} xs={4} >
                <Card sx={{ display: 'flex' }}>
                 <Box sx={{ display: 'flex' }}>
                 <CardContent sx={{ flex: '1 0 auto' }}>
                     <Typography component="div" variant="h5">
                        {dishes[i].name}
                     </Typography>
                     <Typography variant="subtitle1" color="text.secondary" component="div">
                        Price: {dishes[i].dishPrice} $
                     </Typography>
                     <Typography variant="subtitle1" color="text.secondary" component="div">
                        {dishes[i].description}
                     </Typography>
                 </CardContent>
                 <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
                 </Box>
             </Box>
             <CardMedia
                 component="img"
                 sx={{ width: 151 }}
                 image={dishes[i].dishImg}
                 alt="Dish Image"
             />
         </Card>
         </Grid>
         );
    }

    return  <Grid container spacing={4} direction="row">{rows} </Grid>;
}

export default function RestaurantAdmin(){
    const classes= useStyles()
    const [dishes,setDishes] = useState({})
    const [restaurant, setRestaurant] = useState({})
    const dishCardshtml= dishCards(dishes)
    const hist = useHistory()
    const [openUpdateMenu, setOpenUpdateMenu] = React.useState(false);
    const [openAddMenu, setOpenAddMenu] = React.useState(false);
    const [openDeleteMenu, setOpenDeleteMenu] = React.useState(false);
    const [updateDish, setUpdateDish] = React.useState({});
    const [addDish, setAddDish] = React.useState({});
    const [deleteDish, setDeleteDish] = React.useState({});

    const handleClickOpenUpdateMenu = () => { setOpenUpdateMenu(true);};
    const handleCloseUpdateMenu = () => { setOpenUpdateMenu(false); };

    const handleClickOpenAddMenu = () => { setOpenAddMenu(true);};
    const handleCloseAddMenu = () => { setOpenAddMenu(false); };

    const handleClickOpenDeleteMenu = () => { setOpenDeleteMenu(true);};
    const handleCloseDeleteMenu = () => { setOpenDeleteMenu(false); };

    const updateRestaurantHandler = ()=>{ hist.push('/restaurants/update')}
    // const deleteMenuHandler = ()=>{ hist.push('/')}

    const token = sessionStorage.getItem('token');
    const decoded = jwt_decode(token);
    const restId = decoded.id;

    const handleUpdateMenuChange = (event)=>{
        const {name, value}=event.target
        setUpdateDish({...updateDish,[name]: value});
    }
    const updateMenuHandler = async (event)=>{
        event.preventDefault();
        const dishId = dishes.filter(dish=>dish.name===updateDish.name)[0].dishId;
        
        
        for (var propName in updateDish) {
            if (updateDish[propName] === '' || updateDish[propName] === undefined) {
              delete updateDish[propName];
            }
          }
        console.log(updateDish);

        try {
            const response = await axiosInstance.put(`/restaurants/${restId}/dishes/${dishId}`, updateDish);
            console.log(response);
            window.location.reload(false);
          } catch (error) {
            console.log(error);
          }
    };

    const handleAddMenuChange = (event)=>{
        const {name, value}=event.target
        setAddDish({...addDish, [name]: value});
    }
    const addMenuHandler = async (event)=>{
        event.preventDefault();
        console.log(addDish)
        try {
            const response = await axiosInstance.post(`/restaurants/${restId}/dishes`, addDish);
            console.log(response);
            // hist.push('/restaurantAdmin');
            window.location.reload(false);
          } catch (error) {
            console.log(error);
          }
    };

    const handleDeleteMenuChange = (event)=>{
        const {name, value}=event.target
        setDeleteDish({...deleteDish,[name]: value});
    }
    const deleteMenuHandler = async (event)=>{
        event.preventDefault();
        // const token = sessionStorage.getItem('token');
        // const decoded = jwt_decode(token);
        // const restId = decoded.id;
        const dishId = dishes.filter(dish=>dish.name===deleteDish.name)[0].dishId
        try {
            const response = await axiosInstance.delete(`/restaurants/${restId}/dishes/${dishId}`);
            console.log(response);
            // hist.push('/restaurantAdmin');
            window.location.reload(false);
          } catch (error) {
            console.log(error);
          }
    };

    useEffect(async ()=> {
        // const token = sessionStorage.getItem('token');
        // const decoded = jwt_decode(token);
        // const restId = decoded.id;
        try {
            const response = await axiosInstance.get(`/restaurants/${restId}/dishes`);
            setDishes(response.data.dishes)
        } catch (error) {
        console.log(error);}
        },[]);

    useEffect(async ()=> {
            try {
                // const token = sessionStorage.getItem('token');
                // const decoded = jwt_decode(token);
                // const restId = decoded.id;
                const response = await axiosInstance.get(`/restaurants/${restId}`);
                setRestaurant(response.data.rest)
            } catch (error) {
            console.log(error);}
        },[]);

    return (
        <div>
        <AppBar/>

            <div>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            <img style={{width:"100%" ,height:300}} src={restaurant.profileImg} alt="This is image of restaurant"/>
                {/* <div style={{position:"absolute",right:"16px" ,top:"70px"}}> */}
                   
                <br/>
                {restaurant.name}<br/>
                Address: {restaurant.address}<br/>
                Description: {restaurant.description}<br/>
                 </Typography>         
            
        </div>
        <br/><br/>
        <Typography variant="h3" color="text.secondary" component="div">Menu</Typography>
        <div style={{marginTop: "20px", marginLeft:"20px", display:"grid", columnGap:"10px", gridTemplateColumns:"repeat(auto-fill,150px)", gridTemplateRows:"50px"}}>
        <Button variant="contained" style={{backgroundColor:"grey"}} onClick={updateRestaurantHandler}>Update Restaurant</Button>
                   <Button variant="contained" style={{backgroundColor:"grey"}} onClick={handleClickOpenUpdateMenu}>Update Menu</Button>
                        <Dialog
                            open={openUpdateMenu}
                            onClose={handleCloseUpdateMenu}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Update Menu"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <Box    component="form" 
                                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                                    noValidate
                                    autoComplete="off">
                                        <form  >
                                        <div>
                                            <TextField
                                              required
                                              name="name"
                                              id="outlined-required"
                                              label="Name"
                                              onChange={handleUpdateMenuChange}
                                            />
                                            <TextField
                                              name="description"
                                              id="outlined-disabled"
                                              label="Description"
                                              onChange={handleUpdateMenuChange}
                                            />
                                            <TextField
                                              name="dishPrice"
                                              id="outlined-required"
                                              label="Price"
                                              onChange={handleUpdateMenuChange}
                                            />
                                            <input
                                                type="file"
                                                name=""
                                                onChange={(e) => {
                                                  uploadFile(e.target.files[0], awsConf).then((data)=>{
                                                    setAddDish({...updateDish, dishImg: data.location})}).catch(error=>{console.log(error)})
                                                  }}
                                                placeholder="Restaurant Image"
                                                autoFocus
                                            />
                                            <TextField
                                                select
                                                name="dishType"
                                                id="category-select"
                                                value={updateDish.dishType}
                                                label="Dish Type"
                                                onChange={handleUpdateMenuChange}>
                                                <MenuItem value={"Veg"}>Veg</MenuItem>
                                                <MenuItem value={"NonVeg"}>NonVeg</MenuItem>
                                                <MenuItem value={"Vegan"}>Vegan</MenuItem>
                                            </TextField>
                                            <TextField
                                                select
                                                name="category"
                                                id="category-select"
                                                value={updateDish.category}
                                                label="Category"
                                                onChange={handleUpdateMenuChange}
                                            >
                                                <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
                                                <MenuItem value={"Salads"}>Salads</MenuItem>
                                                <MenuItem value={"Main Course"}>Main Course</MenuItem>
                                                <MenuItem value={"Desserts"}>Desserts</MenuItem>
                                                <MenuItem value={"Beverages"}>Beverages</MenuItem>
                                            </TextField>
                                        </div>
                                        <Button variant="contained" onClick={updateMenuHandler}>Update Menu</Button>
                                        </form>
                            </Box>
                            </DialogContentText>
                        </DialogContent>
                        </Dialog>

                    <Button variant="contained" style={{backgroundColor:"grey"}} onClick={handleClickOpenAddMenu}>Add Menu</Button>
                    <Dialog
                            open={openAddMenu}
                            onClose={handleCloseAddMenu}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Add Menu"}</DialogTitle>
                    <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <Box    component="form" 
                                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                                    noValidate
                                    autoComplete="off">
                                        <form>
                                        <div>
                                            <TextField
                                              required
                                              name="name"
                                              id="outlined-required"
                                              label="Name"
                                              onChange={handleAddMenuChange}
                                            />
                                            <TextField
                                              name="description"
                                              id="outlined-disabled"
                                              label="Description"
                                              onChange={handleAddMenuChange}
                                            />
                                            <TextField
                                              name="dishPrice"
                                              id="outlined-required"
                                              label="Price"
                                              onChange={handleAddMenuChange}
                                            />
                                            <input
                                                type="file"
                                                name=""
                                                onChange={(e) => {
                                                  uploadFile(e.target.files[0], awsConf).then((data)=>{
                                                    setAddDish({...addDish, dishImg: data.location})}).catch(error=>{console.log(error)})
                                                  }}
                                                placeholder="Restaurant Image"
                                                autoFocus
                                            />
                                            <TextField
                                                select
                                                name="dishType"
                                                id="category-select"
                                                value={addDish.dishType}
                                                label="Dish Type"
                                                onChange={handleAddMenuChange}>
                                                <MenuItem value={"Veg"}>Veg</MenuItem>
                                                <MenuItem value={"NonVeg"}>NonVeg</MenuItem>
                                                <MenuItem value={"Vegan"}>Vegan</MenuItem>
                                            </TextField>
                                            <TextField
                                                select
                                                name="category"
                                                id="category-select"
                                                value={addDish.category}
                                                label="Category"
                                                onChange={handleAddMenuChange}>
                                                <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
                                                <MenuItem value={"Salads"}>Salads</MenuItem>
                                                <MenuItem value={"Main Course"}>Main Course</MenuItem>
                                                <MenuItem value={"Desserts"}>Desserts</MenuItem>
                                                <MenuItem value={"Beverages"}>Beverages</MenuItem>
                                            </TextField>
                                        </div>
                                        <Button variant="contained" onClick={addMenuHandler}>Add Menu</Button>
                                        </form>
                            </Box>
                            </DialogContentText>
                        </DialogContent>
                        </Dialog>


                        <Button variant="contained" onClick={handleClickOpenDeleteMenu} style={{backgroundColor:"grey"}}>Delete Menu</Button>
                    <Dialog
                            open={openDeleteMenu}
                            onClose={handleCloseDeleteMenu}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                    <DialogTitle id="alert-dialog-title">{"Delete Menu"}</DialogTitle>
                    <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            <Box    component="form" 
                                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                                    noValidate
                                    autoComplete="off">
                                        <form  >
                                        <div>
                                            <TextField
                                              required
                                              name="name"
                                              id="outlined-required"
                                              label="Name"
                                              onChange={handleDeleteMenuChange}
                                            />
                                        </div>
                                        <Button variant="contained" onClick={deleteMenuHandler}>Delete Menu</Button>
                                        </form>
                            </Box>
                            </DialogContentText>
                        </DialogContent>
                        </Dialog>
                </div>
        <div style={{marginTop: "20px"}}>
            {dishCardshtml} 
        </div>
       </div>
    )
}