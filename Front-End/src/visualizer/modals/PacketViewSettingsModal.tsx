import { InputGroup, Row, Col, Modal, Form, Button} from 'react-bootstrap'
import { PacketSortOptions as Sort} from '../../common/Constants'
import { useState } from 'react'
import PacketViewSettingsState from './PacketViewSettingsState'

function PacketViewSettingsModal({
        isShown,
        setHide,
        packetViewSettings,
        onApply
    }: any) {

    let [newPacketViewSettings, setNewPacketViewSettings] = useState<PacketViewSettingsState>({
        before: packetViewSettings.current.before,
        after: packetViewSettings.current.after,
        node: packetViewSettings.current.node,
        sort: packetViewSettings.current.sort
    })

    return (
        <Modal show={isShown} onHide={setHide} className='packet-view-modal'>
            <Modal.Header>
                <Modal.Title>Packet View Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    onApply(newPacketViewSettings)
                    setHide()
                }}>
                    <div className='packet-sort'>
                        <h5>Order</h5>
                        <InputGroup className="mb-3" size='sm'>
                            <InputGroup.Text id="basic-addon1">Sort by:</InputGroup.Text>
                            <Form.Select
                                size='sm'
                                value={newPacketViewSettings.sort}
                                onChange={(e) => setNewPacketViewSettings({...newPacketViewSettings, sort: e.target.value})}
                            >
                                <option value={Sort.TIME_DESC}>Time (Newest)</option>
                                <option value={Sort.TIME_ASC}>Time (Oldest)</option>
                                <option value={Sort.ID_ASC}>Node ID (Increasing)</option>
                                <option value={Sort.ID_DESC}>Node ID (Decreasing)</option>
                            </Form.Select>
                        </InputGroup>
                    </div>
                    <br />
                    <div className='packet-filter'>
                        <h5>Filters</h5>
                        <Row>
                            <Col>
                                <InputGroup className='mb-3' size='sm'>
                                    <InputGroup.Text id='basic-addon2'>After:</InputGroup.Text>
                                    <Form.Control
                                        size='sm'
                                        placeholder={'2022-10-10T01:30:55.950000'}
                                        value={newPacketViewSettings.after}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setNewPacketViewSettings({...newPacketViewSettings, after: value === '' ? undefined : value})
                                        }}
                                        pattern={'([0-9]{4})-([0-9]{2}-[0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]{1,})?'}
                                        title={'yyyy-mm-ddThh:mm:ss[.ms]'}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className='mb-3' size='sm'>
                                    <InputGroup.Text id='basic-addon3'>Before:</InputGroup.Text>
                                    <Form.Control
                                        size='sm'
                                        placeholder={'2022-10-10T14:30:55.950000'}
                                        value={newPacketViewSettings.before}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setNewPacketViewSettings({...newPacketViewSettings, before: value === '' ? undefined : value})
                                        }}
                                        pattern={'([0-9]{4})-([0-9]{2}-[0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(.[0-9]{1,})?'}
                                        title={'yyyy-mm-ddThh:mm:ss.ms'}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <InputGroup className='mb-3' size='sm'>
                            <InputGroup.Text id='basic-addon4'>Node:</InputGroup.Text>
                            <Form.Control
                                size='sm'
                                placeholder={'18F0010B'}
                                value={newPacketViewSettings.node}
                                onChange={(e) =>{
                                    const value = e.target.value
                                    setNewPacketViewSettings({...newPacketViewSettings, node: value === '' ? undefined : value})
                                }}
                            />
                        </InputGroup>
                    </div>
                    <br />
                    <Button variant="secondary" size='sm' className='rounded-pill' onClick={setHide}>
                        Close
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button variant="primary" type="submit" size='sm' className='rounded-pill'>
                        Apply
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default PacketViewSettingsModal