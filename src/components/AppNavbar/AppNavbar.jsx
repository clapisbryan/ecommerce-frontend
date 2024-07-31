import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import UserContext from '../../hooks/UserContext';


const AppNavbar = () => {
	const { user } = useContext(UserContext);

	return (
		<>
			<Navbar expand="lg" className={`${user.isAdmin ? "bg-primary" : "bg-body-tertiary"}`}>
				<Container>
					<Navbar.Brand href="#home" className={`${user.isAdmin && "text-light"}`}>Ecommerce</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-light' />
					<Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
						<Nav className="">
							<Nav.Link as={NavLink} to="/" exact="true" className={`${user.isAdmin && "text-light"}`}>Home</Nav.Link>
							<Nav.Link as={NavLink} to="/products" exact="true" className={`${user.isAdmin && "text-light"}`}>Products</Nav.Link>
							{user.id ?
								<>
									<Nav.Link as={NavLink} to="/profile" exact="true" className={`${user.isAdmin && "text-light"}`}>Profile</Nav.Link>

									{user.isAdmin ?
										<>
											<Nav.Link as={NavLink} to="/admin" exact="true" className={`${user.isAdmin && "text-light"}`}>Admin</Nav.Link>
											<Nav.Link as={NavLink} to="/all-orders" exact="true" className={`${user.isAdmin && "text-light"}`}>Orders</Nav.Link>
										</> :
										<>
											<Nav.Link as={NavLink} to="/cart-view" exact="true" className={`${user.isAdmin && "text-light"}`}>Cart</Nav.Link>
											<Nav.Link as={NavLink} to="/orders" exact="true" className={`${user.isAdmin && "text-light"}`}>Orders</Nav.Link>
										</>
									}
									<Nav.Link as={NavLink} to="/logout" exact="true" className={`${user.isAdmin && "text-light"}`}>Logout</Nav.Link>
								</>
								:
								<>
									<Nav.Link as={NavLink} to="/register" exact="true" className={`${user.isAdmin && "text-light"}`}>Register</Nav.Link>
									<Nav.Link as={NavLink} to="/login" exact="true" className={`${user.isAdmin && "text-light"}`}>Login</Nav.Link>
								</>
							}


						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default AppNavbar
