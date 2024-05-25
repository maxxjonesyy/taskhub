import { useEffect, useState } from "react";
import { Navbar, WelcomeScreen, ActiveProject } from "../components";
import { PulseLoader } from "react-spinners";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getProjects() {
    try {
      const response = await axios.get(`api/get-projects/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setProjects(response.data.projects);
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
      <Navbar user={user} projects={projects} setProjects={setProjects} />

      {loading ? (
        <div className='flex-1 flex items-center justify-center'>
          <PulseLoader color='#FFFFFF' size={12} />
        </div>
      ) : (
        <div className='flex-1 p-5'>
          {projects.length >= 1 ? (
            <ActiveProject
              user={user}
              projects={projects}
              setProjects={setProjects}
              displayedProject={projects[0]}
            />
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
