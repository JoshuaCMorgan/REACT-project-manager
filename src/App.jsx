import { SelectedProject } from "./components/SelectedProject";
import { useState, useEffect } from "react";
import { NoProjectSelected } from "./components/NoProjectedSelected";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { NewProject } from "./components/NewProject";
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
        date: formData.date,
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

  function deleteProject() {
    const updatedProjects = projects.filter(
      (project) => project.id !== selectedProjectId
    );
    setProjectsState(() => {
      return {
        currentAction: "nothing-selected",
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
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
          <NewProject
            onCancel={handleCancelProject}
            addNewProject={handleAddNewProject}
          />
        );
      case "project-page":
        const currentProject = getCurrentProject();
        return (
          <SelectedProject
            currentProject={currentProject}
            addTask={addTask}
            clearTask={clearTask}
            deleteProject={deleteProject}
          />
        );
      default:
        return <NoProjectSelected onStartProject={handleStartProject} />;
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
