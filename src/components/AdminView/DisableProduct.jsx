import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DisableProduct = ({ item, isActive, fetchData }) => {
    const handleToggle = () => {
        const action = isActive ? 'archive' : 'activate';

        fetch(`https://capstone2-8wse.onrender.com/b6/products/${item._id}/${action}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === `Product ${action}d successfully`) {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: `Product ${action}d successfully`
                });
                fetchData(); // Refresh the product list
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: `Failed to ${action} product`
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Network error. Please try again later.'
            });
            console.error('Error:', error);
        });
    };

    return (
        <Button 
            variant={isActive ? 'danger' : 'success'} 
            size="sm" 
            onClick={handleToggle}
        >
            {isActive ? 'Disable' : 'Activate'}
        </Button>
    );
};

export default DisableProduct;
