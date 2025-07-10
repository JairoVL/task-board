import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import styles from "../styles/Dashboard.module.scss";
import type { ColumnType } from "../types/board";
import Modal from "./Modal"; // importar el modal

type ColumnProps = {
  column: ColumnType;
  addTask: (columnId: string, title: string) => void;
  onEditTask: (columnId: string, taskId: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
};

const Column: React.FC<ColumnProps> = ({
  column,
  addTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAddTask = () => {
    if (newTitle.trim()) {
      addTask(column.id, newTitle.trim());
      setNewTitle("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.column}>
      <h3>{column.title}</h3>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.taskList}
          >
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={styles.addTaskButton}
      >
        + Agregar tarea
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva tarea"
      >
        <input
          type="text"
          placeholder="Título de la tarea"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button
          onClick={handleAddTask}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Crear
        </button>
      </Modal>
    </div>
  );
};

export default Column;
