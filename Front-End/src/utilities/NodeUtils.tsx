import NodeData from "./NodeData"

class NodeUtils {
    // Returns a list containing:
    // [newNodes, newEdges]
    parseNodesData(nodesData: NodeData[]) {
        const nodes: any[] = []
        const edges: any[] = []

        nodesData.forEach((nodeData: NodeData) => {
            const [newNode, newEdges]: any = this._parseNodeData(nodeData)
            nodes.push(newNode)
            newEdges.forEach((newEdge: any) => edges.push(newEdge))            
        })

        return [nodes, edges]
    }

    // Returns a list containing:
    // [newNode, newEdges[]]
    private _parseNodeData(nodeData: NodeData) {
        return [
            {
                id: nodeData.nodeId,
                data: nodeData.data ? nodeData.data : {label: nodeData.name},
                position: nodeData.position
            },
            nodeData.relationships.map((target: string) => {
                return {
                    id: nodeData.nodeId + '->' + target,
                    source: nodeData.nodeId,
                    target: target
                }
            })
        ]
    }

    parseToData(nodes: any, edges: any) {
        // Find all the edges corresponding to nodes
        const nodeEdges: any = {}
        nodes.forEach((node: any) => nodeEdges[node.id] = [])
        edges.forEach((edge: any) => nodeEdges[edge.source].push(edge.target))
        
        // Final parse
        const nodesData: NodeData[] = nodes.map((node: any): NodeData => {
            return {
                nodeId: node.id,
                name: node.data.label,
                data: node.data,
                position: node.position,
                relationships: nodeEdges[node.id]
            }
        })

        return nodesData
    }
}

export default NodeUtils