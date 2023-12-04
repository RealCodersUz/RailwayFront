/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ChanceModal(props) {
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

  const [TypeSelectedValue, setTypeSelectedValue] = useState("");
  const [FilialSelectedValue, setFilialSelectedValue] = useState("");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Контроль подчинение
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className=" p-5">
          <div className="input-group my-5 ">
            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
              //   value={TypeSelectedValue}
              defaultValue={FilialSelectedValue}
            >
              {FilialData.map((data, index) => (
                <option key={index} value={data.key} disabled={data.key == ""}>
                  {data.name}
                </option>
              ))}
            </select>

            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
              //   value={TypeSelectedValue}
              defaultValue={TypeSelectedValue}
            >
              {reportsData.map((data, index) => (
                <option key={index} value={data.key} disabled={data.key == ""}>
                  {data.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="form-control mx-3 rounded border-primary"
            />
            <button className="btn btn-primary mx-3 w-25 rounded" type="button">
              Поиск
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ChanceModal;
