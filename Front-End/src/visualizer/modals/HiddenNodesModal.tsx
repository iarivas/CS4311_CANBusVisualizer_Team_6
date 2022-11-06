import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Node } from 'react-flow-renderer';
import CustomNodeData from '../nodeMap/CustomNodeData';

interface Props {
    isShown: boolean,
    onHide: (() => void),
    nodes: Node<CustomNodeData>[]
}

function HideNodesModal({
    isShown,
    onHide,
    nodes
}: Props) {
    const options: {value: string, label: string}[] = nodes.map((node) => {
        return {value: node.id, label: node.data?.label}
    })

    const [currSelected, setCurrSelected] = useState<string[]>([])

    const onSelected = (selected: any[]) => {
        setCurrSelected(selected)
    }

    useEffect(() => {
        const toSelect: string[] = []
        nodes.forEach((node) => {
            if (node.data.hidden) toSelect.push(node.id)
        })
        setCurrSelected(toSelect)
    }, [isShown])

    return (
        <Modal onHide={onHide} show={isShown} className='hide-nodes-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Hide Nodes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DualListBox
                    canFilter
                    options={options}
                    selected={currSelected}
                    onChange={onSelected}
                />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onHide} className='rounded-pill'>
                Close
            </Button>
            <Button variant="primary" onClick={() => {}} className='rounded-pill'>
                Apply
            </Button>
            </Modal.Footer>
      </Modal>
  );
}
export default HideNodesModal