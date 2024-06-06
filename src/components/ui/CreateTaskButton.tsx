function CreateTaskButton({
  taskPanelRef,
  showTaskPanel,
}: {
  taskPanelRef: any;
  showTaskPanel: Function;
}) {
  return (
    <button
      id='toggle-panel'
      onClick={() => showTaskPanel(taskPanelRef)}
      className='transition-colors duration-300 hover:text-secondary'>
      <img
        className='relative inline-block pr-1 bottom-[1px]'
        src='./src/assets/icons/plus-icon.svg'
      />
      Task
    </button>
  );
}

export default CreateTaskButton;
