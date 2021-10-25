/* eslint-disable */
import axiosInstance from '../../config/axiosConfig';
export function createCart(payload) {
    return { type: 'CREATE_CART', payload };
  }
  
export function addDishToCart(payload) {
    return (dispatch)=>{
      axiosInstance.put(`/customers/${payload.custId}/cart/${payload.dishId._id}`, payload)
        .then((data)=>{
          console.log('success') 
        }).catch(error=>console.log(error))
      dispatch({ type: 'ADD_TO_CART', payload });
    }
  }
  
export function updateDishQuantity(payload) {
    return (dispatch)=>{
      console.log('payload display')
      console.log(payload)
      axiosInstance.put(`/customers/${payload.custId}/updatecart`, payload)
      .then((data)=>{
        console.log(data) 
      }).catch(error=>console.log(error))
      dispatch({type: 'UPADATE_DISH_QUANTITY', payload })
    }
  }

export function addRestaurantDetailsToCart(payload) {
    return { type: 'ADD_RESTAURANT_DETAILS_TO_CART', payload };
  }

export function resetCart(payload) {
  return (dispatch)=>{
    axiosInstance.delete(`/customers/${payload.custId}/deletecart`)
    .then((data)=>{
      dispatch({ type: 'RESET_CART'}) 
    }).catch(error=>console.log(error))
  }
  }

export function setCartReduxFromDB(payload) {
  return (dispatch)=>{
    axiosInstance.get(`/customers/${payload.custId}/cart/`, payload)
      .then((data)=>{
        console.log('in cartreduxfrmdb')
        // console.log(data)
        var cartData = data.data.cartItems
        console.log(cartData)
        if(cartData.restId && cartData.dishes.length>0){
          dispatch({ type: 'SET_CART_FROM_DB', cartData });
        }
      }).catch(error=>console.log(error))
    
  }
    // return { type: 'SET_CART_FROM_DB', payload};
  }