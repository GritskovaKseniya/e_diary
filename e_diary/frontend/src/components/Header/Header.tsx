import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { Jumbotron, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { getUsername } from '../../api'
import { LocalTime } from '../LocalTime'
import { AppModalInfo } from '../Modal/AppModalInfo'
import './Header.css'

export function Header(){
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getUsername()
      .then((data) => setData(data))
  }, [])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/students">E-DIARY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><NavLink exact activeClassName="selected" className="nav-c" to="/students">Главная</NavLink></Nav.Link>
            <Nav.Link><NavLink activeClassName="selected" className="nav-c" to="/students/timetable">Расписание</NavLink></Nav.Link>
            <Nav.Link><NavLink activeClassName="selected" className="nav-c" to="/students/progress_table">Журнал</NavLink></Nav.Link>
            {/* из-за проблем с переходом из реакта нужно делать onClick */}
            <Nav.Link><a href='/logout' className="nav-c" onClick={() => {window.location.href = `${window.location.origin}/logout`}}>Выход</a></Nav.Link>
          </Nav>
          <AppModalInfo className="mr-sm-2"
          text={"Чтобы заполнить домашнее задание или поставить оценки, кликните по нужному полю." }/>
        </Navbar.Collapse>
      </Navbar>

      <Jumbotron fluid className="jb-color">
        <span className="float-left ml-5 h5">{data?.name}</span>
        <div className="float-right mr-5 h5" ><LocalTime/></div>
      </Jumbotron>
    </>
  );
}