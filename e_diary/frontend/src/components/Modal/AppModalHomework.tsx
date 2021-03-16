import { useState } from "react"
import { Button, Container, Form, FormControl, Modal, Row, Col } from "react-bootstrap"
import './AppModal.css'
import pencil from '../../pencil.svg'

export function AppModalHomework(props: any) {
  const [show, setShow] = useState(false)
  const initialHomework = props.homework
  const [homework, setHomework] = useState(initialHomework)

  const handleClose = () => {
    reset() 
    setShow(false)
  }

  const reset = () => {
    setHomework(initialHomework)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.onSubmit({homework})
    setShow(false)
  }

  const handleShow = () => setShow(true)

  return (
    <>
      <button className="modal_button" onClick={handleShow}>
        <Container>
          <Row>
            <Col>
              {initialHomework}
            </Col>
            <Col xs={6} md={3}>
            <img src={pencil} alt="pencil" />
            </Col>
          </Row>
        </Container>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Домашнее задание</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h6>{props.lesson} {props.date}</h6>
            <FormControl as="textarea" 
              aria-label="With textarea" 
              rows={5}
              value={homework} 
              onChange={(e: any) => setHomework(e.target.value)}/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Отмена
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
