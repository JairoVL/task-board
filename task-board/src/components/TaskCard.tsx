import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "../styles/Dashboard.module.scss";
import type { Task } from "../types/board";

type TaskCardProps = {
  task: Task;
  index: number;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
  <Draggable draggableId={task.id} index={index}>
  {(provided) => (
    <div
      className={styles.task}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {task.title}
    </div>
  )}
</Draggable>

  );
};

export default TaskCard;

