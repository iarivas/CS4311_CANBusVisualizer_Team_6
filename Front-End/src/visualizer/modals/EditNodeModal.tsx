import { useEffect, useRef, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Node } from 'react-flow-renderer';
import { FlagOptions } from '../../common/Constants';
import CustomNodeData from '../nodeMap/CustomNodeData';
import APIUtil from '../../utilities/APIutils'
import { List } from 'react-bootstrap-icons';


interface Props {
  imageOptions: never[],
  updateImagesMethod: Function,
  isShow: boolean,
  setHide: (() => void),
  onApply: ((node: Node<CustomNodeData>) => void),
  node: Node<CustomNodeData>
  
}

function EditNodeModal({
  imageOptions,
  updateImagesMethod,
  isShow,
  setHide,
  onApply,
  node
}: Props) {
  
  const defaultNodeInfo = useRef<Node<CustomNodeData>>({
    id: '',
    type: 'custom',
    data: {
      label: '',
      icon: 'ovhenvwzeet61ejetsxv',
      isBlacklisted: false,
      hidden: false,
      annotation: '',
      flag: 'none'
    },
    position: {
      x: 0,
      y: 0
    },
    hidden: false,
  })

  const [nodeBeingEdited, setNodeBeingEdited] = useState<Node<CustomNodeData>>(defaultNodeInfo.current)

  useEffect(() => {
    updateImagesMethod()
    setNodeBeingEdited(node ?? defaultNodeInfo.current) 
  }, [isShow])

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

  return (
    <Modal show={isShow} onHide={setHide} className='edit-node-modal' onSubmit={(e: any) => {
      e.preventDefault()
      onApply(nodeBeingEdited!)
    }}>
      <Modal.Header closeButton>
        <Modal.Title>{node ? 'Edit Node' : 'Create Node'}</Modal.Title>
      </Modal.Header>
      <Form>
      <Modal.Body>
        {
          node ? 
          undefined : (
          <Form.Group className="mb-3" controlId="node-id">
              <Form.Label className='node-id'>ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="12345678"
                  value={nodeBeingEdited?.id}
                  onChange={(e) => {
                    setNodeBeingEdited({...nodeBeingEdited!, id: e.target.value})
                  }}
                  autoFocus
                />
            </Form.Group>)
          }
          <Form.Group className="mb-3" controlId="node-name">
            <Form.Label className='label'>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Node name"
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
                  {imageOptions.map((value) => 
                    <option value={value['_id']}>{value['fileName']}</option>)
                  }
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
                placeholder='Notes'
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
        <Button variant="primary" className='rounded-pill' type="submit">
          Apply
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}

  export default EditNodeModal;