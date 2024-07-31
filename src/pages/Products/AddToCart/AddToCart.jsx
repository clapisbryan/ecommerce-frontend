import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddToCart = ({ items }) => {
	const navigate = useNavigate();
	const [modalShow, setModalShow] = useState(false);

	const [quantity, setQuantity] = useState(1);
	const [invalidPrice, setInvalidPrice] = useState(false);

	const handleAddToCart = () => {
		let token = localStorage.getItem('token');

		const totalPrice = items.price * quantity;

		const requestData = {
			cartItems: [
				{
					productId: items._id,
					quantity: quantity,
					subtotal: totalPrice
				}
			],
			totalPrice: totalPrice
		};

		if (totalPrice == 0) {
			setInvalidPrice(true);
		} else {
			fetch(`https://capstone2-8wse.onrender.com/b6/cart/add-to-cart`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}` // Replace with actual JWT token
				},
				body: JSON.stringify(requestData)
			})
				.then(res => res.json())
				.then(data => {

					if (data) {
						Swal.fire({
							title: "Success",
							icon: "success",
							text: "Product added to cart successfully"
						})
						setModalShow(false)
						navigate('/cart-view');
					} else {
						Swal.fire({
							title: "Error!",
							icon: "error",
							text: "Error adding item to cart"
						})
					}
				})

		}
	}
	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				Add To Cart
			</Button>

			<Modal
				size="md"
				aria-labelledby="add-to-cart-modal"
				centered
				show={modalShow}
				onHide={() => setModalShow(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title id="add-to-cart-modal">
						Cart
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h2>{items.name}</h2>
					<p>Description: {items.description}</p>
					<p className='m-0'>Price: ₱{items.price * quantity}</p>
					{
						invalidPrice &&
						<p className='text-danger fs-6'>Please provide price</p>
					}
					<label htmlFor="quantity" className='me-3'>Quantity:</label>
					<input
						id="quantity"
						type="number"
						min="1"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleAddToCart}>Add to Cart</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AddToCart
