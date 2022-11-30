import { Position, Handle } from "react-flow-renderer";
import { FlagFill } from "react-bootstrap-icons";
import { FlagOptions } from "../../common/Constants";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dvigduckr'
  }
});





function CustomNode({ id, data }: any) {
  const myImage = cld.image(data.icon);
  return (
    <main
      style={{ backgroundColor: (data.isBlacklisted ? '#C0C0C0' : 'white'), overflow:'hidden'}}
      className='rounded'
    >
      <Handle type="target" position={Position.Top} style={{ height:'12px', width:'12px' }} />
      <div className='custom-node-content'>
        <AdvancedImage cldImg={myImage} style={{marginRight: 'auto', marginLeft: 'auto', height: '70px', width: '70px'}}/>
        {/* <img style={{ marginRight: 'auto', marginLeft: 'auto', height: '70px', width: '70px'}} src={renderSwitch(data.icon)} alt='icon'/> */}
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