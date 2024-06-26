import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PulseLoader } from "react-spinners";
import { Project, User } from "../types/types";
import { warningAlert } from "../utils";
import { logo, plusIcon, projectsIcon, settingsIcon } from "../assets/index";
import { auth, api } from "../utils//index";

interface Props {
  user: User;
  projects: Array<Project>;
  setProjects: Function;
  setActiveProject: Function;
}

function Navbar({ user, projects, setProjects, setActiveProject }: Props) {
  const [menu, setMenu] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const nav = document.querySelector("nav");

    function handleOutsideClick(event: any) {
      if (!nav?.contains(event.target)) setMenu("");
    }
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className='mx-auto w-full p-5 border-b-2 border-background-accent'>
      <ul className='flex items-center justify-center md:justify-start gap-8 font-bold p-2'>
        <li className='mt-2'>
          <img
            className='max-w-[100px] md:max-w-[300px]'
            width={200}
            src={logo}
            alt='taskhub logo'
          />
        </li>
        <li
          onClick={() => setMenu(menu === "settings" ? "" : "settings")}
          className='relative inline-flex gap-2 hover:cursor-pointer'>
          <img src={settingsIcon} alt='toggle settings menu' />
          <span>Settings</span>
        </li>
        <li
          onClick={() => setMenu(menu === "projects" ? "" : "projects")}
          className='inline-flex gap-2 hover:cursor-pointer'>
          <img src={projectsIcon} alt='toggle projects menu' />
          <span>Projects</span>
        </li>
      </ul>

      {menu === "settings" && (
        <aside className='absolute mt-5 p-5 w-[325px] rounded-md bg-background-secondary shadow-xl z-[999]'>
          <p className='text-secondary'>
            Logged in as {""}
            <span className='font-bold text-primary'>{user.username}</span>
          </p>
          <button
            className='mt-5 w-full bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'
            onClick={() =>
              warningAlert("This will delete your account", () =>
                auth.deleteAccount(user)
              )
            }>
            Delete account
          </button>
          <button
            className='mt-5 w-full bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'
            onClick={logout}>
            Logout
          </button>
        </aside>
      )}

      {menu === "projects" && (
        <aside className='absolute mt-5 p-5 w-[325px] rounded-md bg-background-secondary shadow-xl z-[999]'>
          <button
            onClick={() => {
              const createProject = document.getElementById("create-project");
              createProject?.classList.remove("hidden");
              createProject?.classList.add("inline-flex");
            }}
            className='w-full inline-flex items-center justify-center gap-2 bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'>
            <img src={plusIcon} alt='create project' />
            <span>Create Project</span>
          </button>

          <div id='create-project' className='hidden w-full gap-2 text-sm mt-5'>
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className='flex-1 bg-transparent border border-secondary rounded-md p-2'
              type='text'
              placeholder='Project name'
              maxLength={16}
              minLength={3}
            />
            <button
              type='submit'
              onClick={async () => {
                setLoading(true);

                const response = await api.createProject(projectName, user);

                if (response) {
                  setProjects([response.data.project, ...projects]);
                  setActiveProject(response.data.project);
                }

                setMenu("");
                setProjectName("");
                setLoading(false);
              }}
              className='w-full bg-accent rounded-md p-2 ml-2 transition-transform hover:scale-105'>
              {loading ? <PulseLoader color='#FFFFFF' size={6} /> : "Create"}
            </button>
          </div>

          <ul>
            <li>
              <h1 className='text-lg mt-5 w-1/2 font-bold border-b border-secondary pb-2'>
                Projects
              </h1>
            </li>
            {projects && projects.length > 0 ? (
              projects.map((project: Project) => {
                return (
                  <li
                    onClick={() => {
                      setActiveProject(project);
                      setMenu("");
                    }}
                    key={project._id}
                    className='mt-5 p-2 transition-colors cursor-pointer hover:bg-accent rounded-md'>
                    <span className='text-sm'>{project.name}</span>
                  </li>
                );
              })
            ) : (
              <li className='mt-5 p-2'>
                <span className='text-secondary'>No projects found.</span>
              </li>
            )}
          </ul>
        </aside>
      )}
    </nav>
  );
}

export default Navbar;
