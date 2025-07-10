import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "../styles/Dashboard.module.scss";
import type { Task } from "../types/board";

type TaskCardProps = {
  task: Task;
  index: number;
  columnId: string;
  onEdit: (columnId: string, taskId: string) => void;
  onDelete: (columnId: string, taskId: string) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  columnId,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={styles.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.taskContent}>
            <span>{task.title}</span>
            <div className={styles.taskActions}>
              <button onClick={() => onEdit(columnId, task.id)}>✏️</button>
              <button onClick={() => onDelete(columnId, task.id)}>🗑️</button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
