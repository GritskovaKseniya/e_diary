import { useState, useEffect } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { lessonsAndClassesListGet, getGradeList } from "../api"
import { GradeTable } from "./GradeTable/GradeTable"
import { AppAlertInfo} from "./AppAlert/AppAlertInfo"

export function ProgressTable() {
  const [lessonsList, setLessonsList] = useState<any>('')
  const [selected, setSelected] = useState<string | null>(null)
  const [gradeList, setGradeList] = useState<any>(null)

  useEffect(() => {
    lessonsAndClassesListGet()
      .then((lessonsList) => {
        setLessonsList(lessonsList)
        setSelected(lessonsList.list[0])
      })
  }, [])

  useEffect(() => {
    if (selected) {
      getGradeList(selected)
        .then((gradeList) => {
          setGradeList(gradeList)
          console.log(gradeList)
        })
    }
  }, [selected])

  // DEBUG
  if (gradeList) {
    console.log(gradeList.data[0])
    console.log(gradeList.data[1])
  }

  function handleChange(e: any){
    setSelected(e.target.value)
    console.log(e)
  }

  return( 
    <Container fluid>
      <h2>Журнал (Текущая четверть)</h2>
      <AppAlertInfo />
      <Form className="mt-2">
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Выберите класс и предмет:
          </Form.Label>
          <Col sm="10">
          {selected && 
            <Form.Control as="select" 
              onChange={handleChange}
              value = {selected}
            >
              {lessonsList.list && lessonsList.list.map((lesson: string) => {
                return <option>{lesson}</option>
              })}
            </Form.Control>
          }
          </Col>
        </Form.Group>
      </Form>
      {gradeList && <GradeTable date={gradeList.data[0]} 
        list={gradeList.data[1]} 
        lesson={selected} 
        onGradeTableChange={() => {
          getGradeList(selected!)
            .then((gradeList) => {
              setGradeList(gradeList)
          })
        }}/>}
    </Container>)
}