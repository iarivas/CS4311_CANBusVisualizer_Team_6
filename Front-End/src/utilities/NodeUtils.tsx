import { Edge, Node } from "react-flow-renderer"
import CustomNodeData from "../visualizer/nodeMap/CustomNodeData"
import NodeData from "./NodeData"
import { toPng, toJpeg, toSvg } from "html-to-image";
import download from "downloadjs";

class NodeUtils {
    // Returns a list containing:
    // [newNodes, newEdges]
    parseNodesData(nodesData: NodeData[]): [Node<CustomNodeData>[], Edge[]] {
        const nodes: Node<CustomNodeData>[] = []
        const edges: Edge[] = []
        const hiddenNodes = new Set()

        nodesData.forEach((nodeData: NodeData) => {
            const [newNode, newEdges]: any = this._parseNodeData(nodeData)
            if (newNode.hidden) {
                hiddenNodes.add(newNode.id)
            }
            nodes.push(newNode)
            newEdges.forEach((newEdge: any) => edges.push(newEdge))            
        })

        // Mark edges as hidden if applicable
        edges.forEach((edge) => {
            edge.hidden = hiddenNodes.has(edge.source) || hiddenNodes.has(edge.data)
        })

        return [nodes, edges]
    }

    // Returns a list containing:
    // [newNode, newEdges[]]
    private _parseNodeData(nodeData: NodeData) {
        return [
            {
                id: nodeData.nodeID,
                type: 'custom',
                data: {
                    label: nodeData.data?.label || nodeData.name,
                    icon: nodeData.data?.icon || '../images/engine.png',
                    isBlacklisted: nodeData.data?.isBlacklisted || nodeData.isBlacklisted,
                    annotation: nodeData.data?.annotation || '',
                    flag: nodeData.data?.flag || 'none',
                    hidden: nodeData.data?.hidden || false
                },
                hidden: nodeData.data?.hidden || false,
                position: nodeData.position
            },
            nodeData.relationships.map((target: string) => {
                return {
                    id: nodeData.nodeID+ '->' + target,
                    source: nodeData.nodeID,
                    target: target
                }
            })
        ]
    }

    parseToData(nodes: Node<CustomNodeData>[], edges: any, projectId: string) {
        // Find all the edges corresponding to nodes
        const nodeEdges: any = {}
        nodes.forEach((node: any) => nodeEdges[node.id] = [])
        edges.forEach((edge: any) => nodeEdges[edge.source].push(edge.target))
        
        // Final parse
        const nodesData: NodeData[] = nodes.map((node: any): NodeData => {
            return {
                projectId: projectId,
                nodeID: node.id,
                name: node.data.label,
                isBlacklisted: node.isBlacklisted,
                data: node.data,
                position: node.position,
                relationships: nodeEdges[node.id]
            }
        })

        return nodesData
    }
    mapToPng() {
        var map = document.getElementById('download-image') as HTMLElement
        toPng(map, {
            filter: (node) => {
                if(
                    node?.classList?.contains('react-flow__minimap') ||
                    node?.classList?.contains('react-flow__controls')
                ) {
                    return false
                }
                return true
            },
        }).then(function(dataUrl){
            download(dataUrl, 'nodeMap.png')
        });
    }
    mapToJpeg() {
        var map = document.getElementById('download-image') as HTMLElement
        toJpeg(map, {
            filter: (node) => {
                if(
                    node?.classList?.contains('react-flow__minimap') ||
                    node?.classList?.contains('react-flow__controls')
                ) {
                    return false
                }
                return true
            },
            quality: 0.95,
        }).then(function(dataUrl){
            download(dataUrl, 'nodeMap.jpeg')
        });
    }
}

export default NodeUtils