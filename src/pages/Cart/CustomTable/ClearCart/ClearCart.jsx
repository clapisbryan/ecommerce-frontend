import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

const ClearCart = ({ fetchData }) => {
	const [modalShow, setModalShow] = useState(false);

	const handleOnProceed = () => {
		fetch(`https://capstone2-8wse.onrender.com/b6/cart/clear-cart`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data) {
					Swal.fire({
						title: "Success",
						icon: 'success',
						text: 'Cart successfully cleared'
					})
					setModalShow(false)
					fetchData()
				} else {
					Swal.fire({
						title: "Error!",
						icon: 'error',
						text: 'Please try again later'
					})
					setModalShow(false)
				}
			})
	}
	return (
		<>
			<Button variant='secondary' onClick={() => setModalShow(true)}>Clear Cart</Button >

			<Modal
				show={modalShow}
				onHide={() => setModalShow(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Clear Cart
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to clear cart?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
					<Button variant="primary" onClick={handleOnProceed}>PROCEED</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ClearCart
