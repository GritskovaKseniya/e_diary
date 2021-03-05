import { ProgressTable } from "../components/ProgressTable";
import { Timetable } from "../components/Timetable";
import { MainPage } from "../components/MainPage";
import './Routers.css';
import React from "react";
import { Route, Switch } from "react-router-dom";



export default function AppRouters() {  
  return (
    <Switch>
      <Route path="/students/timetable">
        <Timetable />
      </Route>
      <Route path="/students/progress_table">
        <ProgressTable />
      </Route>
      <Route path="/students">
        <MainPage />
      </Route>
    </Switch>
  );
}