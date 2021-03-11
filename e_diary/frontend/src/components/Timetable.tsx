import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getWeekTimetable } from "../api";
import { Schedule } from "./Schedule/Schedule";
import { AppAlert } from "./AppAlert";

export function Timetable() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getWeekTimetable()
      .then((data) => setData(data))
  }, [])

  console.log(data?.schedule)

  function getDayContent(day: string, lessons: any[]) {
    return(
      <>
        <h4>Расписание на {day}</h4>
        <Schedule data={lessons} onScheduleChange={() => {
          getWeekTimetable()
            .then((data) => setData(data))
        }} />
      </>
    )
  }

  return (
    <Container fluid>
      <AppAlert
        alertType={"info"}
        buttonType={"light"}
        text={"Чтобы заполнить домашнее задание или комментарий, кликните по полю, которое хотите заполнить." }/>
      {data?.schedule.map((day: any) => getDayContent(day.date, day.lessons))} 
    </Container>
);
}