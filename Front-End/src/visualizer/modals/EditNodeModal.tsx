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

  const flagRadios: {name: string, value: string | null}[] = [
    {name: 'None', value: FlagOptions.NONE},
    {name: 'Alive', value: FlagOptions.ALIVE},
    {name: 'Scanned', value: FlagOptions.SCANNED},
    {name: 'Enumerated', value: FlagOptions.ENUMERATED},
    {name: 'DoSed', value: FlagOptions.DOSED},
  ]

  const blacklistRadios: {name: string, value: string}[] = [
    {name: 'Off-limits', value: 'true'},
    {name: 'Accessible', value: 'false'},
  ]

  const hiddenRadios: {name: string, value: string}[] = [
    {name: 'Visible', value: 'visible'},
    {name: 'Hidden', value: 'hidden'},
  ]

  console.log('NODE:')
  console.log(nodeBeingEdited)

  console.log('NOTE:')
  console.log(nodeBeingEdited?.data.annotation)

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
              <Form.Label className='label'>Visibility</Form.Label>
              <br />
            <ButtonGroup>
                {hiddenRadios.map((radio, idx) => (
                  <ToggleButton
                    size='sm'
                    key={`visibility-radio-${idx}`}
                    id={`visibility-radio-${idx}`}
                    type="radio"
                    variant='dark'
                    name="visibility-radio"
                    value={radio.value}
                    checked={ nodeBeingEdited === undefined ? true :
                      (nodeBeingEdited!.data.hidden === true && radio.value === 'hidden') ||
                      (nodeBeingEdited!.data.hidden === false && radio.value === 'visible')
                    }
                    onChange={(e) => setNodeBeingEdited({...nodeBeingEdited!, data: {
                      ...nodeBeingEdited!.data,
                      hidden: e.currentTarget.value === 'hidden'
                    }}
                  )}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
          </fieldset>

          <fieldset>
            <Form.Group className="mb-3" controlId="node-blacklist">
              <Form.Label className='label'>Off-limits</Form.Label>
              <br />
            <ButtonGroup>
                {blacklistRadios.map((radio, idx) => (
                  <ToggleButton
                    size='sm'
                    key={`blacklist-radio-${idx}`}
                    id={`blacklist-radio-${idx}`}
                    type="radio"
                    variant='dark'
                    name="blacklist-radio"
                    value={radio.value}
                    checked={ nodeBeingEdited === undefined ? true :
                      (nodeBeingEdited!.data.isBlacklisted === true && radio.value === 'true') ||
                      (nodeBeingEdited!.data.isBlacklisted === false && radio.value === 'false')
                    }
                    onChange={(e) => setNodeBeingEdited({...nodeBeingEdited!, data: {
                      ...nodeBeingEdited!.data,
                      isBlacklisted: e.currentTarget.value === 'true'
                    }}
                  )}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
          </fieldset>

          <fieldset>
            <Form.Group
              className="mb-3"
              controlId="annotations"
            >
              <Form.Label className='label'>Annotations</Form.Label>
              <br />
              <ButtonGroup>
                {flagRadios.map((radio, idx) => (
                  <ToggleButton
                    size='sm'
                    key={`flag-radio-${idx}`}
                    id={`flag-radio-${idx}`}
                    type="radio"
                    variant='dark'
                    name="flag-radio"
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
                value={nodeBeingEdited?.data.annotation}
                onChange={(e) => setNodeBeingEdited({...nodeBeingEdited!, data: {
                  ...nodeBeingEdited!.data,
                  annotation: e.target.value
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