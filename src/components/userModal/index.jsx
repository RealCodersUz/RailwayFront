/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

function UserModal(props) {
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

  // Sample user data
  const users = [
    { id: 1, name: "John Doe", email: "********" },
    { id: 2, name: "Jane Smith", email: "********" },
    { id: 3, name: "Bob Johnson", email: "********" },
  ];

  const [TypeSelectedValue, setTypeSelectedValue] = useState("");
  const [FilialSelectedValue, setFilialSelectedValue] = useState("");

  const handleEdit = () => {
    console.log("delete");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center d-flex justify-center w-100">
          Контроль профили
        </Modal.Title>
      </Modal.Header>
      <div className="w-100 d-flex justify-content-end">
        <button className="btn btn-primary w-25 ml-auto m-2">Добавить</button>
      </div>
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
                <td>{user.name}</td>
                <td>{user.name}</td>
                <td>
                  {user.email} <FaRegEye /> <FaRegEyeSlash />
                </td>
                <td className="text-center ">
                  <Button
                    variant="success"
                    onClick={() => handleEdit(user.id)}
                    className="mx-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                    className="mx-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
}

export default UserModal;
