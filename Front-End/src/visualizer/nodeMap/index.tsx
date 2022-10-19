import ReactFlow, {
    MiniMap,
    Controls,
} from 'react-flow-renderer';
import './index.css'

function NodeMap({
    edges,
    nodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    }: any) {
      
    return (
        <div className='node-map-container rounded'>
            <div className='node-map-container-inner'>
                <h3>CAN Bus Map</h3>
            </div>
            <div className='map-flow'>
                <ReactFlow
                    className='rounded'
                    edges={edges}
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    <Controls/>
                </ReactFlow>
            </div>
        </div>
    );
}

export default NodeMap