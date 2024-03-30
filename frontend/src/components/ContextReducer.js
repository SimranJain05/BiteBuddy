// import React, { createContext, useContext, useReducer } from 'react'

// const CartState = createContext();
// const CardDispatch = createContext();

// const reducer = (state,action) => {
//     switch(action.type){
//         case "ADD" :
//             return [...state,{id:action.id , name: action.name , qty : action.qty ,  size: action.size, price : action.price, img : action.img}]

//         case "REMOVE":
//             let newArr = [...state]
//             newArr.splice(action.index,1)
//             return newArr;

//         case "DROP" :
//             let empArray = []
//             return empArray;

//         case "UPDATE":
//             let arr = [...state]
//             arr.find((food,index)=>{
//                 if(food.id === action.id){
//                     console.log(food.qty, parseInt(action.qty),action.price + food.price)
//                     arr[index] = {...food,qty: parseInt(action.qty) + food.qty, price:action.price + food.price}
//                 }
//                 return arr;
//             })
//             return arr;

//         default:
//             console.log("Error in Reducer")
//     }
// }
// export const CartProvider = ({children}) => {

//     const[state, dispatch] = useReducer(reducer, [])
//     return(
//         <CardDispatch.Provider value={dispatch}>
//             <CartState.Provider value={state}>
//                 {children}
//             </CartState.Provider>
//         </CardDispatch.Provider>
//     )
// }

// export  const useCart = ()=> useContext(CartState);
// export const useDispatch = () => useContext(CardDispatch);

import React, { createContext, useContext, useReducer } from "react";

// Create context for cart state and dispatch
const CartState = createContext();
const CardDispatch = createContext();

// Define reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Add new item to the cart
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      // Remove item from cart based on index
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      // Empty the cart
      return [];

    case "UPDATE":
      // Update quantity and price of the item with matching ID and size
      return state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          return {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: parseInt(action.price) + parseInt(food.price),
          };
        }
        return food;
      });

    default:
      console.log("Error in Reducer");
      return state;
  }
};

// Cart provider component to wrap the application
export const CartProvider = ({ children }) => {
  // UseReducer hook to manage state and dispatch actions
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CardDispatch.Provider value={dispatch}>
      <CartState.Provider value={state}>{children}</CartState.Provider>
    </CardDispatch.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => useContext(CartState);

// Custom hook to access cart dispatch function
export const useDispatch = () => useContext(CardDispatch);
