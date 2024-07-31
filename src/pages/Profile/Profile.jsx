import React, { useEffect, useState, useContext } from 'react'
import Body from '../../components/Body/Body'
import { Container, Button, Col, Form, Row } from 'react-bootstrap'
import ChangePassword from './ChangePassword/ChangePassword';
import UserContext from '../../hooks/UserContext';
import Swal from 'sweetalert2';

const Profile = () => {
	const { user } = useContext(UserContext);
    const [details,setDetails] = useState({});
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		// Get user details here
		fetch(`https://ecommerce-backend-7aob.onrender.com/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data !== undefined) {

                setDetails(data);
				setFirstName(data.user.firstName);
				setLastName(data.user.lastName);
				setEmail(data.user.email);
				setMobileNo(data.user.mobileNo);

            } else if (data.error === "User not found") {

                Swal.fire({
                    title: "User Not Found",
                    icon: "error",
                    text: "User not found, please check if you're logged in or contact the administrator."
                })

            } else {

                Swal.fire({
                    title: "Profile Error",
                    icon: "error",
                    text: "Something went wrong, kindly contact us for assistance."
                })

            }
        });
	}, [])

	const handleEdit = (e) => {
		e.preventDefault()
		setIsActive(false);
	}
	const handleUpdateProfile = (e) => {
		e.preventDefault()
		setIsActive(true);
		fetch(`https://ecommerce-backend-7aob.onrender.com/users/update-user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ firstName, lastName, email, mobileNo })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Successfully updated') {
                Swal.fire('Success!', 'User Details updated successfully', 'success');
            } else {
                Swal.fire('Error!', 'Failed to update user details', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error!', 'Network error. Please try again later.', 'error');
            console.error('Error:', error);
        });
	}


	return (
		<>	
			<Body title={"Profile"}>
				 <Container className="mt-3 p-3 text-blue">
	                <h1 className="mb-3 fw-bold text-center text-capitalized">{`WELCOME, ${details.user?.firstName}!`}</h1>
	            </Container>
				<div className="d-flex align-items-center justify-content-end" >
					{isActive ?
						<Button variant='primary' size='md' className='mx-1' onClick={handleEdit}>Edit</Button> :
						<Button variant='primary' size='md' className='mx-1' onClick={handleUpdateProfile}>Save</Button>
					}
				</div>
				<Form>
					<Row>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>First Name</Form.Label>
								<Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Email Address</Form.Label>
								<Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Mobile Number</Form.Label>
								<Form.Control type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} disabled={isActive} />
							</Form.Group>
						</Col>
						<Col sm={12} lg={4} className='d-flex align-items-end'>
							<div className="mb-3">
								<ChangePassword />
							</div>
						</Col>
					</Row>
				</Form>
			</Body>
		</>
	)
}

export default Profile
