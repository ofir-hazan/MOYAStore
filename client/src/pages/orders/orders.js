import React, { useState } from "react";
import "./orders.css";
import Order from "../../Components/Order/Order";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import { ReactComponent as CartIcon } from "../../resources/cart.svg";
import { Link } from "react-router-dom";

function OrdersPage(props) {
  const { onAdd } = props;
  const [clickedOrder, setClickedOrder] = useState();

  const orders = [
    {
      id: 1,
      date: "22/01/2022",
      totalPrice: 201,
      products: [
        {
          _id: "b6d2a6b3-8d2b-462a-921e-6309e1cafa9a",
          name: "Apple",
          description: "A round sweet or sour fruit",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg",
          price: 2.5,
          categoryId: "b556e6df-aae4-4be0-a992-ff969a8f8180",
          supplierId: "322542184",
          quantity: 75,
        },
        {
          _id: "8f7d6e2d-43b5-4adc-a5e3-3b1fd16e7203",
          name: "Orange",
          description: "A round orange fruit",
          image:
            "https://media.istockphoto.com/photos/orange-isolated-on-white-background-clipping-path-full-depth-of-field-picture-id1194662606?b=1&k=20&m=1194662606&s=612x612&w=0&h=DvfBPLWeRoRrA3pM1f65lToWRo5C7KITybGt401WOP8=",
          price: 3.9,
          categoryId: "b556e6df-aae4-4be0-a992-ff969a8f8180",
          supplierId: "322542184",
          quantity: 20,
        },
      ],
    },
    {
      id: 2,
      date: "27/01/2022",
      totalPrice: 105,
      products: [
        {
          _id: "b6d2a6b3-8d2b-462a-921e-6309e1cafa9a",
          name: "Apple",
          description: "A round sweet or sour fruit",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg",
          price: 2.5,
          categoryId: "b556e6df-aae4-4be0-a992-ff969a8f8180",
          supplierId: "322542184",
          quantity: 20,
        },
        {
          _id: "8f7d6e2d-43b5-4adc-a5e3-3b1fd16e7203",
          name: "Orange",
          description: "A round orange fruit",
          image:
            "https://media.istockphoto.com/photos/orange-isolated-on-white-background-clipping-path-full-depth-of-field-picture-id1194662606?b=1&k=20&m=1194662606&s=612x612&w=0&h=DvfBPLWeRoRrA3pM1f65lToWRo5C7KITybGt401WOP8=",
          price: 3.9,
          categoryId: "b556e6df-aae4-4be0-a992-ff969a8f8180",
          supplierId: "322542184",
          quantity: 51,
        },
      ],
    },
  ];

  function renderOrders() {
    return orders.map((order) => (
      <Order key={order.id} order={order} setClickedOrder={setClickedOrder} />
    ));
  }
  return (
    <div className="products">
      {clickedOrder ? (
        <OrderDetails order={clickedOrder} setClickedOrder={setClickedOrder} />
      ) : (
        <>
          <div className="productsHeader">
            <div className="productsTitle">ההזמנות שלי</div>
          </div>
          <div className="productsList">
            {orders?.length ? (
              <> {renderOrders()}</>
            ) : (
              <div className="catalogNoProducts">אין הזמנות ישנות!</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
