import { useState } from "react";
import { Home } from "./components/Home";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { CreateProjectForm } from "./components/CreateProjectForm";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./components/useLocalStorage";

function App() {
  /*
  currentAction: "nothing-selected" | "add-tasks" | create-project"
*/
  const [currentAction, setCurrentAction] = useState("nothing-selected");
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [projects, setProjects] = useLocalStorage("projects", []);

  // const [projectsState, setProjectsState] = useState({
  //   currentAction: "nothing-selected",
  //   selectedProject: undefined,
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
      />
      <main className="main">{renderContent()}</main>
    </div>
  );
}

export default App;
