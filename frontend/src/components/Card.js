import React, {useEffect, useRef, useState} from "react";
import { useDispatch , useCart } from "./ContextReducer";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card(props) {
  // const [isTruncated, setIsTruncated] = useState(true);

  // const toggleTruncate = () => {
  //   setIsTruncated(!isTruncated);
  // };

  let dispatch = useDispatch();
  let data = useCart()
  const priceRef = useRef()
  let options = props.options
  let priceOptions = Object.keys(options)
  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")

  // const handleAddToCart = async () => {

  //   let food =[]
  //   for(const item of data){
  //     if(item.id === props.foodItem._id){
  //       food = item
  //       break;
  //     }
  //   }
  //   if (food) { 
  //     if (food.size === size) {
  //       await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
  //       toast.success('Item added to cart');
  //       return;
  //     } else if (food.size !== size) {
  //       await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty: qty, size: size });
  //       toast.success('Item added to cart');
  //       return;
  //     }
  //     toast.success('Item added to cart');
  //     return;
  //   }
  //   toast.success('Item added to cart');
  //   await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty: qty, size: size });
    

  // }
  const handleAddToCart = async () => {
    let existingItem = data.find(item => item.id === props.foodItem._id && item.size === size);
  
    if (existingItem) {
      // If the item with the same ID and size exists, update its quantity and price
      await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, size: size });
    } else {
      // If the item doesn't exist, add it to the cart
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, img: props.foodItem.img, qty: qty, size: size });
    }
  
    toast.success('Item added to cart');
  }
  

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  } , [])

  return (
    <div>
     
      <div>
        <div className="card mt-3" style={{ "width" : "16rem" , "maxHeight" : "420px"}}>
          <img style={{height:"120px", objectFit:"fill"}}src={props.foodItem.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            {/* <p className="card-text" style={{ overflow: "hidden", whiteSpace: isTruncated ? "nowrap" : "pre-wrap", textOverflow: "clip" }} onClick={toggleTruncate}>
              {props.foodItem.description}
            </p> */}
            <div className="container w-100 p-0">
              <select className="m-1 h-100 bg-success rounded " onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(10), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-1 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                  priceOptions.map((data) => {
                    return <option key={data} value={data}>{data}</option>;
                  })
                }
              </select>

              <div className='d-inline h-100 fs-5'>
                {finalPrice}/-
              </div>

              <hr />
              <div className="btn btn-success justify-center ms-5" onClick={handleAddToCart} > Add to Cart </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
