import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Card, CardBody } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../../hooks/UserContext';
import Body from '../../components/Body/Body';

export default function Register() {

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState(0);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// State to determine whether submit button is enable or not
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if ((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {

			setIsActive(true)

		} else {

			setIsActive(false)

		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword])

	function registerUser(e) {
		// Prevents the page redirection via form submission
		e.preventDefault();

		fetch(`https://capstone2-8wse.onrender.com/b6/users/register`, {

			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})

		})
			.then(res => res.json())
			.then(data => {
				if (data.message === "Registered Successfully") {
					setFirstName("");
					setLastName("");
					setEmail("");
					setMobileNo("");
					setPassword("");
					setConfirmPassword("");

					Swal.fire({
						title: "Registration successful",
						icon: "success",
						text: "You are now registered."
					})
					navigate("/login");
				} else if (data.message === "Email Invalid") {
					Swal.fire({
						title: "Email is invalid",
						icon: "error",
						text: "Please enter a valid email"
					})
				} else if (data.message === "Mobile number invalid") {
					Swal.fire({
						title: "Mobile number is invalid",
						icon: "error",
						text: "Mobile Number must be 11 digits"
					})
				} else if (data.message === "Password must be atleast 8 characters") {
					Swal.fire({
						title: "Password is invalid",
						icon: "error",
						text: "Password must be at least 8 characters"
					})
				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please Contact the administrator"
					})
				}
			})
	}

	return (
		(user.id !== null && user.id !== undefined) ?
			<Navigate to="/login" />
			:
			<>
				<Body title={"Register"}>
					<Form onSubmit={(e) => registerUser(e)}>
						<Form.Group>
							<Form.Label>First Name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter First Name"
								required
								value={firstName}
								onChange={e => { setFirstName(e.target.value) }}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Last Name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Last Name"
								required
								value={lastName}
								onChange={e => { setLastName(e.target.value) }}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Email"
								required
								value={email}
								onChange={e => { setEmail(e.target.value) }}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Mobile No:</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter 11 Digit No."
								required
								value={mobileNo}
								onChange={e => { setMobileNo(e.target.value) }}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								required
								value={password}
								onChange={e => { setPassword(e.target.value) }}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								required
								value={confirmPassword}
								onChange={e => { setConfirmPassword(e.target.value) }}
							/>
						</Form.Group>
						{/*conditionally render submit button based on isActive state*/}
						{isActive ?
							<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
							:
							<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
						}
					</Form>
				</Body>
			</>

	)

}