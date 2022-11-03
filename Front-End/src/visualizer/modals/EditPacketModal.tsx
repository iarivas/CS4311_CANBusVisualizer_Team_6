import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PacketState from '../packetContainer/PacketState';

interface Props {
  isShown: boolean,
  onHide: (() => void),
  packetInFocus: PacketState | undefined
}

function EditPacketModal({isShown, onHide, packetInFocus}: Props) {
  const [packetInEditing, setPacketInEditing] = useState<PacketState | undefined>(packetInFocus)

  useEffect(() => {
    setPacketInEditing(packetInFocus)
  }, [packetInFocus])

  return (
      <Modal show={isShown} onHide={onHide} className='edit-packet-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Packet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="time">
              <Form.Label className='label'>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={packetInEditing?.timestamp}
                onChange = {(e) => {
                  setPacketInEditing({...packetInEditing!, timestamp: e.target!.value})
                }}
                autoFocus
                pattern={'([0-9]{4})-([0-9]{2}-[0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]{1,})?'}
                title={'yyyy-mm-ddThh:mm:ss[.ms]'}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="id"
            >
  
              <Form.Label className='label'>ID</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                value={packetInEditing?.nodeId}
                onChange = {(e) => {
                  setPacketInEditing({...packetInEditing!, nodeId: e.target!.value})
                }}
                autoFocus
               />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="type"
            >
              <Form.Label className='label'>Type</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                value={packetInEditing?.type}
                onChange = {(e) => {
                  setPacketInEditing({...packetInEditing!, type: e.target!.value})
                }}
                autoFocus
               />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="data"
            >
              <Form.Label className='label'>Data</Form.Label>
              <Form.Control 
                type='text' 
                placeholder='' 
                value={packetInEditing?.data}
                onChange = {(e) => {
                  setPacketInEditing({...packetInEditing!, data: e.target!.value})
                }}
                autoFocus
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} className='rounded-pill'>
            Close
          </Button>
          <Button variant="primary" onClick={onHide} className='rounded-pill'>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
export default EditPacketModal