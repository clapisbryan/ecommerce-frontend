import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function ProductCard({product}) {

    const { _id, name, description, price} = product;
    const navigate = useNavigate();

    return (
        <Card className="my-3">
            <Card.Body className="text-center">
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>₱{price}</Card.Subtitle>            
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
                <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
            </Card.Footer>
        </Card>
        )
}
