import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import APIUtil from '../../utilities/APIutils';



interface Props {
    isShown: boolean,
    onHide: (() => void)
}

function ImportImageModal({isShown, onHide}: Props) {
    const api = new APIUtil()
    const [imageSelected, setImageSelected] = useState<File>(new File([""], ""));
    // const [sentImageData, setSentImageData] = useState(
    //     {name: "",
    //      public_id: ''})

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "wy135ktm");

        Axios.post("https://api.cloudinary.com/v1_1/dvigduckr/image/upload", formData).then((response) => {
            uploadImageMetaData(response.data.original_filename.toString(), 
                                response.data.public_id.toString());   
        });
    };

    const uploadImageMetaData = (fileName: string, id: string) => {
        api.addImageData(fileName, id)
    }




    return (
        <Modal onHide={onHide} show={isShown} className='import-image-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Import Image</Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
                <Form.Group className='mb-3' controlId='file'>
                    <Form.Label className='label'>File</Form.Label>
                    <Form.Control type='file' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setImageSelected(event.currentTarget.files![0])
                    }}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} className='rounded-pill'>
                    Close
                </Button>
                <Button
                    variant="primary"
                    className='rounded-pill'
                    onClick={() => {
                        uploadImage()
                        onHide()
                    }}
                >
                    Upload
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
  );
}


export default ImportImageModal;
