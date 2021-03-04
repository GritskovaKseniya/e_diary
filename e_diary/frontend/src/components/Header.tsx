import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Header(){
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">E-DIARY</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Главная</Link></Nav.Link>
                    <Nav.Link><Link to="/timetable">Расписание</Link></Nav.Link>
                    <Nav.Link><Link to="/progress_table">Журнал</Link></Nav.Link>
                    <Nav.Link><Link to="/quit">Выход</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}