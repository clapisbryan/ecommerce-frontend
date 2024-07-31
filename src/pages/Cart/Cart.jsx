import React, { useEffect, useState } from 'react';
import Body from '../../components/Body/Body';
import CustomTable from './CustomTable/CustomTable';

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
		fetch(`https://capstone2-8wse.onrender.com/b6/products/active`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(data => {

				if (typeof data.message !== "string") {
					fetchCartData();
				} else {
					setIsEmpty(true);
				}

			});
	}, []);

	const fetchCartData = async () => {

		const response = await fetch(`https://capstone2-8wse.onrender.com/b6/cart/get-cart`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// Include authorization token if needed
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});
		if (response.ok) {
			const cartData = await response.json();
			setCart(cartData);
			setLoading(false);
		} else {
			setLoading(false);
		}
	};
	return (
		<>
			<Body title={"Cart View"}>
				{isEmpty && <p className='text-center my-5'>Nothing to display</p>}
				{!loading && cart && <CustomTable cart={cart} fetchData={fetchCartData} />}
				{!loading && !cart && <p>Please try to login as user to view a cart items</p>}
			</Body>
		</>
	)
}

export default Cart
