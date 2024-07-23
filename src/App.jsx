import { Project } from "./components/Project";
import { useState } from "react";
import { Home } from "./components/Home";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./components/useLocalStorage";

function App() {
  /*
  currentAction: "nothing-selected" | "project-page" | create-project"
*/
  const [currentAction, setCurrentAction] = useState("nothing-selected");
  const [selectedProjectId, setSelectedProjectId] = useState(undefined);
  const [projects, setProjects] = useLocalStorage("projects", []);

  // const [projectsState, setProjectsState] = useState({
  //   currentAction: "nothing-selected",
  //   selectedProjectId: undefined,
  //   projects: useLocalStorage("projects", []),
  // });

  const renderContent = () => {
    switch (currentAction) {
      case "create-project":
        return (
          <CreateProjectForm
            handleCancel={() => {
              setCurrentAction("nothing-selected");
            }}
            addNewProject={(formData) => {
              setProjects((prevState) => {
                return [...prevState, { id: nanoid(), title: formData.title }];
              });
              setCurrentAction("nothing-selected");
            }}
          />
        );
      case "project-page":
        const currentProject = projects.find(
          (project) => project.id === selectedProjectId
        );

        return <Project {...currentProject} />;
      default:
        return (
          <Home
            handleNewProject={() => {
              setCurrentAction("create-project");
            }}
          />
        );
    }
  };

  return (
    <div className="pageContainer">
      <ProjectsSidebar
        handleCreateProject={() => {
          setCurrentAction("create-project");
        }}
        projects={projects}
        setSelectedProject={(id) => {
          setSelectedProjectId(id);
          setCurrentAction("project-page");
        }}
      />
      <main className="main">{renderContent()}</main>
    </div>
  );
}

export default App;
