import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ProjectState from './ProjectState'
import APIUtil from '../../utilities/APIutils'

interface stateProps {
    state: ProjectState
    setState: React.Dispatch<React.SetStateAction<ProjectState>>
}

function NewProjectForm({state, setState}: stateProps) {
    let navigate = useNavigate()
    const api = new APIUtil()

    const onCancel = ()=> {
        const path = '/projects'
        navigate(path)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        api.createProject(state)
        .then((response) => {
            navigate(`/projects/${response.data.eventName}`)
        })
    }

    return (
        <div className='new-project-form'>
            <Form onSubmit={e=>onSubmit(e)}>
                <div className='new-project-fields'>
                    <Form.Group className='mb-3' controlId='formGroupText'>
                        <Form.Label>Project name</Form.Label>
                        <Form.Control
                            type='text'
                            name='projectName'
                            value={state.eventName}
                            onChange={(e)=>setState({...state, eventName: e.target.value})}
                            placeholder='Project name'
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupText'>
                        <Form.Label>Analyst initials</Form.Label>
                        <Form.Control
                            type='text'
                            name='analystInitials'
                            value={state.initials}
                            onChange={e=>setState({...state, initials: e.target.value})}
                            placeholder='PBJ'
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Baud rate</Form.Label>
                        <Form.Control
                            type='number'
                            name='baudRate'
                            placeholder='9600'
                            onChange={e=>setState({...state, baudRate: parseInt(e.target.value) || state.baudRate})}
                            required
                            min='1'
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formDBC'>
                        <Form.Label>DBC file path</Form.Label>
                        <Form.Control
                            type='text'
                            name='dbcFile'
                            placeholder='/home/<username>/Desktop/<filename>'
                            value={state.dbcFile ?? ''}
                            onChange={e=>{
                                if(!e.target.value) {
                                    setState({...state, dbcFile: null})
                                } else {
                                    setState({...state, dbcFile: e.target.value})
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBlacklist'>
                        <Form.Label>Blacklist file path</Form.Label>
                        <Form.Control
                            type='text'
                            name='blacklistFile'
                            placeholder='/home/<username>/Desktop/<filename>'
                            value={state.blacklistFile ?? ''}
                            onChange={e=>{
                                if(!e.target.value) {
                                    setState({...state, blacklistFile: null})
                                } else {
                                    setState({...state, blacklistFile: e.target.value})
                                }
                            }}
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

export default NewProjectForm