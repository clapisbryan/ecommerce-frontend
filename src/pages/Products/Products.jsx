import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Body from '../../components/Body/Body';
import UserContext from '../../hooks/UserContext';
import ShowProducts from './ShowProducts/ShowProducts';

export default function Products() {

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([]);


	useEffect(() => {
		fetch(`https://ecommerce-backend-7aob.onrender.com/products/active`, {
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
			{
				user
					?
					<>
						<Body title={"Our Products"}>
							{
								products.length > 0 ?
									<ShowProducts />
									:
									<>
										<h4 className='text-center'>Nothing to display</h4>
									</>
							}
						</Body>
					</>
					:
					<>
						<h1>You are not logged in</h1>
						<Link className="btn btn-primary" to={"/login"}>Login to View</Link>
					</>
			}
		</>
	)
}