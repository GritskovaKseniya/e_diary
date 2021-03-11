import React, { useState } from "react"
import { Button, Container, Col, FormControl, Modal, Row } from "react-bootstrap"
import './AppModal.css'

export function AppModalComment(props: any) {
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
              <svg className="bi bi-pencil" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="currentColor" 
                xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" 
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
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