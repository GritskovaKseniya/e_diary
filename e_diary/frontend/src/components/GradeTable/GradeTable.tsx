import moment from "moment"
import React from "react"
import { Table } from "react-bootstrap"
import { updateGrades } from "../../api"
import { AppModalGrade } from "../Modal/AppModalGrade"
import './GradeTable.css'


export function GradeTable(props: any) {

  const handleGradesSubmit = () => (values: any) => {
    updateGrades()
      .then(() => {
        props.onScheduleChange()
      })
  }

  function getScheduleRow(student: any, key: number){
    
    function getScheduleCol(){
      return props.list.lessonsDate.map((lessonDate: string) => {
        const time = student.grades.find((grade: any) => (lessonDate === grade.date))
        
          if (time) {
            // console.log("DEBUG", time)
            // console.log("DEBUG 2", student.student)
            return (<td><AppModalGrade date={lessonDate} 
              name={student.student}  
              grades={student.grades.filter((grade: any) => (lessonDate === grade.date))}
              lesson={props.lesson}
              onSubmit={handleGradesSubmit()}/></td>)
          } else {return (<td><AppModalGrade date={lessonDate} 
            name={student.student} grades={" "}/></td>)}
      })
    }

    return(
      <tr key={key}>
        <td>{key+1}</td> 
        <td>
          {student.student}
        </td>
        {getScheduleCol()}
      </tr>
    )
  }

  console.log(props)
  
  return (
      <Table bordered hover className="mt-20">
        <thead>
          <tr>
            <th className="width-number">#</th>
            <th className="width-lesson">ФИО</th>
            {props.list.lessonsDate.map((lessonDate: string) => (<th>{moment(lessonDate).format("DD.MM.YYYY")}</th>))}
          </tr>
        </thead>
        <tbody>
          {props.date.gradeLists.map((student: any, idx: number) => (getScheduleRow(student, idx)))}
        </tbody>
      </Table>
    );
}