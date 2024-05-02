import { useEffect, useState } from "react";
import { Navbar } from "../components";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [projects, setProjects] = useState([]);

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
    }
  }

  useEffect(() => {
    getProjects();
  }, [projects]);

  return (
    <section className='flex flex-col'>
      <Navbar user={user} projects={projects} setProjects={setProjects} />

      <div className='flex-1 p-5'>
        <p>Dashboard goes here</p>
      </div>
    </section>
  );
}

export default Dashboard;
