import { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import Body from '../../components/Body/Body';
import UserContext from '../../hooks/UserContext';
import AddToCart from './AddToCart/AddToCart';

export default function ProductView() {
	const { productId } = useParams();
	const { user } = useContext(UserContext);
	// an object with methods to redirect the user
	const navigate = useNavigate();

	const [quantity, setQuantity] = useState(0);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [result, setResult] = useState([]);

	useEffect(() => {
		fetch(`https://capstone2-8wse.onrender.com/b6/products/${productId}`)
			.then(res => res.json())
			.then(data => {
				// const { name, price, description } = data;
				setName(data.product.name);
				setPrice(data.product.price);
				setDescription(data.product.description);
				setResult(data.product);
			})

	}, []);

	return (
		<>
			<Body title={"Product Details"}>
				<Row>
					<Col lg={{ span: 8, offset: 2 }}>
						<Card>
							<Card.Body className="text-center">
								<Card.Title>{name}</Card.Title>
								<Card.Text>{description}</Card.Text>
								<Card.Subtitle>₱{price}</Card.Subtitle>
								{user.id && !user.isAdmin &&
									<AddToCart items={result} />
								}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Body>
		</>
	)

}

