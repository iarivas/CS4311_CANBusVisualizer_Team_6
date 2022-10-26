import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function CreateNodeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <Modal onHide={handleClose} className='create-node-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Create Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="name"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                autoFocus
               />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="position"
            >
              <Form.Label>X Position</Form.Label>
              <Form.Control 
                type='number' 
                placeholder='' 
                autoFocus
               />
              <Form.Label>Y Position</Form.Label>
              <Form.Control 
                type='number' 
                placeholder='' 
                autoFocus
               />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="icon"
            >
              <Form.Label>Icon</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                autoFocus
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='rounded-pill'>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} className='rounded-pill'>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CreateNodeModal