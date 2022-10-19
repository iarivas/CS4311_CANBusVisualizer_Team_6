import ReactFlow, {
    Controls
} from 'react-flow-renderer';
import './index.css'
import React, { useCallback, useState, useRef } from "react";


function NodeMap({
    edges,
    nodes,
    onNodesChange,
    onEdgesChange,
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
                >
                    <Controls>   </Controls>
                </ReactFlow>
            </div>
        </div>
    );
}

export default NodeMap