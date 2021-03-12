import  { useState } from "react"
import { Button, Modal } from "react-bootstrap";
import info from '../../info.svg';

export function AppModalInfo(props: any) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="light" onClick={handleShow}>
          <img src={info} alt="info" />
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>{props.text}</Modal.Body>
          <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
        </Modal>
      </>
    );
  }