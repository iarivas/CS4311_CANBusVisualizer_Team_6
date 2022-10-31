import React from "react";
import { Position, Handle } from "react-flow-renderer";

let pics = {
  pic1: require('../images/ac.png'),
  pic2: require('../images/engine.png'),
  pic3: require('../images/brake.png'),
  pic4: require('../images/steering_wheel.png')
}

function renderSwitch(param: any) {
  switch(param) {
    case '../images/ac.png':
      return pics.pic1;
    case '../images/engine.png':
      return pics.pic2;
    case '../images/brake.png':
      return pics.pic3;
    case '../images/steering_wheel.png':
      return pics.pic4;
    default:
      return pics.pic2;
  }
}

function CustomNode({ id, data }: any) {
  return (
    <main style={{ backgroundColor: (data.isBlacklisted ? '#C0C0C0' : 'white'), overflow: 'hidden'}}>
      <Handle type="target" position={Position.Top} />
      <div style={{ textAlign: 'center', color: 'black', fontSize: 'large'}}>
        <strong>{data.label}</strong>
        
      </div>

      <div style={{ textAlign: 'center', color: 'blue'}}>
        {id}
      </div>
      
      <img style={{ marginRight: 'auto', marginLeft: 'auto'}} src={renderSwitch(data.icon)} alt='icon'/>

      <Handle type="source" position={Position.Bottom} />
    </main>
  );
}
export default CustomNode;