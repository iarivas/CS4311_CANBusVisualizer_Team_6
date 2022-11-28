import ReactFlow, {
    Controls
} from 'react-flow-renderer';
import './index.css'
import React, { useCallback, useState, useRef } from "react";
import CustomNode from './customNode'
import DownloadButton from '../../components/DownloadButton';

const nodeTypes = { custom: CustomNode};


function NodeMap({
    edges,
    nodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeContextMenu
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
                    onNodeContextMenu={onNodeContextMenu}
                    nodeTypes={nodeTypes}
                    onEdgesDelete={(edges) => {}}
                >
                    <Controls>   </Controls>
                </ReactFlow>
            </div>
        </div>
    );
}

export default NodeMap