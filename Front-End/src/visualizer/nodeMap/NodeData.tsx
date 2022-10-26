interface NodePosition{
    x: number,
    y: number
}

interface data{
    label: string,
    icon: string
}

interface NodeData{
    nodeId: string,
    name: string,
    type: 'custom',
    data: data | null,
    position: NodePosition | null,
    relationships: string[]
}

export default NodeData;