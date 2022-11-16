import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'



function Sync() {
    let navigate = useNavigate()
    
    const onCancel = ()=> {
        const path = '../'
        navigate(path)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
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
                            
                            placeholder='username'
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupText'>
                        <Form.Label>IP address</Form.Label>
                        <Form.Control
                            type='text'
                            name='Ip'
                            
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
                            
                            required
                            min='1'
                        />
                    </Form.Group>
                    
                    
                </div>
                <br />
                <div className='new-project-buttons'>
                    <Button onClick={onCancel} className='new-project-button-cancel rounded-pill'>Cancel
                    </Button>
                    <div className='space'></div>
                    <Button type='submit' className='new-project-button-submit rounded-pill'>Create</Button>
                </div>
            </Form>
        </div>
    )
}

export default Sync