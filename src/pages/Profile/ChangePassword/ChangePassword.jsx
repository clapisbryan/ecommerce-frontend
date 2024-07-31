// import React, { useState, useContext } from 'react'
// import { Button, Form, Modal } from 'react-bootstrap';
// import UserContext from '../../../hooks/UserContext';

// const ChangePassword = () => {
// 	const { user } = useContext(UserContext);
// 	const [modalShow, setModalShow] = useState(false);

// 	const [newPassword, setNewPassword] = useState('');
// 	const [confirmPassword, setConfirmPassword] = useState('');


// 	const handleOnProceed = (e) => {
// 		e.preventDefault();
// 	}

// 	return (
// 		<>
// 			<Button variant='primary' size='md' className='mx-1' onClick={() => setModalShow(true)}>Change Password</Button>
// 			<Modal
// 				show={modalShow}
// 				onHide={() => setModalShow(false)}
// 				size="md"
// 				aria-labelledby="contained-modal-title-vcenter"
// 				centered
// 			>
// 				<Modal.Header closeButton>
// 					<Modal.Title id="contained-modal-title-vcenter">
// 						Change Password
// 					</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<Form>
// 						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
// 							<Form.Label>New Password</Form.Label>
// 							<Form.Control type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
// 						</Form.Group>
// 						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
// 							<Form.Label>Confirm Password</Form.Label>
// 							<Form.Control type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
// 						</Form.Group>
// 					</Form>
// 				</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
// 					<Button variant="primary" onClick={handleOnProceed}>PROCEED</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</>
// 	)
// }

// export default ChangePassword

import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UserContext from '../../../hooks/UserContext';
import Swal from 'sweetalert2';

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnProceed = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch',
        text: 'The new password and confirmation password do not match.'
      });
      return;
    }

    try {
      const response = await fetch(`https://capstone2-8wse.onrender.com/b6/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ newPassword })
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: data.message
        });
        setModalShow(false); // Close the modal on success
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Password',
          text: errorData.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update password. Please try again later.'
      });
    }
  };

  return (
    <>
      <Button variant='primary' size='md' className='mx-1' onClick={() => setModalShow(true)}>Change Password</Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleOnProceed}>Proceed</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePassword;
