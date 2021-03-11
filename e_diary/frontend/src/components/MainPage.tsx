import { Button, Container } from "react-bootstrap";
import { Schedule } from "./Schedule/Schedule";
import { AppAlert } from "./AppAlert"
import React, { useEffect, useState } from "react";
import { getDayTimetable, loadSchedule } from '../api';

export function MainPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getDayTimetable()
      .then((data) => setData(data))
  }, [])

  return (
    <>
      <Container fluid>
        <h4>Расписание на сегодня</h4>
        {data && <Schedule data={data.schedule} onScheduleChange={() => {
          getDayTimetable().then((data) => setData(data))
        }} />}
        <AppAlert alertType={"info"} buttonType={"light"}
          text={"Чтобы заполнить домашнее задание, кликните по полю, которое хотите заполнить." }/>
      </Container>
      <Button variant="success" className="mt-3" onClick={() => loadSchedule()}>Загрузить расписание</Button>
    </>
  );
}


