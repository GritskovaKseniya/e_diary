import React from "react";
import { Container, Table } from "react-bootstrap";

export function Timetable() {
  return (
    <>
    <Container>
      <h5>Titetable</h5> 
        <Table bordered hover> 
            <thead>
                <tr>
                    <th>#</th>
                    <th>Предмет</th>
                    <th>Класс</th>
                    <th>Домашнее задание</th>
                    <th>Комментарий преподавателя</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Русский язык</td>
                    <td>5 класс</td>
                    <td>упр.193, синтаксический разбор предложений, стр.82 учить правило</td>
                    <td>принести двойной листик в линию</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td></td>
                    <td>Larry the Bird</td>
                    <td>@fat</td>
                    <td>@fat</td>
                </tr>
            </tbody>
        </Table>
    </Container>
    </>
);
}