import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProceedToCheckout = () => {
  const navigate = useNavigate();

  const handleProceedToCheckout = async () => {
    await fetch(`https://capstone2-8wse.onrender.com/b6/cart/get-cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization token if needed
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => res.json())
      .then(data => {
        createOrder(data)
      })
  }

  const createOrder = async (data) => {

    await fetch(`https://capstone2-8wse.onrender.com/b6/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        userId: data.userId,
        productsOrdered: data.cartItems,
        totalPrice: data.totalPrice
      })
    }).then(res => res.json())
      .then(data => {
        if (data.message === "Order already exists") {
          Swal.fire({
            icon: 'success',
            title: 'Order',
            text: `Order already exists`
          });
          navigate("/orders");
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Order Created Successfully!',
            text: `Order ID: ${data.orderId}`
          });
          navigate("/orders");
        }
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
  };


  return (
    <>
      <div className="text-end">
        <Button variant="dark" onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
      </div>
    </>
  );
};

export default ProceedToCheckout;
