import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import circle from "../assets/circle.png";
import { RxCross1 } from "react-icons/rx";
import correct from "../assets/correct.png";
import "./Todo.css"

interface TaskProps {}

interface TaskState {
  tasks: string[];
  task: string;
  hover: number | null;
  done: boolean;
  completedTasks: number[];
  filter: string;
}

const style: { [key: string]: string } = {
  container: "w-full h-screen flex flex-col justify-center items-center relative bottom-10",
  inputContainer: "mb-3 w-[348px] flex items-center rounded-lg shadow-md bg-white z-40",
  input: "h-[57px] ml-[10px] w-[293px] focus:outline-none bg-white",
  img: "w-[22px] h-[22px] ml-4",
  icon: "absolute right-2 top-2 w-[20px] h-[20px]",
  bottomTextContainer: "flex flex-row justify-between items-end mx-6 my-2", // Style for the bottom text container
  bottomText: "text-[11px] text-gray-500", // Style for the bottom text
  completedTask: "line-through text-gray-500", // Style for completed tasks
};

const Tasks: React.FC<TaskProps> = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');
  const [hover, setHover] = useState<number | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('All');

  const handleClick = () => {
    setDone(!done);
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((item) => item !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((taskText, index) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return completedTasks.includes(index);
    if (filter === 'Completed') return !completedTasks.includes(index);
    return true;
  });

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        {completedTasks ? (
          <img src={circle} alt="circle" className={style.img} onClick={handleClick} />
        ) : (
          <img src={correct} alt="circle" className={style.img} onClick={handleClick} />
        )}
        <input
          className={style.input}
          value={task}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
          onKeyDown={handleEnterKey}
          placeholder="Your tasks"
        />
      </div>
      <div className="box">
        {filteredTasks.map((taskText, index) => (
          <div
            key={index}
            className={`w-[348px] border flex justify-between items-center mx-auto ${completedTasks.includes(index) ? style.completedTask : ""}`}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            onClick={() => toggleTaskCompletion(index)}
          >
            {completedTasks.includes(index) ? (
              <img src={correct} alt="correct" className={style.img} />
            ) : (
              <img src={circle} alt="circle" className={style.img} />
            )}
            <div className="h-[57px] ml-[10px] w-[293px]">
              <p className={`mt-[17px] ${completedTasks.includes(index) ? style.completedTask : ""}`}>{taskText}</p>
            </div>
            {hover === index && <RxCross1 className="mr-1" onClick={() => { deleteTask(index) }} />}
          </div>
        ))}
        <div className={style.bottomTextContainer}>
          <p className={style.bottomText}>{tasks.length - completedTasks.length} tasks remaining</p>
          <p className={`${style.bottomText} ${filter === "All" && "font-bold"}`} onClick={() => setFilter("All")}>All</p>
          <p className={`${style.bottomText} ${filter === "Active" && "font-bold"}`} onClick={() => setFilter("Active")}>Active</p>
          <p className={`${style.bottomText} ${filter === "Completed" && "font-bold"}`} onClick={() => setFilter("Completed")}>Completed</p>
          <p className={style.bottomText}>Clear</p>
        </div>
      </div>
      <p className="text-gray-600 text-xs mt-3 flex text-center">Type your tasks & hit ENTER!!!</p>
    </div>
  );
};

export default Tasks;
