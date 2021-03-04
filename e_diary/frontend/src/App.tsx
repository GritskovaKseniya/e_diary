import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from './routers/routers';
import { getWeekTimetable } from './api';

function App() {
  React.useEffect(() => {getWeekTimetable(14)}, [])
  return (
    <div className="App">
      <Routers/>
    </div>
  );
}

export default App;
