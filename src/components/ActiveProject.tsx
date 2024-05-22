import { TaskCard } from "./index";
import { ActiveProjectType } from "../types/types";

function ActiveProject({ project }: { project: ActiveProjectType }) {
  return (
    <section className='flex flex-col items-start p-5'>
      <h1>{project?.name}</h1>

      <div className='w-full md:w-3/4 border-b-2 border-background-secondary pb-2'>
        <ul>
          <li className='float-end cursor-pointer'>
            <img
              className='relative inline-block pr-2 bottom-[1px]'
              src='src/assets/icons/settings.svg'
              alt='project settings'
            />
            <span>Settings</span>
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
