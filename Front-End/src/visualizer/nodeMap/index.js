import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import './index.css'

import React, { useCallback, useState, useRef } from "react";

const initialNodes = [
{ id: '1', type: "input", data: { label: 'Node 1' }, position: { x: 100, y: 0 } },
{ id: '2', data: { label: 'Node 2' }, position: { x: 400, y: 100 } },
{ id: '3', data: { label: 'Node 3' }, position: { x: 150, y: 100 } },
{ id: '4', data: { label: 'Node 4' }, position: { x: 0, y: 200 } },
];

const initialEdges = [
{id: 'e1-2', source: '1', target: '2'}
]



function NodeMap({
 
  }) {
  const [els, setEls] = useState(initialNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const yPos = useRef(0);

  // setNodes(nodes.concat())

  const addNode = useCallback(() => {
      // yPos.current += 50;
      // setEls((els) => {
      //   console.log(els);
      //   return [
      //     ...els,
      //     {
      //       id: Math.random().toString(),
      //       position: { x: 100, y: 0 },
      //       data: { label: "yo" }
      //     }
      //   ];
      // });
      console.log('HERE')
      setNodes(nodes.concat(
        {
          id: Math.random().toString(),
          position: {x: 100, y: 0},
          data: {label: 'test'}
        }
      ))
    }, []);

    const addEdge = useCallback(({ source, target }) => {
      setEls((els) => {
        console.log(source, target);
        return [
          ...els,
          {
            id: Math.random().toString(),
            source,
            target
          }
        ];
      });
    }, []);

  return (
      <div className='node-map-container rounded'>
          <div className='node-map-container-inner'>
              <h3>CAN Bus Map</h3>
          </div>
          <div className='map-flow' style={{ height: 300 }}>
              <ReactFlow
                  elements={els} onConnect={addEdge}
                  nodes={nodes} 
                  edges={edges}
                  onNodesChange= {onNodesChange}
                  onEdgesChange={onEdgesChange}
                  
              >
              
                  <Controls>  <button onClick={addNode}>Add</button> </Controls>
                  
              </ReactFlow>
              
              
          </div>
          
      </div>
  );
}

export default NodeMap