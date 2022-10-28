import { Modal, Button, Table } from 'react-bootstrap'
import PacketState from '../packetContainer/PacketState'

interface Props {
    isShown: boolean,
    onHide: (() => void),
    packets: PacketState[],
    clear: (() => void),
}

function ReplayPacketModal({
    isShown,
    onHide,
    packets,
    clear,
    }: Props) {

    const packetDisplay = () => {
        return packets.map((packet) => {
            return (
                <tr
                    key={packet._id}
                >
                    <td>{packet.timestamp}</td>
                    <td>{packet.nodeId}</td>
                    <td>{packet.type}</td>
                    <td>{packet.data}</td>
                </tr>
            )
        })
    }

    return (
        <Modal show={isShown} onHide={onHide} className='packet-view-modal'>
            <Modal.Body>
            <Modal.Title>Replay Packets</Modal.Title>
            <br />
                <Button className='rounded-pill' size='sm' onClick={clear}>Clear list</Button>
                <br />
                <br />
                <Table variant='dark' hover size='sm'>
                    <thead>
                        <tr>
                            <th className='packet-time'>Time</th>
                            <th className='packet-id'>Id</th>
                            <th className='packet-type'>Type</th>
                            <th className='packet-data'>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packetDisplay()}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    size='sm' className='rounded-pill'
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReplayPacketModal