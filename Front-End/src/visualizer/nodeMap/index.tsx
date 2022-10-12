import { useState } from 'react';
import DiagramWrapper from './DiagramWrapper'
import './index.css'


function NodeMap({
        nodeDataArray,
        linkDataArray,
        modelData,
        skipsDiagramUpdate,
        onDiagramEvent,
        onModelChange,
    }: any) {
    return (
        <div className='node-map-container rounded'>
            <div className='node-map-container-inner'>
                <h3>CAN Bus Map</h3>
            </div>
            <div className='node-map rounded'>
                    <DiagramWrapper
                    nodeDataArray={nodeDataArray}
                    linkDataArray={linkDataArray}
                    modelData={modelData}
                    skipsDiagramUpdate={skipsDiagramUpdate}
                    onDiagramEvent={onDiagramEvent}
                    onModelChange={onModelChange}
                />
            </div>
        </div>
    );
}

export default NodeMap