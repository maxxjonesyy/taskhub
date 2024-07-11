import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, WelcomeScreen, ActiveProject } from "../components";
import { Project, ActiveProjectType } from "../types/types";
import { auth, api } from "../utils/index";
import { PulseLoader } from "react-spinners";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const user = auth.getUser();
  const [projects, setProjects] = useState(Array<Project>);
  const [activeProject, setActiveProject] = useState<ActiveProjectType>();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    api.getProjects(setProjects, setActiveProject, setIsLoading);
  }, []);

  return (
    <section className='min-h-screen flex flex-col'>
      <Navbar
        user={user}
        projects={projects}
        setProjects={setProjects}
        setActiveProject={setActiveProject}
      />

      {isLoading ? (
        <div className='flex flex-1 items-center justify-center'>
          <PulseLoader color='#fff' size={12} />
        </div>
      ) : (
        <div className='flex-1 p-5'>
          {projects.length > 0 ? (
            <ActiveProject
              projects={projects}
              setProjects={setProjects}
              setActiveProject={setActiveProject}
              activeProject={activeProject}
            />
          ) : (
            <WelcomeScreen
              user={user}
              projects={projects}
              setProjects={setProjects}
              setActiveProject={setActiveProject}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
