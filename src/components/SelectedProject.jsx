import { Tasks } from "./Tasks";
import { Button } from "./Button";

export function SelectedProject({
  currentProject,
  addTask,
  clearTask,
  deleteProject,
}) {
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
      <Tasks
        addTask={addTask}
        currentProject={currentProject}
        clearTask={clearTask}
      />
    </div>
  );
}
