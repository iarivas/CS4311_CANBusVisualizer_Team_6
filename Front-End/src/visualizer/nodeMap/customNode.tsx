import { Position, Handle } from "react-flow-renderer";
import { FlagFill } from "react-bootstrap-icons";
import { FlagOptions } from "../../common/Constants";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
      style={{ backgroundColor: (data.isBlacklisted ? '#C0C0C0' : 'white'), overflow:'hidden'}}
      className='rounded'
    >
      <Handle type="target" position={Position.Top} style={{ height:'12px', width:'12px' }} />
      <div className='custom-node-content'>
        <img style={{ marginRight: 'auto', marginLeft: 'auto', height: '70px', width: '70px'}} src={renderSwitch(data.icon)} alt='icon'/>
        <div className='custom-node-info' style={{width:'150px'}}>
          <div style={{color: 'blue'}}>
            ID: {id}
          </div>
          <OverlayTrigger
            delay={{show:250, hide:400}}
            overlay={<Tooltip id='tooltip'>{data.label}</Tooltip>}
          >
            <div style={{color: 'black', fontSize: 'large', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
              <strong>{data.label}</strong>
            </div>
          </OverlayTrigger>
          {data.flag === FlagOptions.NONE ? '---' : 
          <FlagFill style={{color: 
            data.flag === FlagOptions.ALIVE ? 'green' :
            data.flag === FlagOptions.DOSED ? 'red' :
            data.flag === FlagOptions.ENUMERATED ? 'blue' :
            // Scanned
            'purple'
          }}/>
          }
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ height:'12px', width:'12px' }} />
    </main>
  );
}
export default CustomNode;