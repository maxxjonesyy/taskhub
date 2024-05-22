import { useEffect, useState } from "react";
import { Navbar, WelcomeScreen, ActiveProject } from "../components";
import { ActiveProjectType } from "../types/types";
import { PulseLoader } from "react-spinners";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState<ActiveProjectType>();
  const [loading, setLoading] = useState<boolean>(true);

  async function getProjects() {
    try {
      const response = await axios.get(`api/get-projects/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        const projectsLength = response.data.projects.length - 1;
        const storedProject = sessionStorage.getItem("activeProject");
        setProjects(response.data.projects);

        if (storedProject) setActiveProject(JSON.parse(storedProject));
        else setActiveProject(response.data.projects[projectsLength]);
      }
    } catch (error: any) {
      console.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProjects();
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
          {projects.length >= 1 ? (
            <ActiveProject project={activeProject} />
          ) : (
            <WelcomeScreen
              user={user}
              projects={projects}
              setProjects={setProjects}
            />
          )}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
