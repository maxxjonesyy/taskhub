import { TaskCard } from "./index";
import { ActiveProjectType } from "../types/types";

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
    <section className='flex flex-col items-start p-5'>
      <h1>{project?.name}</h1>

      <div className='w-full md:max-w-[1920px] border-b-2 border-background-secondary pb-2'>
        <ul className='relative bottom-[1px]'>
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
            <img
              className='cursor-pointer'
              src='src/assets/icons/dots.svg'
              alt='settings'
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
