import React from "react"
import { Table } from "react-bootstrap"


export function GradeTable(props: any) {

  function getScheduleRow(student: any, key: number){
    
    function getScheduleCol(){
      return props.list.lessonsDate.map((lessonDate: string) => {
        const time = student.grades.find((grade: any) => (lessonDate === grade.date))
        if (time) {
          return (
            <td>
              {time.grade}
            </td>)
        } else {return (<td></td>)}
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
            {props.list.lessonsDate.map((lessonDate: string) => (<th>{lessonDate}</th>))}
          </tr>
        </thead>
        <tbody>
          {props.date.gradeLists.map((student: any, idx: number) => (getScheduleRow(student, idx)))}
        </tbody>
      </Table>
    );
}