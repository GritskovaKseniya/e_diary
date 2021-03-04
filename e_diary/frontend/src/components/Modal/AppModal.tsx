import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";

export function AppModal(props: any) {
    return(
      <Modal show={props.show} onHide={props.onHide}>
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
          <Button variant="danger" onClick={props.onHide}>
            Отмена
          </Button>
          <Button variant="success" onClick={props.onHide}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    );
}