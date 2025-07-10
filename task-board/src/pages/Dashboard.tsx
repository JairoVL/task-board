import React, { useState } from "react";
import styles from "../styles/Dashboard.module.scss";
import Column from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import type { ColumnsType, ColumnType } from "../types/board";
import { generateId } from "../utils/idGenerator"; 

// Estado inicial tipado
const initialData: { columns: ColumnsType } = {
  columns: {
    "todo": {
      id: "todo",
      title: "Por hacer",
      tasks: [
        { id: "1", title: "Estudiar React" },
        { id: "2", title: "Diseñar wireframe" },
      ],
    },
    "in-progress": {
      id: "in-progress",
      title: "En progreso",
      tasks: [{ id: "3", title: "Maquetar dashboard" }],
    },
    "done": {
      id: "done",
      title: "Completado",
      tasks: [{ id: "4", title: "Crear repositorio" }],
    },
  },
};

const Dashboard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnsType>(initialData.columns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedColumn = {
        ...sourceCol,
        tasks: sourceTasks,
      };
      setColumns({ ...columns, [sourceCol.id]: updatedColumn });
    } else {
      const destTasks = [...destCol.tasks];
      destTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
        [destCol.id]: { ...destCol, tasks: destTasks },
      });
    }
  };


  const addTask = (columnId: string, title: string) => {
    const newTask = {
      id: generateId(),
      title,
    };

    const updatedTasks = [...columns[columnId].tasks, newTask];

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        tasks: updatedTasks,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.dashboard}>
        {Object.values(columns).map((column) => (
          <Column
  key={column.id}
  column={column as ColumnType}
  addTask={addTask}
/>




        ))}
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
