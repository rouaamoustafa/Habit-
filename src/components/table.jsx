import React, { useState } from "react";
import "../style/table.css";
const TasksTable = ({ title, tasks, onStart, onComplete, onDelete, onEdit,  showEditDelete = true ,direction, translations }) => {
  const t = translations[direction];

  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ name: "", dueDate: "" });

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditedTask({ name: task.name, dueDate: task.dueDate });
  };

  const saveEdit = () => {
    if (editedTask.name && editedTask.dueDate) {
      onEdit(editingTask.id, editedTask);
      setEditingTask(null);
      setEditedTask({ name: "", dueDate: "" });
    }
  };
  const cancelEdit = () => {
    setEditingTask(null); // Reset editing state when canceled
    setEditedTask({ name: "", dueDate: "" }); // Reset edited task
  };

  return (
    <div className="tasks-table">
      <h3 >{title}</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{t.task}</th>
            <th>{t.dueDate}</th>
            <th>{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{editingTask?.id === task.id ? (
                <input
                  type="text"
                  value={editedTask.name}
                  onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                />
              ) : (
                task.name
              )}</td>
              <td>{editingTask?.id === task.id ? (
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                />
              ) : (
                task.dueDate
              )}</td>
              <td>
                {editingTask?.id === task.id ? (
                  <>
                    <button className='boutton' onClick={saveEdit}>{t.save}</button>
                    <button className='boutton' onClick={() => setEditingTask(null)}>{t.cancel}</button>
                  </>
                ) : (
                  <>
                    {onStart && <button className='boutton' onClick={() => onStart(task)}>{t.start}</button>}
                    {onComplete && <button className='boutton' onClick={() => onComplete(task)}>{t.complete}</button>}
                    {showEditDelete && (
        <>
          <button className="boutton" onClick={() => handleEdit(task)}>{t.edit}</button>
          <button className="boutton" onClick={() => onDelete(task.id)}>{t.delete}</button>
        </>
      )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
