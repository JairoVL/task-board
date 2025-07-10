import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.scss";
import Column from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import type { ColumnsType, ColumnType } from "../types/board";
import { generateId } from "../utils/idGenerator";

const LOCAL_STORAGE_KEY = "task-board-columns";

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
  const [columns, setColumns] = useState<ColumnsType>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData.columns;
  });

  // Guardar en localStorage cuando cambian las columnas
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
      });
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
    const newTask = { id: generateId(), title };
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        tasks: [...columns[columnId].tasks, newTask],
      },
    });
  };

  const onEditTask = (columnId: string, taskId: string) => {
    const newTitle = prompt("Nuevo título:");
    if (!newTitle) return;

    const updatedTasks = columns[columnId].tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        tasks: updatedTasks,
      },
    });
  };

  const onDeleteTask = (columnId: string, taskId: string) => {
    const updatedTasks = columns[columnId].tasks.filter(
      (task) => task.id !== taskId
    );

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
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
