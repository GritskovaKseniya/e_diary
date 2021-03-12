import { useState, useEffect } from "react"
import { Container, Form } from "react-bootstrap"
import { lessonsAndClassesListGet, getGradeList } from "../api"
import { GradeTable } from "./GradeTable/GradeTable"

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
      <h2>Журнал</h2>
      <h3>Текущая четверть.</h3>
      <Form>
        <Form.Label>Выберите класс и предмет</Form.Label>
        {selected && 
          <Form.Control as="select" 
            onChange={handleChange}
            value = {selected}
          >
            {lessonsList.list && lessonsList.list.map((lesson: string) => {
              return <option value={lesson}>{lesson}</option>
            })}
          </Form.Control>
        }
      </Form>
      {gradeList && <GradeTable date={gradeList.data[0]} list={gradeList.data[1]}/>}
    </Container>)
}