import React, { useState, useEffect } from 'react';
import DonutChart from '../components/chart'
import TasksTable from '../components/table'
import Lottie from "lottie-react";
import successAnimation from "../assets/like.json";
import "../style/task.css";

const Tasks = ({ direction, translations }) => {
 
  const t = translations[direction];
 
    const [tasks, setTasks] = useState({
      todo: [
        { id: 1, name: "Task 1", dueDate: "2025-01-27" },
        { id: 2, name: "Task 2", dueDate: "2025-01-27" },
      ],
      inProgress: [],
      completed: [],
    });

    const [newTask, setNewTask] = useState({ name: "", dueDate: "" });
    const [showForm, setShowForm] = useState(false);


    const [taskIdCounter, setTaskIdCounter] = useState(3); 

  // Function to add a new task
  const addTask = () => {
    if (newTask.name && newTask.dueDate) {
      setTasks((prev) => ({
        ...prev,
        todo: [
          ...prev.todo,
          { ...newTask, id: taskIdCounter }, 
        ],
      }));

      
      setTaskIdCounter((prevCounter) => prevCounter + 1);
      setNewTask({ name: "", dueDate: "" });
      setShowForm(false);
    }
  };
  
    const moveTask = (task, from, to) => {
      setTasks((prev) => ({
        ...prev,
        [from]: prev[from].filter((t) => t.id !== task.id),
        [to]: [...prev[to], task],
      }));
    };
  
    const deleteTask = (taskId, from) => {
      setTasks((prev) => ({
        ...prev,
        [from]: prev[from].filter((t) => t.id !== taskId),
      }));
    };

    const [showFinalAlert, setShowFinalAlert] = useState(false);
    const allCompleted = tasks.todo.length === 0 && tasks.inProgress.length === 0;

    React.useEffect(() => {
      if (allCompleted) {
        setShowFinalAlert(true);
      }
    }, [allCompleted]);
  
    const closeFinalAlert = () => setShowFinalAlert(false);
    const editTask = (taskId, editedTask) => {
      setTasks((prev) => ({
        ...prev,
        todo: prev.todo.map((task) =>
          task.id === taskId ? { ...task, ...editedTask } : task
        ),
        inProgress: prev.inProgress.map((task) =>
          task.id === taskId ? { ...task, ...editedTask } : task
        ),
        completed: prev.completed.map((task) =>
          task.id === taskId ? { ...task, ...editedTask } : task
        ),
      }));
    };
  
    return (
      <div className="main-grid">
        <div className="charts-section">
          <DonutChart title={t.toDo} value={tasks.todo.length * 10} color="#FF6384" />
          <DonutChart title={t.inProgress} value={tasks.inProgress.length * 10} color="#FFCD56" />
          <DonutChart title={t.completed} value={tasks.completed.length * 10} color="#4BC0C0" />
        </div>
  
        {/* Tasks Tables Section */}
        <div className="tables-section">
        <div className="tasks-table">
          <h3 className="tasks-table-row">
            {t.toDo}{" "}
            <button  onClick={() => setShowForm(true)} className="add-task-btn" activeClassName="add-task-btn-active">
              {t.addTask}
            </button>
          </h3>
          <TasksTable
            tasks={tasks.todo}
            onStart={(task) => moveTask(task, "todo", "inProgress")}
            onEdit={editTask} 
            onDelete={(taskId) => deleteTask(taskId, "todo")}
            direction={direction}
            translations={translations}
          />
        </div>
        <div className="tasks-table">
          <h3>{t.inProgress}</h3>
          <TasksTable
            tasks={tasks.inProgress}
            onComplete={(task) => moveTask(task, "inProgress", "completed")}
            onDelete={(taskId) => deleteTask(taskId, "inProgress")}
            onEdit={editTask} 
            direction={direction}
            translations={translations}
          />
        </div>
        <div className="tasks-table">
          <h3>{t.completed}</h3>
          <TasksTable
  tasks={tasks.completed}
  direction={direction}
  translations={translations}
  showEditDelete={false} // Hides Edit/Delete buttons
/>
        </div>
      </div>

      {/* Task Creation Form */}
      {showForm && (
        <div className="task-form">
          <h3>{t.addTask}</h3>
          <input
            type="text"
            placeholder={t.taskName}
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <div className="task-form-botton">
          <button activeClassName="form-active" onClick={addTask}>{t.save}</button>
          <button activeClassName="form-active" onClick={() => setShowForm(false)}>{t.cancel}</button>
          </div>
        </div>
      )}

         {/* Final Animation in Alert */}
         {showFinalAlert && (
        <div className="final-alert">
          <div className="alert-content">
            <button className="close-alert" onClick={closeFinalAlert}>
              ✖
            </button>
            <Lottie animationData={successAnimation} loop={false} />
            <h2>{t.allTasksCompleted}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks; 