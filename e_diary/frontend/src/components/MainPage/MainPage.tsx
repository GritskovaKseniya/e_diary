import { Button, Col, Container, Row } from "react-bootstrap"
import { Schedule } from "../Schedule/Schedule"
import { AppAlert } from "../AppAlert/AppAlert"
import { useEffect, useState } from "react"
import { getDayTimetable, loadSchedule } from '../../api'
import moment, { Moment } from "moment"
import './MainPage.css'
import rightArrow from '../../rightArrow.svg'
import leftArrow from '../../leftArrow.svg'

export function MainPage() {
  const [data, setData] = useState<any>(null)
  // initialaze today date
  const [date, setDate] = useState<Moment>(moment())

  useEffect(() => {
    getDayTimetable(date)
      .then((data) => setData(data))
  }, [date])

  return (
    <>
      <Container fluid>
        <AppAlert alertType={"info"} buttonType={"light"}
            text={"Чтобы заполнить домашнее задание, кликните по полю, которое хотите заполнить." }/>
        
        <Row className="center m-2">
          <Col>
            <Button variant="btn-outline-secondary"
              onClick={() => setDate(moment(date.subtract(1, 'days')))}>
              <img src={leftArrow} alt="leftArrow" />
            </Button>
          </Col>
          <Col>
            <h4> Расписание на {date.isSame(moment(), 'day') ? `сегодня` : date.format("DD.MM.YYYY")} </h4>
          </Col>
          <Col>
            <Button variant="btn-outline-secondary"
              onClick={() => {setDate(moment(date.add(1, 'days')))}}>
              <img src={rightArrow} alt="rightArrow" />
            </Button>
          </Col>
        </Row>
        {data && <Schedule data={data.schedule} onScheduleChange={() => {
          getDayTimetable(date).then((data) => setData(data)) }}/>
        }
      </Container>
      <Button variant="success" className="mt-3" onClick={() => loadSchedule()}>Загрузить расписание</Button>
    </>
  );
}


