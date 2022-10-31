interface NodePosition {
    x: number,
    y: number
}

interface NodeData {
    isBlacklisted: boolean,
    projectId: string,
    nodeID: string,
    name: string,
    data: {
        label: string,
        icon: string,
    },
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