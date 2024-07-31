import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Body from '../../components/Body/Body';

const OrderHistory = () => {
  const [order, setOrder] = useState(null);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(`https://capstone2-8wse.onrender.com/b6/orders/my-orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.orders && typeof data.orders === 'object' && !Array.isArray(data.orders)) {
          setOrder(data.orders);
          fetchProductDetails(data.orders.productsOrdered);
        } else {
          console.error('Unexpected data structure:', data);
          setOrder(null);
        }
      } else {
        console.error('Error fetching orders:', response.statusText);
        setOrder(null);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch orders. Please try again later.'
      });
    }
  };

  const fetchProductDetails = async (productsOrdered) => {
    const productIds = productsOrdered.map(product => product.productId);
    const uniqueProductIds = [...new Set(productIds)];

    try {
      const productDetailsMap = {};
      for (const productId of uniqueProductIds) {
        const response = await fetch(`https://capstone2-8wse.onrender.com/b6/products/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const productData = await response.json();
          productDetailsMap[productId] = productData.product;
        } else {
          console.error(`Failed to fetch product details for productId ${productId}`);
        }
      }
      setProductDetails(productDetailsMap);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
      <Body title={"Order History"}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order ? (
              order.productsOrdered.map((product) => (
                <tr key={product._id}>
                  <td>{order._id}</td>
                  <td>{productDetails[product.productId] ? productDetails[product.productId].name : 'Loading...'}</td>
                  <td>{productDetails[product.productId] ? productDetails[product.productId].description : 'Loading...'}</td>
                  <td>{product.quantity}</td>
                  <td>{product.subtotal}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Body>
    </div>
  );
};

export default OrderHistory;