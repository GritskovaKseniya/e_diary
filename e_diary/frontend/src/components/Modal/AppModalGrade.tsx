import { useState } from "react";
import { Button, Row, Col, FormControl, Modal, Container } from "react-bootstrap";
import './AppModal.css'; 
import pencil from '../../pencil.svg'

export function AppModalGrade(props: any) {
  const [show, setShow] = useState(false)
  const initialComment = props.comment
  const [comment, setComment] = useState(initialComment)

  const handleClose = () => {
    reset()
    setShow(false)
  }

  const reset = () => {
    setComment(initialComment)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.onSubmit({comment})
    setShow(false)
  }

  const handleShow = () => setShow(true);

  return (
    <>
      <button className="modal_button"onClick={handleShow}>
        <Container>
          <Row>
            <Col>
              {initialComment}
            </Col>
            <Col xs={6} md={3}>
              <img src={pencil} alt="pencil" />
            </Col>
          </Row>
        </Container>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Комментарий</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6>{props.lesson} {props.date}</h6>
          <FormControl as="textarea" 
            rows={5}
            aria-label="With textarea" 
            value={comment} 
            onChange={(e: any) => setComment(e.target.value)}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}