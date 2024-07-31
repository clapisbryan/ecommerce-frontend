import Reac, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';


const AddNewProduct = ({ fetchData }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)
	const [isActive, setIsActive] = useState('')

	const handleCreateProduct = (e) => {
		e.preventDefault();
		fetch(`https://capstone2-8wse.onrender.com/b6/products/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				isActive: isActive,
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data) {
					Swal.fire({
						title: "Product Created",
						icon: "success",
						text: "Product was successful created"
					})
					fetchData();
					setShow(false);
					setName('');
					setDescription('');
					setPrice('');
					setIsActive('');
				} else {
					Swal.fire({
						title: "Error!",
						icon: "error",
						text: `Access Forbidden`
					})
					setShow(false);
					setName('');
					setDescription('');
					setPrice('');
					setIsActive('');

				}
			})

	}

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Add New Product
			</Button>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Add New Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Name</Form.Label>
							<Form.Control type="email" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Description</Form.Label>
							<Form.Control type="email" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Price</Form.Label>
							<Form.Control type="email" placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
						</Form.Group>
						<Form.Group >
							<Form.Label>Status</Form.Label>
							<Form.Select aria-label="Product activation" value={isActive} onChange={(e) => setIsActive(e.target.value)}>
								{isActive === '' &&
									<option>Select product status</option>
								}
								<option value="1">Active</option>
								<option value="0">Deactivate</option>
							</Form.Select>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleCreateProduct}>
						Create
					</Button>
				</Modal.Footer>
			</Modal >
		</>
	)
}

export default AddNewProduct
