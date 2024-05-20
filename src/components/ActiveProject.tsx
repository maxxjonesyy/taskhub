import { TaskCard } from "./index";
import { ActiveProjectType } from "../types/types";

function ActiveProject({ project }: { project: ActiveProjectType }) {
  return (
    <section className='flex flex-col items-start p-5'>
      <h1 className='w-full md:w-3/4 border-b-2 border-background-secondary pb-3'>
        {project?.name}
      </h1>

      <div className='w-full'>
        <TaskCard theme='notStarted' title='Not started' />
        <TaskCard theme='inProgress' title='In progress' />
        <TaskCard theme='done' title='Done' />
      </div>
    </section>
  );
}

export default ActiveProject;
