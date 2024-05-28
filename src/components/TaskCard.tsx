type themeType = "notStarted" | "inProgress" | "done";

function TaskCard({ theme, title }: { theme: string; title: string }) {
  const styles = {
    notStarted: {
      cardBackground: "rgba(39,39,39,0.5)",
      titleBackground: "rgba(45,45,45,0.6)",
      dot: "rgba(75,75,75,1)",
    },
    inProgress: {
      cardBackground: "rgba(64,89,179,0.2)",
      titleBackground: "rgba(64,89,179,0.2)",
      dot: "rgba(64,89,179,0.8)",
    },
    done: {
      cardBackground: "rgba(33,79,21,0.2)",
      titleBackground: "rgba(33,79,21,0.3)",
      dot: "rgba(33,79,21,0.8)",
    },
  };

  const cardStyles = styles[theme as themeType];

  return (
    <section
      style={{ backgroundColor: cardStyles.cardBackground }}
      className='w-full md:max-w-[300px] min-h-[300px] mt-5 p-3 rounded-md shadow-sm'>
      <div
        style={{ backgroundColor: cardStyles.titleBackground }}
        className='flex items-center justify-between py-1.5 px-3 text-sm rounded-lg'>
        <div className='inline-flex items-center gap-2'>
          <div
            style={{ backgroundColor: cardStyles.dot }}
            className='h-3 w-3 rounded-full'></div>
          <span>{title}</span>
        </div>
        <button className='transition-colors duration-300 hover:text-secondary'>
          <img
            className='relative inline-block pr-1 bottom-[1px]'
            src='./src/assets/icons/plus-icon.svg'
          />
          Task
        </button>
      </div>
    </section>
  );
}

export default TaskCard;
