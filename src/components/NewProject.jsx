import { useState, useRef } from "react";
import { FormRow } from "./FormRow";
import { Button } from "./Button";
import Modal from "./Modal";
export function NewProject({ onCancel, addNewProject }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const modal = useRef();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function convertDate() {
    let [year, month, day] = formData.date.split("-");

    month = Intl.DateTimeFormat("en", { month: "short" }).format(
      new Date(month)
    );
    formData.date = `${month} ${day}, ${year}`;
  }

  function formFieldsResult() {
    return Object.values(formData).every((value) => value.length > 0);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!formFieldsResult()) {
      modal.current.open();
      return false;
    }

    convertDate();
    addNewProject(formData);
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2>Invalid Input</h2>
        <p>Oops ... looks like you forgot to enter a value.</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <form className="form">
        <FormRow
          type="text"
          name="title"
          labelText="title"
          onChange={handleChange}
        />
        <FormRow
          name="description"
          labelText="description"
          onChange={handleChange}
          textarea
        />
        <FormRow
          type="date"
          name="date"
          labelText="date"
          onChange={handleChange}
        />
        <menu className="buttonGroup">
          <li>
            <Button className="btn  btnClear" onClick={onCancel}>
              cancel
            </Button>
          </li>
          <li>
            <Button type="button" onClick={handleSubmit}>
              save
            </Button>
          </li>
        </menu>
      </form>
    </>
  );
}
