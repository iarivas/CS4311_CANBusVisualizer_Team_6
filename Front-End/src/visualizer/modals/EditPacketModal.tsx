import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function EditPacketModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
      <Modal onHide={handleClose} className='edit-packet-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Packet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Label className='label'>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="id"
            >
              <Form.Label>ID</Form.Label>
              <Form.Label className='label'>ID</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                autoFocus
               />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="type"
            >
              <Form.Label>Type</Form.Label>
              <Form.Label className='label'>Type</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                autoFocus
               />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="data"
            >
              <Form.Label>Data</Form.Label>
              <Form.Label className='label'>Data</Form.Label>
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
export default EditPacketModal