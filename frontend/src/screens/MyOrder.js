import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("https://bite-buddy-api.vercel.app/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        {orderData !== {} &&
          Array(orderData).map((data) =>
            data.orderData ? (
              data.orderData.order_data
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <div key={index} className="mb-3">
                    {item[0]?.Order_date && (
                      <div className="fs-3 mt-5">{item[0].Order_date}</div>
                    )}
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                      {item.map(
                        (arrayData, innerIndex) =>
                          // Render the cards only if it's not the first item in the array (which is the date)
                          innerIndex !== 0 && (
                            <div className="col" key={arrayData.id}>
                              <div className="card h-120">
                                <img
                                  src={arrayData.img}
                                  className="card-img-top"
                                  alt="..."
                                  style={{
                                    height: "130px",
                                    objectFit: "fill",
                                  }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {arrayData.name}
                                  </h5>
                                  <div className="container w-100 p-0">
                                    <span className="m-1">{arrayData.qty}</span>
                                    <span className="m-1">
                                      {arrayData.size}
                                    </span>
                                    <span className="m-1">
                                      {arrayData.Order_date}
                                    </span>
                                    <div className="d-inline ms-2 fs-5">
                                      ₹{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div className="fs-2 m-5">
                No order placed, visit Home page to place orders !
              </div>
            )
          )}
      </div>
    </div>
  );
}
