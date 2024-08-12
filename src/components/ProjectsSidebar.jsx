import { useState } from "react";
import { Button } from "./Button";
import close from "../assets/close.svg";
import open from "../assets/menu.svg";
export function ProjectsSidebar({ onStartProject, projects, onSelectProject }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sidebarContainer">
      <div className="fixedContainer">
        <header className="header">
          <h2 className="title">OC Projects</h2>
          <button
            className="menuButton"
            type="button"
            onClick={() => {
              setMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <img
              src={isMobileMenuOpen ? close : open}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              className="menuIcon"
            />
          </button>
        </header>
        <div
          className={`menuOverlay ${
            isMobileMenuOpen ? "isMobileMenuOpen" : undefined
          }`}
        ></div>
        <nav
          className={`nav ${isMobileMenuOpen ? "isMobileMenuOpen" : undefined}`}
        >
          <h3 className="title projectsTitle">your projects</h3>
          <Button
            onClick={() => {
              isMobileMenuOpen && setMobileMenuOpen(false);
              onStartProject();
            }}
          >
            + add project
          </Button>
          <ul className="navLinks">
            {projects.map((project) => {
              const { id, title } = project;
              return (
                <li className="navLink" key={id}>
                  <button
                    className="navBtn"
                    onClick={() => {
                      isMobileMenuOpen && setMobileMenuOpen(false);
                      onSelectProject(id);
                    }}
                  >
                    {title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
