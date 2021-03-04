import React, { useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { ModalForm } from "./Modal/modal";

export function Main() {
  return (
    <>
      <Container>
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
              <td>
                <ModalForm/>
              </td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
        <AlertDismissibleExample />
      </Container>
    </>
  );
}

function AlertDismissibleExample() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        Чтобы заполнить домашнее задание, кликните по нужному полю.
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
