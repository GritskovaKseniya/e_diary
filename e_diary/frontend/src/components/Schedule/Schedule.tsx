import moment from "moment";
import './Schedule.css'
import { Table } from "react-bootstrap";
import { updateComment, updateHomework } from "../../api";
import { AppModalComment } from "../Modal/AppModalComment";
import { AppModalHomework } from "../Modal/AppModalHomework";

export function Schedule(props: any) {

  const handleHomeworkSubmit = (lessonId: number) => (values: any) => {
    updateHomework(lessonId, values.homework)
      .then(() => {
        props.onScheduleChange()
      })
  }

  const handleCommentSubmit = (lessonId: number) => (values: any) => {
    updateComment(lessonId, values.comment)
      .then(() => {
        props.onScheduleChange()
      })
  }

  function getCellContent(lesson: any, lessonKey: string) {
    if (lesson.id && lessonKey === "homework"){
      return(
        <AppModalHomework onSubmit={handleHomeworkSubmit(lesson.id)} 
        lesson={lesson.title}
        date={moment(lesson.date).format('DD.MM.YYYY')}
        homework={lesson.homework}/>
      )
    } else if (lesson.id && lessonKey === "comment"){
      return(
        <AppModalComment onSubmit={handleCommentSubmit(lesson.id)}
        lesson={lesson.title}
        date={moment(lesson.date).format('DD.MM.YYYY')} 
        comment={lesson.comment}/>
      )
    } else {
      return(
        lesson[lessonKey]
      )
    }
  }

  function getScheduleRow(lesson: any, key: any) {
    return(
      <tr key={key}>
        {Object.keys(lesson).slice(0, -2).map((theKey: string)=> 
            <td key={theKey}>
              {getCellContent(lesson, theKey)}
            </td>)}
      </tr>
    )
  }
  
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="width-number">#</th>
          <th className="width-time">Время</th>
          <th className="width-lesson">Предмет</th>
          <th className="width-class">Класс</th>
          <th className="width-homework">Домашнее задание</th>
          <th className="width-comment">Комментарий преподавателя</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((lesson: any, idx: number) => getScheduleRow(lesson, idx))}
      </tbody>
    </Table>
  );
}
