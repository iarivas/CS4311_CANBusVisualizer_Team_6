import CustomNodeData from "../visualizer/nodeMap/CustomNodeData"

interface NodePosition {
    x: number,
    y: number
}

interface NodeData {
    isBlacklisted: boolean,
    projectId: string,
    nodeID: string,
    name: string,
    data: CustomNodeData | null,
    position: NodePosition | null,
    relationships: string[]
}

export default NodeData