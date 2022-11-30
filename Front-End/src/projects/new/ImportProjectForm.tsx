import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import APIUtil from '../../utilities/APIutils'
import { useState } from 'react'

function ImportProjectForm() {
    let navigate = useNavigate()

    const [filePath, setFilePath] = useState('')
    const api = new APIUtil()

    const onCancel = ()=> {
        const path = '../../'
        navigate(path)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        api.importProject(filePath)
        .then((response) => {
            navigate(`/projects/${response.data.projectId}`)
        })
        
    }

    return (
        <div className='new-project-form'>
            <h1 className='new-project-title'>Import Project</h1>
            <br/>
            <Form onSubmit={onSubmit}>
                <div className='new-project-fields'>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Project file</Form.Label>
                        <Form.Control
                            type='text'
                            name='projectFile'
                            placeholder='/home/<username>/Desktop/<filename>'
                            onChange={e=>{
                                if(!e.target.value) {
                                    setFilePath('')
                                } else {
                                    setFilePath(e.target.value)
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

export default ImportProjectForm