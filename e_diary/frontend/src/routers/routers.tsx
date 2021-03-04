import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Header } from "../components/Header";
import { Progress_table } from "../components/ProgressTable";
import { Timetable } from "../components/Timetable";
import { Quit } from "../components/Quit";
import { Main } from "../components/Main";
import { Container, Jumbotron, Row } from "react-bootstrap";
import './routers.css';

export default function Routers() {
  return (
    <Router>
      <div>
        <Header/>
        <Jumbotron fluid>
          <Container>
            <div className="float-left ml-3 h5">Teacher Name</div>
            <div className="float-right mr-3 h5" id="current_date_time_block">Local Time</div>
          </Container>
        </Jumbotron>
        <Switch>
          <Route path="/timetable">
            <Timetable />
          </Route>
          <Route path="/timetable">
            <Timetable />
          </Route>
          <Route path="/progress_table">
            <Progress_table />
          </Route>
          <Route path="/quit">
            <Quit />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


// function zero_first_format(value: any)
//     {
//         if (value < 10)
//         {
//             value='0'+value;
//         }
//         return value;
//     }

// function date_time()
// {
//     var current_datetime = new Date();
//     var day = zero_first_format(current_datetime.getDate());
//     var month = zero_first_format(current_datetime.getMonth()+1);
//     var year = current_datetime.getFullYear();
//     var hours = zero_first_format(current_datetime.getHours());
//     var minutes = zero_first_format(current_datetime.getMinutes());
//     var seconds = zero_first_format(current_datetime.getSeconds());
//     let dayOfTheWeek = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']

//     return day+"."+month+"."+year+" "+ dayOfTheWeek[current_datetime.getUTCDay()]+" "+hours+":"+minutes;
// }

// /* update date every second */
// document.getElementById('current_date_time_block')!.innerHTML = date_time()
// setInterval(() => document.getElementById('current_date_time_block')!.innerHTML = date_time(),1000)