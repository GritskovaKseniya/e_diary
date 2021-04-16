import { useEffect, useState } from "react";
import { Button, Row, Col, Modal, Container, Form } from "react-bootstrap";
import './AppModal.css'; 
import pencil from '../../pencil.svg'
import { getGradesValue } from "../../api";
import moment from "moment";

export function AppModalGrade(props: any) {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState<any>(null)
  const [selectValues, setSelectValues] = useState<any>({
    valueHW: props.grades.find((grade: any) => grade.type === "Домашняя работа")?.grade || 0, 
    valueLW: props.grades.find((grade: any) => grade.type === "Работа на уроке")?.grade || 0,
    valueT: props.grades.find((grade: any) => grade.type === "Самостоятельная работа")?.grade || 0, 
    valueCT: props.grades.find((grade: any) => grade.type === "Контрольная работа")?.grade || 0 
  })
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
          {grade: Number(selectValues.valueHW), type: "Домашняя работа"}, 
          {grade: Number(selectValues.valueLW), type: "Работа на уроке"}, 
          {grade: Number(selectValues.valueT), type: "Самостоятельная работа"}, 
          {grade: Number(selectValues.valueCT), type: "Контрольная работа"}
        ],
        student: props.name,
        lesson : props.lesson
      })
    setShow(false)
  }

  const handleShow = () => setShow(true);

  function grades(lessonDate: string) {
    if(props.grades.length) {
      const gradesJSX = props.grades.map((grade: any) => {
        let classNameCss = ""; let theGrade = 0; let theNull = 0;
        switch (grade.type) {
          case "Работа на уроке":
            if (grade.grade === selectValues.valueLW){
              theGrade = selectValues.valueLW
            }
            classNameCss = "grade-cw"
            break;
            
          case "Самостоятельная работа":
            if (grade.grade === selectValues.valueT){
              theGrade = selectValues.valueT
            }
            classNameCss = "grade-t"
            break;
            
          case "Контрольная работа":
            if (grade.grade === selectValues.valueCT){
              theGrade = selectValues.valueCT
            }
            classNameCss = "grade-ct"
            break;
            
          case "Домашняя работа":
            if (grade.grade === selectValues.valueHW){
              theGrade = selectValues.valueHW
            }
            classNameCss = "grade-hw"
            break; 
        }
        if (theGrade !== theNull) {
          return (
            <span className={classNameCss}> 
              {theGrade}&nbsp; 
            </span>
          )
        }
      })
      return (<span>{gradesJSX}</span>)
    } else {return(<span>{props.grades}</span>)}
  }

  return (
    <>
      <button className="modal_button" onClick={handleShow}>
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
          <Form.Group>
            <Form.Label><span className="grade-hw">Оценка за домашнее задание:</span></Form.Label>
            <Form.Control as="select" value={selectValues.valueHW} 
              onChange={(e: any) => {setSelectValues({...selectValues, valueHW:Number(e.target.value)})}}>
              <option value={0}>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option value={value}>{value}</option>))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label><span className="grade-cw">Оценка за работу на уроке:</span></Form.Label>
            <Form.Control as="select" value={selectValues.valueLW}
              onChange={(e: any) => {setSelectValues({...selectValues, valueLW:Number(e.target.value)})}}>
              <option value={0}>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option value={value}>{value}</option>))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label><span className="grade-t">Оценка за самостоятельную работу:</span></Form.Label>
            <Form.Control as="select" value={selectValues.valueT}
              onChange={(e: any) => {setSelectValues({...selectValues, valueT:Number(e.target.value)})}}>
              <option value={0}>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option value={value}>{value}</option>))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label><span className="grade-ct">Оценка за контрольную работу:</span></Form.Label>
            <Form.Control as="select" value={selectValues.valueCT}
              onChange={(e: any) => {setSelectValues({...selectValues, valueCT:Number(e.target.value)})}}>
              <option value={0}>Выберите оценку</option>
              {value && value.gradesValue.map((value: number) => (<option value={value}>{value}</option>))}
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