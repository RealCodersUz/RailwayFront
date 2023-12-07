/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ChanceModal(props) {
  const reportsData = [
    { name: "Тип", key: "" },
    { name: "Отчеты", key: "reports" },
    { name: "Форма 69", key: "forma69" },
    { name: "Основные инструменты", key: "insurments" },
    { name: "Материальный отчет", key: "material-reports" },
    { name: "Налог", key: "nalog" },
  ];

  const FilialData = [
    { name: "Филиал", key: "" },
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
          <form className="input-group my-5 ">
            <select
              className="form-select form-select-lg mb-3 border-primary rounded mx-2"
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
              className="form-select form-select-lg mb-3 border-primary rounded mx-2"
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
            {/* <input
              type="date"
              className="form-control mx-3 rounded border-primary"
            /> */}
            <select
              className="form-select form-select-lg mb-3 border-primary rounded mx-2"
              aria-label="Large select example"
            >
              <option selected disabled> Открыть</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            {/* <button
              className="btn btn-success rounded-3xl"
              type="submit"
            ></button> */}
            <Button
              variant="success"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              aria-label="rounded-green-button"
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ChanceModal;
