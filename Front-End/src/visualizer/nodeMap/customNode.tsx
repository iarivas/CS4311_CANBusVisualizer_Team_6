import { Position, Handle } from "react-flow-renderer";

let pics = {
  pic1: require('../images/GOATZILLA.jpg'),
  pic2: require('../images/car.png'),
  pic3: require('../images/goomba.png'),
  pic4: require('../images/PB&J.png')
}

function renderSwitch(param: any) {
  switch(param) {
    case '../images/GOATZILLA.jpg':
      return pics.pic1;
    case '../images/car.png':
      return pics.pic2;
    case '../images/goomba.png':
      return pics.pic3;
    case '../images/PB&J.png':
      return pics.pic4;
    default:
      return pics.pic2;
  }
}

function CustomNode({ id, data }: any) {
  return (
    <main style={{ backgroundColor: 'white', overflow: 'hidden'}}>
      <Handle type="target" position={Position.Top} />
      <div style={{ textAlign: 'center', color: 'black', fontSize: 'large'}}>
        <strong>{data.label}</strong>
      </div>
      
      <img style={{ marginRight: 'auto', marginLeft: 'auto'}} src={renderSwitch(data.icon)} />

      <Handle type="source" position={Position.Bottom} />
    </main>
  );
}
export default CustomNode;