import { useEffect, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Node } from 'react-flow-renderer';
import { FlagOptions } from '../../common/Constants';
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

  const radios: {name: string, value: string | null}[] = [
    {name: 'None', value: FlagOptions.NONE},
    {name: 'Blacklist', value: FlagOptions.BLACKLIST},
    {name: 'Alive', value: FlagOptions.ALIVE},
    {name: 'Scanned', value: FlagOptions.SCANNED},
    {name: 'Enumerated', value: FlagOptions.ENUMERATED},
    {name: 'DoSed', value: FlagOptions.DOSED},
  ]

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
                    ...nodeBeingEdited!.data,
                    label: e.target.value
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
                  ...nodeBeingEdited!.data,
                  icon: e.target!.value,
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
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    size='sm'
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant='dark'
                    name="radio"
                    value={radio.value || 'none'}
                    checked={nodeBeingEdited?.data.flag === radio.value}
                    onChange={(e) => setNodeBeingEdited({...nodeBeingEdited!, data: {
                      ...nodeBeingEdited!.data,
                      flag: e.currentTarget.value
                    }}
                  )}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <br/>
              <br/>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                value={nodeBeingEdited?.data.notes}
                onChange={(e) => setNodeBeingEdited({...nodeBeingEdited!, data: {
                  ...nodeBeingEdited!.data,
                  notes: e.target.value
                }
              })}
              />
            </Form.Group>
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