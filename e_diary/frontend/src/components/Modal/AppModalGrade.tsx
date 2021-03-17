import { useEffect, useState } from "react";
import { Button, Row, Col, Modal, Container, Form } from "react-bootstrap";
import './AppModal.css'; 
import pencil from '../../pencil.svg'
import { getGradesValue } from "../../api";
import moment from "moment";

export function AppModalGrade(props: any) {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState<any>(null)
  
  let valueHW = 0; let valueLW = 0; let valueT = 0; let valueCT = 0;

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    getGradesValue()
      .then((value: any) => {
        setValue(value)
      })
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    props.onSubmit(
      {
        date: props.date, 
        grades: [
          {grade: valueHW, type: "Домашняя работа"}, 
          {grade: valueLW, type: "Работа на уроке"}, 
          {grade: valueT, type: "Самостоятельная работа"}, 
          {grade: valueCT, type: "Контрольная работа"}
        ],
        student: props.name,
        lesson : props.lesson
      })
    setShow(false)
  }

  const handleShow = () => setShow(true);

  function grades(lessonDate: string) {
    if(props.grades !== " ") {
      const gradesJSX = props.grades.map((grade: any) => {
        switch (grade.type) {
          case "Работа на уроке":
            valueLW = grade.grade
            return (
              <span className="grade-cw"> 
                {grade.grade}&nbsp; 
              </span>
            )
            break;

          case "Самостоятельная работа":
            valueT = grade.grade
            return (
              <span className="grade-t"> 
                {grade.grade}&nbsp; 
              </span>
            )
            break;
      
          case "Контрольная работа":
            valueCT = grade.grade
            return (
              <span className="grade-ct"> 
                {grade.grade}&nbsp;
              </span>
            )
            break;

          case "Домашняя работа":
            valueHW = grade.grade
            return (
              <span className="grade-hw"> 
                {grade.grade}&nbsp;
              </span>
            )
            break;
        }
      })
      return (<span>{gradesJSX}</span>)
    } else {return(<span>{props.grades}</span>)}
  }

  return (
    <>
      <button className="modal_button"onClick={handleShow}>
        <Container>
          <Row>
            <Col>
              {grades(props.date)}
            </Col>
            <Col xs={6} md={3}>
              <img src={pencil} alt="pencil" />
            </Col>
          </Row>
        </Container>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Оценки на {moment(props.date).format("DD.MM.YYYY")}</h5></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><h6>{props.name}</h6></p>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label><span className="grade-hw">Оценка за домашнее задание:</span></Form.Label>
            <Form.Control as="select" value={valueHW}>
              <option value={0} disabled>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option>{value}</option>))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label><span className="grade-cw">Оценка за работу на уроке:</span></Form.Label>
            <Form.Control as="select" value={valueLW}>
              <option value={0} disabled>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option>{value}</option>))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label><span className="grade-t">Оценка за самостоятельную работу:</span></Form.Label>
            <Form.Control as="select" value={valueT}>
              <option value={0} disabled>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option>{value}</option>))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label><span className="grade-ct">Оценка за контрольную работу:</span></Form.Label>
            <Form.Control as="select" value={valueCT}>
              <option value={0} disabled>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option>{value}</option>))}
            </Form.Control>
          </Form.Group>        
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