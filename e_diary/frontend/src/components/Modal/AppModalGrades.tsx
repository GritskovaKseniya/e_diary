import React, { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import './AppModal.css'; 

export function AppModalGrades(props: any) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="modal_button"onClick={handleShow}>
        text
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Оценки</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Русский язык 18.02.2021 {props.bodyText}
          <Form>
            <FormControl as="textarea" aria-label="With textarea" />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleClose}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}