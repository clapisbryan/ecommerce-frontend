import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Body from '../../components/Body/Body';

const OrderHistoryAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`https://capstone2-8wse.onrender.com/b6/orders/all-orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        fetchProductDetails(data.orders);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed to Fetch Orders',
          text: errorData.message || 'Something went wrong. Please try again later.'
        });
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

  const fetchProductDetails = async (orders) => {
    const productIds = orders.flatMap(order => order.productsOrdered.map(product => product.productId));
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
      <Body title={"All Orders"}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Product Name(s)</th>
              <th>Product Description(s)</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                order.productsOrdered.map((product) => (
                  <tr key={product._id}>
                    <td>{order._id}</td>
                    <td>{order.userId}</td> {/* Adjusted for provided output */}
                    <td>{productDetails[product.productId] ? productDetails[product.productId].name : 'Loading...'}</td>
                    <td>{productDetails[product.productId] ? productDetails[product.productId].description : 'Loading...'}</td>
                    <td>{product.quantity}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              ))
            )}
          </tbody>
        </Table>
      </Body>
    </div>
  );
};

export default OrderHistoryAdmin;
