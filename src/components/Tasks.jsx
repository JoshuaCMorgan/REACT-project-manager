import React from "react";
import { NewTask } from "./NewTask";
import { Button } from "./Button";
export function Tasks({ addTask, currentProject, clearTask }) {
  const { id, tasks } = currentProject;
  return (
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
  );
}
