import React, { useState, useEffect } from "react"
import { Col, Container, Form, Row, Button } from "react-bootstrap"
import { lessonsAndClassesListGet, getGradeList, getQuarter} from "../api"
import { GradeTable } from "./GradeTable/GradeTable"
import { AppAlertInfo} from "./AppAlert/AppAlertInfo"
import rightArrow from '../rightArrow.svg'
import leftArrow from '../leftArrow.svg'

export function ProgressTable() {
  
  const [lessonsList, setLessonsList] = useState<any>('')
  const [selected, setSelected] = useState<string | null>(null)
  const [gradeList, setGradeList] = useState<any>(null)
  const [quarter, setQuarter] = useState<number | null>(null)
  useEffect(() => {
    lessonsAndClassesListGet()
      .then((lessonsList) => {
        setLessonsList(lessonsList)
        setSelected(lessonsList.list[0])
      })
  }, [])

  useEffect(() => {
    getQuarter()
      .then((result) => {
        setQuarter(result.quarter)
      })
  }, [])

  useEffect(() => {
    if (selected && quarter) {
      getGradeList(selected, quarter)
        .then((result) => {
          setGradeList(result)
        })
    }
  }, [selected, quarter])

  function handleChange(e: any){
    setSelected(e.target.value)
  }

  return( 
    <Container fluid>
      <Row className="center m-2">
          <Col>
            <Button variant="btn-outline-secondary"
              onClick={() => { 
                if (quarter! > 1){
                  setQuarter(quarter!-1)
                }
              }}>
              <img src={leftArrow} alt="leftArrow" />
            </Button>
          </Col>
          <Col>
            <h4>{quarter} четверть.</h4>
          </Col>
          <Col>
            <Button variant="btn-outline-secondary"
              onClick={() => { if (quarter! < 4){
                setQuarter(quarter!+1)
              }
            }}>
              <img src={rightArrow} alt="rightArrow" />
            </Button>
          </Col>
        </Row>
      <AppAlertInfo/>
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
          getGradeList(selected!, quarter!)
            .then((gradeList) => {
              setGradeList(gradeList)
          })
        }}/>}
    </Container>)
}