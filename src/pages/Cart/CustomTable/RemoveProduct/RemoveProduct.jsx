import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const RemoveProduct = ({ productId, fetchData }) => {
	const [modalShow, setModalShow] = useState(false);

	const handleOnProceed = () => {
		fetch(`https://ecommerce-backend-7aob.onrender.com/cart/${productId}/remove-from-cart`, {
			method: "PATCH",
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
						text: 'Product successfully remove from cart'
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
			<Button variant="danger" onClick={() => setModalShow(true)}>
				Remove
			</Button>

			<Modal
				show={modalShow}
				onHide={() => setModalShow(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Remove Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this product?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
					<Button variant="primary" onClick={handleOnProceed}>PROCEED</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default RemoveProduct
