import { useState, useRef } from "react";
import { FormRow } from "./FormRow";
import { Button } from "./Button";
import Modal from "./Modal";
export function NewProject({ onCancel, addNewProject }) {
  const modal = useRef();

  function checkEmptyValues(formData) {
    return Object.values(formData).every((value) => value.length > 0);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formToObject = Object.fromEntries(formData);

    if (!checkEmptyValues(formToObject)) {
      modal.current.open();
      return false;
    }

    addNewProject(formToObject);
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2>Invalid Input</h2>
        <p>Oops ... looks like you forgot to enter a value.</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <form onSubmit={handleSubmit} className="form">
        <FormRow type="text" name="title" labelText="title" />
        <FormRow name="description" labelText="description" textarea />
        <FormRow type="date" name="date" labelText="date" />
        <menu className="buttonGroup">
          <li>
            <Button className="btn  btnClear" onClick={onCancel}>
              cancel
            </Button>
          </li>
          <li>
            <Button type="submit">save</Button>
          </li>
        </menu>
      </form>
    </>
  );
}
