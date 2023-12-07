/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaRegEyeSlash, FaTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import AdminModal from "../adminModal";
// import { Form } from "react-router-dom";

function UserModal(props) {
  const [users, setUsers] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [showUserRole, setShowUserRole] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const reportsData = [
    { name: "Филиал", key: "" },
    { name: "Отчеты", key: "reports" },
    { name: "Форма 69", key: "forma69" },
    { name: "Основные инструменты", key: "insurments" },
    { name: "Материальный отчет", key: "material-reports" },
    { name: "Налог", key: "nalog" },
  ];

  const FilialData = [
    { name: "Тип", key: "" },
    { name: "Sirdaryo", key: "sirdaryo" },
    { name: "Toshkent", key: "tashkent" },
    { name: "Namangan", key: "namangan" },
    { name: "Xorazm", key: "xorazm" },
    { name: "Samarqand", key: "samarqand" },
  ];

  let data = JSON.stringify({
    name: name,
    branch_name: branch,
    username: login,
    password: password,
  });

  let configAddAdmin = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://railwayback.up.railway.app/users",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://railwayback.up.railway.app/users",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };
  const handleAdminModalClose = () => {
    setModalShow(false);
  };

  const handlePasswordSubmit = () => {
    // Check if the entered password is correct (e.g., "1234")
    if (enteredPassword === "1234") {
      setIsPasswordCorrect(true);
      toast("Siz kiritgan parol to'g'ri :)", { type: "warning" });
    } else {
      setIsPasswordCorrect(false);
      toast("Yaxshimas... Xack qilmoqchimisan mol :(", { type: "warning" });
    }

    // Clear the entered password
    setEnteredPassword("");

    // Close the password modal
    setShowPasswordModal(false);
  };

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data) setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = () => {
    console.log("submit");
    if (password === password2) {
      axios
        .request(configAddAdmin)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      toast("Admin added!!!", { type: "success" });
    } else {
      toast("password is wrong!!!", { type: "warning" });
    }

    // Logic for creating/editing admin. You can perform API calls or state management here.
    // handleClose();
  };
  return (
    <>
      {/* <Modal centered show={modalShow} onHide={setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>qqqq</p>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal show={modalShow} onHide={handleAdminModalClose} centered>
        {/* <Modal {...props}> */}
        <Modal.Header closeButton>
          <Modal.Title>Добавить новый профиль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Филиал: </Form.Label>
              <Form.Control
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
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
              <Form.Label>Логин </Form.Label>
              <Form.Control
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Пароль еще раз</Form.Label>
              <Form.Control
                type="text"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAdminModalClose}>
            Назад
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showPasswordModal}
        onHide={handlePasswordModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center d-flex justify-center w-100">
            Контроль профилей
          </Modal.Title>
        </Modal.Header>
        <div className="w-100 d-flex justify-content-end">
          <button
            className="btn btn-primary w-25 ml-auto m-2"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Добавить
          </button>
        </div>
        {/* <AdminModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        ></AdminModal> */}
        <Modal.Body>
          <Table hover>
            <thead>
              <tr>
                <th></th>
                <th>Филиал</th>
                <th>Логин</th>
                <th>Пароль</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.branch_name}</td>
                  <td>{user.username}</td>
                  <td>
                    {isPasswordCorrect
                      ? showUserRole
                        ? user.role
                        : null
                      : null}{" "}
                    <FaRegEye
                      onClick={() => {
                        setCurrentUser(user);
                        setShowUserRole(true);
                        setShowPasswordModal(true);
                      }}
                    />
                    <FaRegEyeSlash
                      onClick={() => {
                        setShowUserRole(false);
                      }}
                    />
                  </td>
                  <td className="text-center ">
                    <Button
                      variant="success"
                      onClick={() => handleEdit(user.id)}
                      className="mx-2"
                    >
                      <FaEdit />
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}
                      className="mx-2"
                    >
                      <FaTrashAlt />
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserModal;
