import { TaskCard } from "./index";
import { ActiveProjectType } from "../types/types";

function ActiveProject({ project }: { project: ActiveProjectType }) {
  return (
    <section className='flex flex-col items-start p-5'>
      <h1>{project?.name}</h1>

      <div className='w-full md:max-w-[1920px] border-b-2 border-background-secondary pb-2'>
        <ul className='relative bottom-[1px]'>
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
