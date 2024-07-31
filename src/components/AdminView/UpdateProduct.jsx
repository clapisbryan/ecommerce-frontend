import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateProduct = ({ item, fetchData }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    const [loading, setLoading] = useState(false);

    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`https://ecommerce-backend-7aob.onrender.com/products/${item._id}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, description, price })
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            if (data.message === 'Product updated successfully') {
                Swal.fire('Success!', 'Product updated successfully', 'success');
                fetchData(); // Refresh the product list
                closeEdit(); // Close the modal
            } else {
                Swal.fire('Error!', 'Failed to update product', 'error');
            }
        })
        .catch(error => {
            setLoading(false);
            Swal.fire('Error!', 'Network error. Please try again later.', 'error');
            console.error('Error:', error);
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={openEdit}>Update</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number"
                                step="0.01"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateProduct;
