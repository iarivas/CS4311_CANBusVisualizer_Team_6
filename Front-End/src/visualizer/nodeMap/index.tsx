import { useCallback } from 'react'
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
  } from 'reactflow'
import CustomEdgeState from './CustomEdgeState'
import CustomNode from './CustomNode'
import CustomNodeState from './CustomNodeState'
import './index.css'

interface Props {
    initialNodes: CustomNodeState[]
    initialEdges: CustomEdgeState[]
}

function NodeMap({
        initialNodes,
        initialEdges
    }: Props) {
    const onInit = (reactFlowInstance: any) => console.log('flow loaded: ', reactFlowInstance)

    const nodeTypes = {
        custom: CustomNode,
    }

    const minimapStyle = {
        height: 120
    }

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);    

    return (
        <div className='node-map-container rounded'>
            <div className='node-map-container-inner'>
                <h3>CAN Bus Map</h3>
            </div>
            <div className='node-map rounded'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition='top-right'
                nodeTypes={nodeTypes}
            >
                <Background color='#fff'/>
            </ReactFlow>
            </div>
        </div>
    )
}

export default NodeMap