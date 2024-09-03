import React, { useState } from "react";
import { Button } from "./Button";
import { nanoid } from "nanoid";
export function NewTask({ addTask, currentProject }) {
  const [enteredTask, setEnteredTask] = useState("");
  const { id, tasks } = currentProject;

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (enteredTask) {
      addTask([...tasks, { id: nanoid(), desc: enteredTask }], id);
      setEnteredTask("");
    }
    // reset values
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="taskInputContainer">
      <input
        type="text"
        className="taskInput"
        value={enteredTask}
        onChange={handleChange}
      />
      <Button type="submit" className="btn btnClear">
        add task
      </Button>
    </form>
  );
}
