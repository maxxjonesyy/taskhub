import { useState } from "react";
import { TaskCard } from "./index";
import { User, DisplayedProject } from "../types/types";
import { deleteProject } from "../utils";
import axios from "axios";

function ActiveProject({
  user,
  projects,
  setProjects,
  displayedProject,
}: {
  user: User;
  projects: Array<DisplayedProject>;
  setProjects: Function;
  displayedProject: DisplayedProject;
}) {
  const [showProjectMenu, setShowProjectMenu] = useState<boolean>(false);

  let timer: any;
  async function renameProject(projectName: string, project: DisplayedProject) {
    try {
      const response = await axios.patch(
        "api/rename-project/",
        {
          projectId: project?._id,
          projectName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        setProjects(data);
      }
    } catch (error) {
      setProjects(projects);
    }
  }

  return (
    <section
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        const projectMenu = document.getElementById("project-menu");
        if (!projectMenu?.contains(target)) setShowProjectMenu(false);
      }}
      className='flex flex-col items-start p-5'>
      <h1>{displayedProject?.name}</h1>
      <div className='w-full md:max-w-[1920px] border-b-2 border-background-secondary pb-2'>
        <ul className='relative bottom-[1px]'>
          <li className='float-end'>
            <img
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className='cursor-pointer'
              src='src/assets/icons/dots.svg'
              alt='settings'
            />

            {showProjectMenu && (
              <aside
                id='project-menu'
                className='absolute mt-2 p-5 min-w-[275px] right-0 rounded-md bg-background-secondary shadow-xl z-[999]'>
                <div className='w-full inline-flex justify-between gap-2'>
                  <input
                    onChange={(event) => {
                      clearTimeout(timer);
                      timer = setTimeout(() => {
                        renameProject(event.target.value, displayedProject);
                      }, 800);
                    }}
                    className='w-full text-sm placeholder:text-primary bg-transparent hover:bg-background-accent transition-colors duration-300 focus:outline-none border border-secondary rounded-md p-2'
                    type='text'
                    placeholder={displayedProject?.name as string}
                    maxLength={16}
                  />
                </div>
                <div>
                  <button
                    onClick={async () => {
                      await deleteProject(user, displayedProject).then(
                        (newProjectsArray) => {
                          if (newProjectsArray.length > 0)
                            setProjects(newProjectsArray);
                        }
                      );
                    }}
                    className='mt-5 w-full text-sm bg-transparent border border-secondary rounded-md p-2 font-medium shadow-lg transition-transform hover:scale-105'>
                    Delete {displayedProject?.name}
                  </button>
                </div>
              </aside>
            )}
          </li>
          <li className='inline-flex float-end'>
            <img
              className='cursor-pointer'
              src='src/assets/icons/search.svg'
              alt='search tasks'
            />
            <input
              className='w-32 pl-2 bg-transparent text-sm placeholder:text-sm focus:outline-none'
              type='text'
              placeholder='Search tasks...'
            />
          </li>
        </ul>
      </div>

      <div className='w-full flex flex-wrap gap-3'>
        <TaskCard theme='notStarted' title='Not started' />
        <TaskCard theme='inProgress' title='In progress' />
        <TaskCard theme='done' title='Done' />
      </div>
    </section>
  );
}

export default ActiveProject;
