import { useState } from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
import { PlayFill, StopFill} from 'react-bootstrap-icons'
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

    const [idxToReplay, setIdxToReplay] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)

    const packetDisplay = () => {
        return packets.map((packet, idx) => {
            return (
                <tr
                    key={packet._id}
                    className={idx === idxToReplay ? 'selected-row' : 'non-selected-row'}
                    onClick={() => {
                        setIsPlaying(false)
                        setIdxToReplay(idx === idxToReplay ? -1 : idx)
                    }}
                >
                    <td>{packet.timestamp}</td>
                    <td>{packet.nodeId}</td>
                    <td>{packet.type}</td>
                    <td>{packet.data}</td>
                </tr>
            )
        })
    }

    const playButton = (
        <Button
            className='rounded-pill replay-packet-button'
            size='sm'
            variant='light'
            disabled={0 > idxToReplay || idxToReplay >= packets.length}
            onClick={() => {
                setIsPlaying(true)
            }}>
            <PlayFill/>&nbsp;Play
        </Button>
    )

    const stopButton = (
        <Button
            className='rounded-pill replay-packet-button'
            size='sm'
            variant='success'
            onClick={() => {
                setIsPlaying(false)
            }}>
            <StopFill/>&nbsp;Stop
        </Button>
    )

    return (
        <Modal show={isShown} onHide={onHide} className='packet-view-modal'>
            <Modal.Body>
            <Modal.Title>Replay Packets</Modal.Title>
            <br />
                <Button
                    className='rounded-pill replay-packet-button'
                    size='sm'
                    onClick={() => {
                        setIsPlaying(false)
                        clear()
                    }}>
                    Clear
                </Button>
                &nbsp;
                {isPlaying ? stopButton : playButton}
                <br />
                <br />
                <div className='replay-packet-table'>
                    <Table variant='dark' size='sm' className='replay-packet-table'>
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
                </div>
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