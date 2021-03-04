import React, { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import './modal.css';

export function ModalForm() {
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
          <Modal.Title>Домашнее задание</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Русский язык 18.02.2021
          <InputGroup>
            <FormControl as="textarea" aria-label="With textarea" />
          </InputGroup>
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
