import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoMatch = () => {
	return (
		<div>
			<Row>
				<Col className="mt-5 pt-5 text-center mx-auto">
					<div className="d-flex flex-column align-items-center justify-content-center">
						<h1>404</h1>
						<span>Page not found</span>
						<p>Unfortunately the page you are looking for does not exist or has been moved or deleted.</p>
						<Link to="/" className='btn btn-primary rounded'>Return to Home</Link>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default NoMatch
