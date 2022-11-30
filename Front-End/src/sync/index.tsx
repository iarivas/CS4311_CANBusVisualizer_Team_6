import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import APIUtil from '../utilities/APIutils';
import {useState } from 'react';
import './index.css';

function Sync() {
    let navigate = useNavigate()
    const api = new APIUtil()
    const [syncValues, setSyncValues] = useState({
        userName: " ",
        IP: " ",
        Pass: " ",

    })
    

    const onCancel = ()=> {
        const path = '../'
        navigate(path)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        api.syncProject(syncValues)
        
    }

    return (
        <div className='new-project-form'>
            <Form onSubmit={e=>onSubmit(e)}>
                <div className='new-project-fields'>
                    <Form.Group className='mb-3' controlId='formGroupText'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            name='Un'
                            value={syncValues.userName}
                            onChange={(e)=>setSyncValues({...syncValues, userName: e.target.value})}
                            placeholder='username'
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupText'>
                        <Form.Label>IP address</Form.Label>
                        <Form.Control
                            type='text'
                            name='Ip'
                            value={syncValues.IP}
                            onChange={(e)=>setSyncValues({...syncValues, IP: e.target.value})}
                            placeholder='IP'
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name='Pw'
                            placeholder='password'
                            value={syncValues.Pass}
                            onChange={(e)=>setSyncValues({...syncValues, Pass: e.target.value})}
                            required
                            
                        />
                    </Form.Group>
                    
                    
                </div>
                <br />
                <div className='new-project-buttons'>
                    <Button onClick={onCancel} className='new-project-button-cancel rounded-pill'>Cancel
                    </Button>
                    <div className='space'></div>
                    <Button type='submit' className='new-project-button-submit rounded-pill'>Sync</Button>
                </div>
            </Form>
        </div>
    )
}

export default Sync