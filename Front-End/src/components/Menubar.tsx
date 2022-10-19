import Container from 'react-bootstrap/Container';
import './index.css';


import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
export default function Menubar({
      showPacketViewSettingsModal,
      hidePacketViewSettingsModal,
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
              <NavDropdown.Item id="action" href="#action/3.1">Save Project</NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.2">Open Saved Packets </NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="View" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" href="#action/3.1">Filter Packets</NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.2">Sort Packets </NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Packets" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" href="#action/3.1"> Edit Packets</NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.2"> Replay Packets </NavDropdown.Item>
              <NavDropdown.Item id='action' onClick={showPacketViewSettingsModal}>Filter and Sort</NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Edit" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" href="#action/3.1"> Rename Node</NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.2"> Assign Icon </NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.1"> Change Visibility </NavDropdown.Item>
              
              
            </NavDropdown>

            <NavDropdown title="Node" id="basic-nav-dropdown" >
              <NavDropdown.Item id="action" onClick={() => onAddNode()}> Add Node  </NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.2"> Add Relationship  </NavDropdown.Item>
              <NavDropdown.Item id="action" href="#action/3.1"> Select All </NavDropdown.Item>
              
              
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
