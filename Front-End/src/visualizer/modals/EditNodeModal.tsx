import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Node } from 'react-flow-renderer';
import CustomNodeData from '../nodeMap/CustomNodeData';

interface Props {
  isShow: boolean,
  setHide: (() => void),
  onApply: ((node: Node<CustomNodeData>) => void),
  node: Node<CustomNodeData>
}

function EditNodeModal({
  isShow,
  setHide,
  onApply,
  node
}: Props) {

  const [nodeBeingEdited, setNodeBeingEdited] = useState<Node<CustomNodeData>>()

  useEffect(() => {
    setNodeBeingEdited(node) 
  }, [node])
    
  const dropdownOptions = {
    ac: '../images/ac.png',
    engine: '../images/engine.png',
    brake: '../images/brake.png',
    wheel: '../images/steering_wheel.png',
  }

  return (
    <Modal show={isShow} onHide={setHide} className='edit-node-modal' onSubmit={(e: any) => {
      e.preventDefault()
      onApply(nodeBeingEdited!)
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Node</Modal.Title>
      </Modal.Header>
      <Form>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="node-name">
            <Form.Label className='label'>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={nodeBeingEdited?.data?.label}
                onChange={(e) => {
                  setNodeBeingEdited({...nodeBeingEdited!, data: {
                    label: e.target.value,
                    isBlacklisted: nodeBeingEdited!.data.isBlacklisted,
                    icon: nodeBeingEdited!.data.icon
                  }})
                }}
                autoFocus
              />
            </Form.Group>

          <Form.Group className="mb-3" controlId="node-icon">
            <Form.Label className='label'>Icon</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={nodeBeingEdited?.data.icon}
              onChange={(e) => {
                setNodeBeingEdited({...nodeBeingEdited!, data: {
                  label: nodeBeingEdited!.data.label,
                  isBlacklisted: nodeBeingEdited!.data.isBlacklisted,
                  icon: e.target!.value
                }})
              }
            }>
              <option value='../images/ac.png'>../images/ac.png</option>
              <option value='../images/engine.png'>../images/engine.png</option>
              <option value='../images/brake.png'>../images/brake.png</option>
              <option value='../images/steering_wheel.png'>../images/steering_wheel.png</option>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={setHide} className='rounded-pill'>
          Close
        </Button>
        <Button variant="primary" onClick={setHide} className='rounded-pill' type="submit">
          Apply
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}

  export default EditNodeModal;