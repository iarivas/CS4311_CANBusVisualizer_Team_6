import Container from 'react-bootstrap/Container';
import './index.css';


import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
export default function Menubar({
      showPacketViewSettingsModal,
      hidePacketViewSettingsModal,
      showReplayPacketsModal,
      onAddNode,
    } : any
    ){
  return (
    <div>
    <Navbar  expand="lg">
      <Container id="rcorners1">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="File" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" href="#action/3.2">Export Project </NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Packets" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" onClick={showReplayPacketsModal}> Replay Packets </NavDropdown.Item>
              <NavDropdown.Item id='action' onClick={showPacketViewSettingsModal}>Filter and Sort</NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Node" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" onClick={() => onAddNode()}> Add Node  </NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.1"> Select All </NavDropdown.Item>

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
