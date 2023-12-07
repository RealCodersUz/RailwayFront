import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AdminModal = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log("submit");
    // Logic for creating/editing admin. You can perform API calls or state management here.
    // handleClose();
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый профиль</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Филиал: </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Ответственное лицо</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Пароль еще раз</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Назад
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminModal;
