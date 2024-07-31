import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Body from '../../components/Body/Body';
import CustomTable from './CustomTable/CustomTable';
import ProductCard from '../../components/ProductCard/ProductCard';
import Action from './Actions/Action';
import UpdateProduct from '../../components/AdminView/UpdateProduct';

const AdminDashboard = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    retrieveProducts();
  }, [])

  const retrieveProducts = () => {
    fetch(`https://ecommerce-backend-7aob.onrender.com/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setResult(data.products)
        } else {
          setResult([])
        }
      })
  }

  return (
    <>
      <Body title={"Admin Dashboard"}>
        <div className="my-3">
          <Action fetchData={retrieveProducts} />
        </div>
        {/* <Row className='mt-5'>
          {result.map((product) => {
            return (
              <Col sm={12} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            )
          })}
        </Row> */}
        <CustomTable items={result} fetchData={retrieveProducts} />
      </Body>
    </>
  )
}

export default AdminDashboard
