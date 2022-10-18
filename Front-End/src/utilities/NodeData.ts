interface NodePosition {
    x: number,
    y: number
}

interface NodeData {
    nodeId: string,
    data: any,
    position: NodePosition | null,
    relationships: string[]
}

// 'nodeId': '1234',
// 'data': {
//     'label': 'Window',
// },
// 'position': {'x': 200, 'y': 200},
// 'relationships': []

export default NodeData