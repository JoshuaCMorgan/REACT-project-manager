import React, { useState } from "react";
import { Button } from "./Button";
import { nanoid } from "nanoid";
export function NewTask({ addTask, currentProject }) {
  const [task, setTask] = useState("");
  const { id, tasks } = currentProject;

  function handleChange(e) {
    setTask(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (task) {
      addTask([...tasks, { id: nanoid(), desc: task }], id);
      setTask("");
    }
    // reset values
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="taskInputContainer">
      <input
        type="text"
        className="taskInput"
        value={task}
        onChange={handleChange}
      />
      <Button type="submit" className="btn btnClear">
        add task
      </Button>
    </form>
  );
}
