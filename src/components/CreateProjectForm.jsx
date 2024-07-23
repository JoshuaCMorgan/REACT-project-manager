import { useState } from "react";
import { FormRow } from "./FormRow";
import { Button } from "./Button";

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
          <Button className="btn  btnClear" onClick={handleCancel}>
            cancel
          </Button>
        </li>
        <li>
          <Button type="submit">save</Button>
        </li>
      </menu>
    </form>
  );
}
