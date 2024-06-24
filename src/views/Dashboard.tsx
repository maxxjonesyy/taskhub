import { useEffect, useState } from "react";
import { Navbar, WelcomeScreen, ActiveProject } from "../components";
import { Project, ActiveProjectType } from "../types/types";
import { PulseLoader } from "react-spinners";
import { auth, api } from "../utils/index";

function Dashboard() {
  const user = auth.getUser();
  const [projects, setProjects] = useState(Array<Project>);
  const [activeProject, setActiveProject] = useState<ActiveProjectType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getProjects(setProjects, setActiveProject, setLoading);
  }, []);

  return (
    <section className='min-h-screen flex flex-col'>
      <Navbar
        user={user}
        projects={projects}
        setProjects={setProjects}
        setActiveProject={setActiveProject}
      />

      {loading ? (
        <div className='flex-1 flex items-center justify-center'>
          <PulseLoader color='#FFFFFF' size={12} />
        </div>
      ) : (
        <div className='flex-1 p-5'>
          {projects && projects.length === 0 ? (
            <WelcomeScreen
              user={user}
              projects={projects}
              setProjects={setProjects}
              setActiveProject={setActiveProject}
            />
          ) : (
            <ActiveProject
              projects={projects}
              setProjects={setProjects}
              setActiveProject={setActiveProject}
              activeProject={activeProject}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
