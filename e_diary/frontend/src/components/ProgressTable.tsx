import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { lessonsAndClassesListGet, studentsListNameGet } from "../api";

export function ProgressTable() {
  const [lessonsList, setLessonsList] = useState<any>('')
  const [studentsList, setStudentsList] = useState<any>(null)

  useEffect(() => {
    lessonsAndClassesListGet()
      .then((lessonList) => setLessonsList(lessonList))
  }, [])

  useEffect(() => {
    studentsListNameGet()
      .then((studentsList) => setStudentsList(studentsList))
  }, [])

  console.log(studentsList)

  return( 
    <Container fluid>
      <h2>Журнал</h2>
      <Form>
        <Form.Label>Выберите класс и предмет</Form.Label>
        <Form.Control as="select">
          {lessonsList.list && lessonsList.list.map((lesson: string) => {
            return <option>{lesson}</option>;
          })}
        </Form.Control>
      </Form>
      {/* {studentsList.ClassesList && studentsList.ClassesList.map((student: string) => {
        return <p>{student}</p>;
      })} */}
      <Button variant="success" className="mt-3" onClick={() => studentsListNameGet()
          .then((studentsList) => setStudentsList(studentsList))}>Загрузить список учеников</Button>
    </Container>)
}