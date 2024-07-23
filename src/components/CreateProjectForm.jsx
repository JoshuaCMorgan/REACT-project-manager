import { useState } from "react";
import { FormRow } from "./FormRow";
import { nanoid } from "nanoid";
export function CreateProjectForm({ handleCancel, addNewProject }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewProject(formData);
    // reset values
    event.currentTarget.reset();
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
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
          <button
            className="btn  btnClear"
            type="button"
            onClick={handleCancel}
          >
            cancel
          </button>
        </li>
        <li>
          <button className="btn" type="submit">
            save
          </button>
        </li>
      </menu>
    </form>
  );
}
