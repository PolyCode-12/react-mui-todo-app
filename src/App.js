import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import TodoInput from "./components/TodoInput";
import TaskItem from "./components/TaskItem";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(""); ///post
  const [category, setCategory] = useState("Gym"); ///post
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const filterTasks = (text) => {
    fetch(`http://localhost:3001/users`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((task) =>
          task.categories.toLowerCase().includes(text.toLowerCase()),
        );
        setTasks(filtered);
      });
  };

  const handleDeleteAll = () => {
    const deleteAllTasks = tasks.map((task) => {
      return fetch(`http://localhost:3001/users/${task.id}`, {
        method: "DELETE",
      });
    });
    Promise.all(deleteAllTasks)
      .then(() => {
        setTasks([]);
      })
      .catch((error) => {
        console.error("Bütün tapşırıqları silərkən xəta baş verdi:", error);
      });
  };

  const editTask = (id, updated) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(
          tasks.map((task) =>
            task.id === id
              ? data || alert("Tapşırıq uğurla dəyişdirildi")
              : task,
          ),
        );
      })
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Tapşırığı silərkən xəta baş verdi:", error);
      });
  };

  const handleAdd = () => {
    if (task.trim()) {
      const newTask = {
        id: tasks > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: task,
        categories: category,
      };
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks([...tasks, data]);
          setTask("");
        });
    }
  };

  return (
    <div className="todo-container">
      <Box className="todo-box">
        <Typography variant="h4" component="h1" className="todo-title">
          Todo List
        </Typography>

        <TodoInput
          task={task}
          setTask={setTask}
          category={category}
          setCategory={setCategory}
          onAdd={handleAdd}
        />

        <TextField
          label="Filter"
          variant="outlined"
          className="filter-input"
          placeholder="Axtarış..."
          onChange={(e) => filterTasks(e.target.value)}
        />

        <Button
          variant="outlined"
          color="error"
          className="clear-all-button"
          onClick={handleDeleteAll}
        >
          Bütün tapşırıqları sil
        </Button>

        <Box className="tasks-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task.title}
              category={task.categories}
              onDelete={() => deleteTask(task.id)}
              onEdit={()=>editTask(task.id , {...task , title:prompt("Yeni task:" , task.title)})}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default App;
