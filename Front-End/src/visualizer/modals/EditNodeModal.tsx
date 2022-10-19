import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

function EditNodeModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dropdownOptions = {
      "car": "../images/car.png",
      "goatzilla": "../images/GOATZILLA.jpg",
      "goomba": "../images/goomba.png",
      "pb&j": "../images/PB&J.png"
    };

    return (
        <Modal show={true} onHide={handleClose} className='edit-node-modal'>
          <Modal.Header closeButton>
            <Modal.Title>Edit Node</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="node-name">
                <Form.Label className='label'>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="node-icon">
                <Form.Label className='label'>Icon</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="car">Car</option>
                  <option value="goatzilla">GOATZILLA</option>
                  <option value="goomba">Goomba</option>
                  <option value="pb&j">PB&J</option>
                </Form.Select>
              </Form.Group>



              <fieldset>
                <Form.Group className="mb-3" controlId="node-visability">
                  <Form.Label className='label'>Visability Status</Form.Label>
                  <Form.Check type='radio' label='Hidden' name="formHorizontalRadios" id="formHorizontalRadiosHidden"/>
                  <Form.Check type='radio' label='Visible' name="formHorizontalRadios" id="formHorizontalRadiosVisible"/>
                </Form.Group>
              </fieldset>

              <fieldset>
                <Form.Group
                  className="mb-3"
                  controlId="annotations"
                >
                  <Form.Label className='label'>Annotations</Form.Label>
                  <Form.Check 
                    type='radio' 
                    label='Black-List'
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                    <Form.Check 
                    type='radio' 
                    label='Alive'
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check 
                    type='radio' 
                    label='Scanned'
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                  <Form.Check 
                    type='radio' 
                    label='Enumerated'
                    name="formHorizontalRadios"
                    id="formHorizontalRadios4"
                  />
                  <Form.Check 
                    type='radio' 
                    label='DoSed'
                    name="formHorizontalRadios"
                    id="formHorizontalRadios5"
                  />
                  <br/>
                  <Form.Control as='textarea'
                    type='text'
                  />
                  <Form.Text className="text-muted">
                    Notes
                    </Form.Text>
                </Form.Group>
              </fieldset>
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

  export default EditNodeModal;