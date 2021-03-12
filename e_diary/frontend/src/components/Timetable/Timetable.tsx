import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getWeekTimetable } from "../../api";
import { Schedule } from "../Schedule/Schedule";
import moment, { Moment } from "moment";
import rightArrow from '../../rightArrow.svg'
import leftArrow from '../../leftArrow.svg'

export function Timetable() {
  const [data, setData] = useState<any>(null)
  const [date, setDate] = useState<Moment>(moment())

  useEffect(() => {
    getWeekTimetable(date)
      .then((data) => setData(data))
  }, [date])

  console.log(data?.schedule)

  function getDayContent(day: string, lessons: any[]) {
    return(
      <>
        <h4>Расписание на {day}</h4>
        <Schedule data={lessons} onScheduleChange={() => {
          getWeekTimetable(date)
            .then((data) => setData(data))
        }} />
      </>
    )
  }

  return (
    <Container fluid>
      <Row className="center m-2">
          <Col>
          <Button variant="btn-outline-secondary"
            className="leftArrowStyle"
            onClick={() => setDate(moment(date.subtract(7, 'days')))}>
            <img src={leftArrow} alt="leftArrow" />
          </Button>
          </Col>
          <Col>
            <h4>{date.isSame(moment(), 'day') ? `Расписание на текущую неделю.` : ` ` } </h4>
          </Col>
          <Col>
          <Button variant="btn-outline-secondary"
            className="rightArrowStyle"
            onClick={() => {setDate(moment(date.add(7, 'days')))}}>
            <img src={rightArrow} alt="rightArrow" />
          </Button>
          </Col>
        </Row>
      {/* <AppAlert
        alertType={"info"}
        buttonType={"light"}
        text={"Чтобы заполнить домашнее задание или комментарий, кликните по полю, которое хотите заполнить." }/> */}
      {data?.schedule.map((day: any) => getDayContent(day.date, day.lessons))} 
    </Container>
);
}