import { NewTask } from "./NewTask";
import { useState } from "react";
import { Button } from "./Button";
import { nanoid } from "nanoid";

export function SelectedProject({
  currentProject,
  addTask,
  clearTask,
  deleteProject,
}) {
  const { id, title, date, description, tasks } = currentProject;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="contentContainer">
      <header className="projectHeader">
        <div className="projectHeaderContent">
          <h2 className="title">{title}</h2>
          <Button className="btn btnClear" onClick={deleteProject}>
            Delete
          </Button>
        </div>
        <p className="date">{formattedDate}</p>
        <p className="description">{description}</p>
      </header>
      <section className="projectTasks">
        <h2>Tasks</h2>
        <NewTask addTask={addTask} currentProject={currentProject} />
        <div className="showTasks">
          {!tasks.length > 0 ? (
            <p className="message">This project does not have any tasks yet.</p>
          ) : (
            <div className="tasks">
              {tasks.map((task) => {
                return (
                  <ul key={task.id} className="task">
                    <p>{task.desc}</p>
                    <Button
                      className="btn btnClear"
                      onClick={() => {
                        clearTask(task.id, id);
                      }}
                    >
                      clear
                    </Button>
                  </ul>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
