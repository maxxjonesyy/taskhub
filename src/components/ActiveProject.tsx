import { useState } from "react";
import { Tasks } from "./index";
import { Project, ActiveProjectType, Task } from "../types/types";
import { PulseLoader } from "react-spinners";
import { dotsIcon, searchIcon } from "../assets/index";
import { renderAlert, warningAlert } from "../utils";
import { api } from "../utils";

interface Props {
  projects: Array<Project>;
  setProjects: Function;
  activeProject: ActiveProjectType;
  setActiveProject: Function;
}
function ActiveProject({
  projects,
  setProjects,
  activeProject,
  setActiveProject,
}: Props) {
  const [showProjectMenu, setShowProjectMenu] = useState<boolean>(false);
  const [queryTasks, setQueryTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let renameTimer: any;
  let queryTimer: any;

  return (
    <section
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        const projectMenu = document.getElementById("project-menu");
        if (!projectMenu?.contains(target)) setShowProjectMenu(false);
      }}
      className='flex flex-col items-start p-5'>
      <h1>{activeProject?.name}</h1>
      <div className='w-full md:max-w-[1920px] border-b-2 border-background-secondary pb-2'>
        <ul className='relative bottom-[1px] mt-8'>
          <li className='float-end'>
            {isLoading ? (
              <div className='relative bottom-[2px]'>
                <PulseLoader size={6} color='#ffffff' />
              </div>
            ) : (
              <img
                onClick={() => setShowProjectMenu(!showProjectMenu)}
                className='relative bottom-[2px] cursor-pointer'
                src={dotsIcon}
                alt='settings'
              />
            )}

            {showProjectMenu && (
              <aside
                id='project-menu'
                className='absolute mt-2 p-5 min-w-[275px] right-0 rounded-md bg-background-secondary shadow-xl z-[999]'>
                <div className='w-full inline-flex justify-between gap-2'>
                  <input
                    onChange={(event) => {
                      clearTimeout(renameTimer);
                      renameTimer = setTimeout(async () => {
                        const newProject = await api.renameProject(
                          event.target.value,
                          activeProject
                        );

                        if (newProject) {
                          const newProjectsArray = [
                            ...projects.filter((p) => p._id !== newProject._id),
                            newProject,
                          ];

                          setActiveProject(newProject);
                          setProjects(newProjectsArray);
                        } else {
                          renderAlert("error", "Error renaming project");
                        }
                      }, 800);
                    }}
                    className='w-full text-sm placeholder:text-primary bg-transparent hover:bg-background-accent transition-colors duration-300 focus:outline-none border border-secondary rounded-md p-2'
                    type='text'
                    placeholder={activeProject?.name as string}
                    maxLength={16}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      warningAlert(
                        `Are you sure you want to delete this project`,
                        async () => {
                          setIsLoading(true);
                          const newProjectsArray = await api.deleteProject(
                            activeProject
                          );

                          if (newProjectsArray) {
                            setProjects(newProjectsArray);
                            setActiveProject(newProjectsArray[0]);
                          }
                          setIsLoading(false);
                        }
                      );
                    }}
                    className='mt-5 w-full text-sm bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'>
                    {isLoading ? (
                      <span>Deleting project...</span>
                    ) : (
                      `Delete ${activeProject?.name}`
                    )}
                  </button>
                </div>
              </aside>
            )}
          </li>
          <li className='inline-flex md:float-end'>
            <img
              className='cursor-pointer'
              src={searchIcon}
              alt='search tasks'
            />

            <input
              onChange={(event) => {
                clearTimeout(queryTimer);
                setIsLoading(true);
                queryTimer = setTimeout(async () => {
                  if (activeProject) {
                    const queriedTasks = await api.searchTasks(
                      activeProject._id,
                      event.target.value
                    );
                    if (!queriedTasks) {
                      setQueryTasks([]);
                      setIsLoading(false);
                      return;
                    }

                    setQueryTasks(queriedTasks);
                    setIsLoading(false);
                  }
                }, 800);
              }}
              className='w-32 pl-2 bg-transparent text-sm placeholder:text-sm focus:outline-none'
              type='text'
              placeholder='Search tasks...'
            />
          </li>
        </ul>
      </div>

      <Tasks queryTasks={queryTasks} activeProject={activeProject} />
    </section>
  );
}

export default ActiveProject;
