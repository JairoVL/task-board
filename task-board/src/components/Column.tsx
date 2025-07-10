import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import styles from "../styles/Dashboard.module.scss";
import type { ColumnType } from "../types/board";


type ColumnProps = {
  column: ColumnType;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
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
        <TaskCard key={task.id} task={task} index={index} />
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>

    </div>
  );
};

export default Column;

