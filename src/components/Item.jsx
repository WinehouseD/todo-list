import { useState } from "react";

export default function Item({ title, id, status }) {
  const [checked, setChecked] = useState(status);
  const classes = ["todo"];

  if (checked) {
    classes.push("status");
  }

  const updateStatus = () => {
    //toggle
    setChecked(!checked);
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    storedTodos.map((el) => {
      if (el.id === id) {
        el.status = !checked;
      }
      return true;
    });
    localStorage.setItem("tasks", JSON.stringify(storedTodos));
  };

  const [visible, setVisible] = useState(true);
  const removeEl = () => {
    setVisible((prev) => !prev);
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    let removeTodos = storedTodos.filter((item) => {
      if (item.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem("tasks", JSON.stringify(removeTodos));
  };

  return (
    <>
      {visible && (
        // join - розібрати масив у строку
        <li className={classes.join(" ")}>
          <label>
            <input type="checkbox" checked={checked} onChange={updateStatus} />
            <span>{title}</span>
            <i className="material-icons red-text" onClick={removeEl}>
              X
            </i>
          </label>
        </li>
      )}
    </>
  );
}
