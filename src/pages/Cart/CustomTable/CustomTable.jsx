import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import RemoveProduct from './RemoveProduct/RemoveProduct';
import ProceedToCheckout from './ProceedToCheckout/ProceedToCheckout';
import ClearCart from './ClearCart/ClearCart';

const CustomTable = ({ cart, fetchData }) => {
	const [productDetails, setProductDetails] = useState({});
	const [quantities, setQuantities] = useState({});
	const [totalPrice, setTotalPrice] = useState(0);
	const [subTotal, setSubTotal] = useState(0);

	useEffect(() => {
		fetchProductDetails();
	}, [cart]);

	const fetchProductDetails = async () => {
		const productDetailsMap = {};
		const initialQuantities = {};
		for (const item of cart.cartItems) {
			const productId = item.productId;
			try {
				const response = await fetch(`https://capstone2-8wse.onrender.com/b6/products/${productId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				if (response.ok) {
					const productData = await response.json();
					productDetailsMap[productId] = productData.product;
					initialQuantities[productId] = item.quantity;
				} else {
					productDetailsMap[productId] = null;
				}
			} catch (error) {
				productDetailsMap[productId] = null;
			}
		}
		setProductDetails(productDetailsMap);
		setQuantities(initialQuantities);
		calculateTotalPrice(initialQuantities);
	};

	const handleQuantityChange = (productId, newQuantity) => {
		const newQuantities = { ...quantities, [productId]: newQuantity };
		setQuantities(newQuantities);
		calculateTotalPrice(newQuantities);
		calculateSubTotal(newQuantities);

		const requestBody = {
			cartItems: [
				{
					productId: productId,
					quantity: newQuantity,
					subtotal: newQuantity * (productDetails[productId]?.price || 0)
				}
			],
			totalPrice: calculateTotalPrice(newQuantities)
		};

		fetch(`https://capstone2-8wse.onrender.com/b6/cart/update-cart-quantity`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(requestBody)
		})
	};

	const calculateSubTotal = (quantities) => {
		let newSubTotal = 0;
		cart.cartItems.forEach((item) => {
			const productId = item.productId;
			const product = productDetails[productId];
			if (product && quantities[productId]) {
				newSubTotal += product.price * quantities[productId];
			}
		});
		setSubTotal(newSubTotal);
		return newSubTotal;
	};

	const calculateTotalPrice = (quantities) => {
		let newTotalPrice = 0;
		cart.cartItems.forEach((item) => {
			const productId = item.productId;
			const product = productDetails[productId];
			if (product && quantities[productId]) {
				newTotalPrice += product.price * quantities[productId];
			}
		});
		setTotalPrice(newTotalPrice);
		return newTotalPrice;
	};

	return (
		<>
			<Table striped bordered>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Sub Total</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{!cart || !cart.cartItems || cart.cartItems.length === 0 ? (
						<tr>
							<td colSpan={5}>
								<p className='text-center m-0 py-4'>Nothing to display</p>
							</td>
						</tr>
					) : (
						cart.cartItems.map((item) => (
							<tr key={item.productId}>
								<td>{productDetails[item.productId] ? productDetails[item.productId].name : 'Loading...'}</td>
								<td>{productDetails[item.productId] ? productDetails[item.productId].description : 'Loading...'}</td>
								<td>
									<input
										type="number"
										min="1"
										value={quantities[item.productId] || ''}
										onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
									/>
								</td>
								<td>{productDetails[item.productId] ? productDetails[item.productId].price : 'Loading...'}</td>
								<td>{totalPrice === 0 ? item.subtotal : subTotal}</td>
								<td className='text-end'>
									<RemoveProduct productId={item.productId} fetchData={fetchData} />
								</td>
							</tr>
						))
					)}
					{cart.cartItems.length !== 0 && (
						<tr>
							<td colSpan={4} className="text-end fw-bold">
								Total Price:
							</td>
							<td>{totalPrice === 0 ? cart.totalPrice : totalPrice}</td> {/* Display totalPrice here */}
							<td className='text-end'><ClearCart fetchData={fetchData} /></td>
						</tr>
					)}
				</tbody>
			</Table >

			{cart.cartItems.length !== 0 &&
				<ProceedToCheckout />
			}
		</>
	);
};

export default CustomTable;
