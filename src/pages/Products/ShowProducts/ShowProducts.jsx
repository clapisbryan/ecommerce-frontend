import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard';
import { Col, Row } from 'react-bootstrap';

const ShowProducts = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        fetch(`https://capstone2-8wse.onrender.com/b6/products/active`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                if (typeof data.message !== "string") {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }

            });

    }, []);

    return (
        <>
            {products.length === 0 && <h4 className='my-5'>No products yet</h4>}
            <Row>
                {
                    products.map(product => {
                        return (
                            <Col md={3} key={product._id}>
                                <ProductCard product={product} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default ShowProducts
