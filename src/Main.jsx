import { useState, useEffect } from "react";
import List from "./components/List";
import { event } from "jquery";
import { v4 as uuidv4 } from "uuid";

function Main() {
  const [tasks, setTasks] = useState(() => {
    const storedTodos = localStorage.getItem("tasks");
    if (!storedTodos) {
      return [];
    } else {
      return JSON.parse(storedTodos);
    }
  });
  const [tasksTitle, setTasksTitle] = useState("");

  // add todo tasks into localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    // sync localStorage with interface
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks([
        ...storedTodos,
        {
          id: uuidv4(),
          title: tasksTitle,
          status: false,
        },
      ]);
      setTasksTitle("");
    }
  };

  const date = new Date();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="container">
      <h1>Note</h1>
      <span>{month + " " + day + ", " + year}</span>
      <div className="input-filed">
        <input
          type="text"
          value={tasksTitle}
          onChange={(event) => setTasksTitle(event.target.value)}
          onKeyDown={addTask}
        />
        <label>Task name</label>
      </div>
      <List tasks={tasks} />
    </div>
  );
}

export default Main;
