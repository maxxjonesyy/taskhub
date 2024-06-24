import { useState } from "react";
import { User } from "../types/types";
import { PulseLoader } from "react-spinners";
import { api } from "../utils";

interface Props {
  user: User;
  projects: Array<Object>;
  setProjects: Function;
  setActiveProject: Function;
}

function WelcomeScreen({
  user,
  projects,
  setProjects,
  setActiveProject,
}: Props) {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateProject() {
    setLoading(true);

    try {
      const { data, error } = await api.createProject(projectName, user);

      if (data) {
        setProjects([data.project, ...projects]);
        setActiveProject(data.project);
      }
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='flex flex-col items-start p-5'>
      <h1 className='w-full md:w-3/4 border-b-2 border-background-secondary pb-3'>
        Welcome to Taskhub!
      </h1>

      <p className='text-lg'>
        Create projects, add tasks, and keep track of your workload
        systematically.
      </p>

      <div className='mt-5'>
        <input
          className='bg-transparent border border-secondary rounded-md p-3 placeholder:secondary'
          type='text'
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder='Project name'
          required
        />

        <button
          onClick={handleCreateProject}
          className='ml-3 bg-transparent border border-secondary rounded-md py-3 px-5 font-medium shadow-lg transition-transform hover:scale-105'>
          {loading ? <PulseLoader color='#FFFFFF' size={8} /> : "Create"}
        </button>
      </div>

      <span className='mt-5 text-secondary'>
        Created by{" "}
        <a
          className='text-accent underline'
          href='https://github.com/maxxjonesyy'
          target='_blank'>
          Max Jones
        </a>
      </span>
    </section>
  );
}

export default WelcomeScreen;
