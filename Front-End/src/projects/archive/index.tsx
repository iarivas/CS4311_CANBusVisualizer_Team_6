import './index.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom";
import { ButtonGroup } from 'react-bootstrap';


function Archive() {
  let navigate = useNavigate();

    const onNewProject = ()=> {
        const  path = './../new'
        navigate(path)
    }

    const onProjects = ()=> {
        const  path = './..'
        navigate(path)
    }
    const on404 = ()=> {
      const  path = './pageNotFound'
      navigate(path)
    }
  return (
    <Container className='container'>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <header className='header'>
      <Dropdown>
        <Dropdown.Toggle className='dropdown' variant="success" id="dropdown-basic">
          Archives
       </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className='dropdown2' onClick={onProjects}>Projects</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </header>

      <Row>

        <Col className='col' xs={4} md={2}>
          <div className='side-bar' > 
            <Button className = "side-buttons" onClick={onNewProject}>New</Button>
            <br></br>
            <Button className = "side-buttons">Import</Button>
          </div>
        </Col>

        <Col className='col' xs={14} md={10}>

            <Dropdown as={ButtonGroup} className='mock-project' >
            
              <Button onClick = {on404} className='inside-mock' variant="success">Archive 1</Button>

              <Dropdown.Toggle className='inside-mock'split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Archive</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Duplicate</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup} className='mock-project'>
            
              <Button onClick = {on404} className='inside-mock' variant="success">Archive 2</Button>

              <Dropdown.Toggle className='inside-mock'split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Archive</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Duplicate</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup} className='mock-project'>
            
              <Button onClick = {on404} className='inside-mock' variant="success">Archive 3</Button>

              <Dropdown.Toggle className='inside-mock'split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Archive</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Duplicate</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup} className='mock-project'>
            
              <Button onClick = {on404} className='inside-mock' variant="success">Archive 4</Button>

              <Dropdown.Toggle className='inside-mock'split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Archive</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Duplicate</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup} className='mock-project'>
            
              <Button onClick = {on404} className='inside-mock' variant="success">Archive 5</Button>

              <Dropdown.Toggle className='inside-mock'split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Archive</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Duplicate</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

          </Col>
      </Row>
    </Container>
  );
}

export default Archive;