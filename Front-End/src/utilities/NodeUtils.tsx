class NodeUtils {
    // Returns an object containing:
    // {nodes: [node, ...], edges: [edge, ...]}
    parseNodesData(nodesData: any) {
        const nodes: any[] = []
        const edges: any[] = []

        nodesData.forEach((nodeData: any) => {
            const parsedData: any = this._parseNodeData(nodeData)
            const newNode = parsedData.node
            const newEdges = parsedData.edges
            nodes.push(newNode)
            newEdges.map((newEdge: any) => edges.push(newEdge))            
        })

        return {nodes, edges}
    }

    // Returns a list containing:
    // {node: node, edges: [edge1, edge2, ...]}
    private _parseNodeData(nodeData: any) {
        return {
            node: {
                id: nodeData._id,
                data: nodeData.data,
                position: nodeData.position
            },
            edges: nodeData.relationships.map((target: string) => {
                return {
                    id: nodeData._id + '->' + target,
                    source: nodeData._id,
                    target: target
                }
            })
        }
    }
}

export default NodeUtils