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
            dispatch({ type: 'ADD_TO_CART', payload });
        }).catch(error=>console.log(error))
    }
  }
  
export function updateDishQuantity(payload) {
    return (dispatch)=>{
        console.log('payload display')
        console.log(payload)
        // if(payload.quantity<=0){
        //     axiosInstance.delete(`/customers/${payload.custId}/deleteitem/${payload.dishId._id}`)
        //         .then((data) => {
        //             console.log(data)
        //         }).catch(error => console.log(error))
        // }
        // else {
            axiosInstance.put(`/customers/${payload.custId}/updatecart`, payload)
                .then((data) => {
                    console.log(data)
                }).catch(error => console.log(error))
        // }
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

  export function resetAndAddToCart(payload) {
    return (dispatch)=>{
      axiosInstance.delete(`/customers/${payload.custId}/deletecart`)
          .then((res)=>{
              console.log('in res and add')
              console.log(res)
              axiosInstance.put(`/customers/${payload.custId}/cart/${payload.dishId._id}`, payload)
                .then((res)=>{
                  console.log(res)
                  dispatch({ type: 'RESET_AND_ADD_TO_CART', payload });
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
      
    }
  }