import { Project } from "./components/Project";
import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { nanoid } from "nanoid";

const currentProjects = JSON.parse(localStorage.getItem("projects")) ?? [];

function App() {
  const [projectsState, setProjectsState] = useState({
    currentAction: "nothing-selected",
    selectedProjectId: undefined,
    projects: currentProjects,
  });

  let { currentAction, selectedProjectId, projects } = projectsState;

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function handleStartProject() {
    setProjectsState((prevState) => {
      return { ...prevState, currentAction: "create-project" };
    });
  }

  function handleAddNewProject(formData) {
    const updatedProjects = [
      ...projects,
      {
        id: nanoid(),
        title: formData.title,
        description: formData.description,
        tasks: [],
      },
    ];

    setProjectsState((prevState) => {
      return {
        ...prevState,
        currentAction: "nothing-selected",
        projects: updatedProjects,
      };
    });
  }

  function addTask(tasks) {
    const currentProject = getCurrentProject();
    currentProject.tasks = tasks;
    showProject(selectedProjectId);
  }

  function getCurrentProject() {
    return projects.find((project) => project.id === selectedProjectId);
  }

  function removeProjectTask(taskId, project) {
    project.tasks = project.tasks.filter((task) => task.id !== taskId);
  }

  function showProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
        currentAction: "project-page",
      };
    });
  }

  function clearTask(taskId) {
    const currentProject = getCurrentProject();
    removeProjectTask(taskId, currentProject);
    showProject(currentProject.id);
  }

  function handleCancelProject() {
    setProjectsState((prevState) => {
      return { ...prevState, currentAction: "nothing-selected" };
    });
  }

  const renderContent = () => {
    switch (currentAction) {
      case "create-project":
        return (
          <CreateProjectForm
            onCancel={handleCancelProject}
            addNewProject={handleAddNewProject}
          />
        );
      case "project-page":
        const currentProject = getCurrentProject();
        return (
          <Project
            currentProject={currentProject}
            addTask={addTask}
            clearTask={clearTask}
          />
        );
      default:
        return <Home onStartProject={handleStartProject} />;
    }
  };

  return (
    <div className="pageContainer">
      <ProjectsSidebar
        onStartProject={handleStartProject}
        projects={projects}
        onSelectProject={showProject}
      />
      <main className="main">{renderContent()}</main>
    </div>
  );
}

export default App;
