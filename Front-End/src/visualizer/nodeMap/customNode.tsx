import { Position, Handle } from "react-flow-renderer";
import { FlagFill } from "react-bootstrap-icons";
import { FlagOptions } from "../../common/Constants";

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
    <main
      style={{ backgroundColor: (data.isBlacklisted ? '#C0C0C0' : 'white'), overflow: 'hidden'}}
      className='rounded'
    >
      <Handle type="target" position={Position.Top} />
      <div className='custom-node-content'>
        <img style={{ marginRight: 'auto', marginLeft: 'auto', height: '70px', width: '70px'}} src={renderSwitch(data.icon)} alt='icon'/>
        <div className='custom-node-info'>
          <div style={{color: 'blue'}}>
            ID: {id}
          </div>
          <div style={{color: 'black', fontSize: 'large'}}>
            <strong>{data.label}</strong>
          </div>
          {data.flag === FlagOptions.NONE ? '---' : 
          <FlagFill style={{color: 
            data.flag === FlagOptions.ALIVE ? 'green' :
            data.flag === FlagOptions.BLACKLIST ? 'black' :
            data.flag === FlagOptions.DOSED ? 'red' :
            data.flag === FlagOptions.ENUMERATED ? 'blue' :
            // Scanned
            'purple'
          }}/>
          }
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </main>
  );
}
export default CustomNode;