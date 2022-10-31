import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ProjectState from './ProjectState'
import APIUtil from '../../utilities/APIutils'
import { read } from 'fs'

interface stateProps {
    state: ProjectState
    setState: React.Dispatch<React.SetStateAction<ProjectState>>
}

function ImportProjectForm({state, setState}: stateProps) {
    let navigate = useNavigate()
    const api = new APIUtil()

    const onCancel = ()=> {
        const path = '/projects'
        navigate(path)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        api.createProject(state)
    }

    return (
        <div className='new-project-form'>
            <Form onSubmit={e=>onSubmit(e)}>
                <div className='new-project-fields'>
                    
                    
                   
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Project file</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                let target = (e.target as HTMLInputElement)
                                const reader = new FileReader()
                                reader.readAsText(target.files![0])
                                reader.onload = () => setState({...state, dbcFile: reader.result as string})
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

export default ImportProjectForm