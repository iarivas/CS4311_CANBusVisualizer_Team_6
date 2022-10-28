import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'


function ReplayPacketModal({
    isShown,
    onHide,
    }: any) {

    return (
        <Modal show={isShown} onHide={onHide} className='packet-view-modal'>
            <Modal.Header>
                <Modal.Title>Replay Packets</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>Hello world</h1>
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