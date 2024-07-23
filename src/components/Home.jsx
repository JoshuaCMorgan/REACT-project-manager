import { Button } from "./Button";
import React from "react";
import task from "../assets/task.svg";
export function Home({ handleNewProject }) {
  return (
    <section className="createContainer">
      <img className="imgTask" src={task} alt="task" />
      <h2 className="title">no project selected</h2>
      <p>Select a project or get started with a new one</p>
      <Button onClick={handleNewProject}>create new project</Button>
    </section>
  );
}
