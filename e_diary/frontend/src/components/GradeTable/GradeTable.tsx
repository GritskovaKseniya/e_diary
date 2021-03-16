import React from "react"
import { Table } from "react-bootstrap"
import './GradeTable.css'


export function GradeTable(props: any) {

  function getScheduleRow(student: any, key: number){
    
    function getScheduleCol(){
      return props.list.lessonsDate.map((lessonDate: string) => {
        const time = student.grades.find((grade: any) => (lessonDate === grade.date))
          if (time) {
            const gradesJSX = student.grades.filter((grade: any) => (lessonDate === grade.date)).map((grade: any) => {

              switch (grade.type) {
                case "Работа на уроке":
                  return (
                    <span className="grade-cw">
                      <b>{grade.grade}</b>
                    </span>
                  )
                  break;

                case "Самостоятельная работа":
                  return (
                    <span className="grade-t">
                      <b>{grade.grade}</b>
                    </span>
                  )
                  break;
            
                case "Контрольная работа":
                  return (
                    <span className="grade-ct">
                      <b>{grade.grade}</b>
                    </span>
                  )
                  break;

                case "Домашняя работа":
                  return (
                    <span className="grade-hw">
                      <b>{grade.grade}</b>
                    </span>
                  )
                  break;
              }
            })
            return (<td>{gradesJSX}</td>)
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
        {/* <tr>
          <th colSpan={2}>Тип оценки</th>
          <th>Самостоятелньая работа</th><th>Работа на уроке</th><th></th><th></th><th>Контрольная работа</th><th></th><th></th><th></th>
        </tr> */}
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