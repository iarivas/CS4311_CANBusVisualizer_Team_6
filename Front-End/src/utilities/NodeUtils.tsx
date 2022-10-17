import { Position } from "react-flow-renderer"

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
                id: nodeData.id,
                data: nodeData.data,
                position: nodeData.position
            },
            edges: nodeData.relationships.map((target: string) => {
                return {
                    id: nodeData.id + '->' + target,
                    source: nodeData.id,
                    target: target
                }
            })
        }
    }

    parseToData(nodes: any, edges: any) {
        // Find all the edges corresponding to nodes
        const nodeEdges: any = {}
        nodes.forEach((node: any) => nodeEdges[node.id] = [])
        edges.forEach((edge: any) => nodeEdges[edge.source].push(edge.target))
        
        // Final parse
        const nodesData = nodes.map((node: any) => {
            return {
                'id': node.id,
                data: node.data,
                position: node.position,
                relationships: nodeEdges[node.id]
            }
        })

        return nodesData
    }
}

export default NodeUtils