import { useEffect, useState } from "react";
import { Navbar, WelcomeScreen, ActiveProject } from "../components";
import { Project, ActiveProjectType } from "../types/types";
import { getToken } from "../utils";
import { PulseLoader } from "react-spinners";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [projects, setProjects] = useState(Array<Project>);
  const [activeProject, setActiveProject] = useState<ActiveProjectType>();
  const [loading, setLoading] = useState<boolean>(true);

  async function getProjects() {
    try {
      const response = await axios.get(`api/get-projects/${user.id}`, {
        headers: {
          Authorization: getToken(),
        },
      });

      if (response.status === 200) {
        setProjects(response.data.projects);
        setActiveProject(response.data.projects[0]);
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
          {projects.length === 0 ? (
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
