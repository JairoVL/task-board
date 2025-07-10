import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.scss";
import Column from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import type { ColumnsType, ColumnType, Priority, Task } from "../types/board";
import { generateId } from "../utils/idGenerator";

type DashboardProps = {
  onLogout: () => void;
};

const LOCAL_STORAGE_KEY = "task-board-columns";

const initialData: { columns: ColumnsType } = {
  columns: {
    todo: {
      id: "todo",
      title: "Por hacer",
      tasks: [
        { id: "1", title: "Estudiar React", priority: "high" },
        { id: "2", title: "Diseñar wireframe", priority: "medium" },
      ],
    },
    "in-progress": {
      id: "in-progress",
      title: "En progreso",
      tasks: [{ id: "3", title: "Maquetar dashboard", priority: "low" }],
    },
    done: {
      id: "done",
      title: "Completado",
      tasks: [{ id: "4", title: "Crear repositorio", priority: "medium" }],
    },
  },
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [columns, setColumns] = useState<ColumnsType>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData.columns;
  });

  const [filterPriority, setFilterPriority] = useState<"all" | Priority>("all");

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
    const newTask: Task = {
      id: generateId(),
      title,
      priority: "medium",
    };
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
    <>
      <div className={styles.filterContainer}>
        <label htmlFor="priority-filter" className={styles.filterLabel}>
          Filtrar por prioridad:
        </label>
        <select
          id="priority-filter"
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(e.target.value as "all" | Priority)
          }
          className={styles.filterSelect}
        >
          <option value="all">Todas</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>

    
        <button onClick={onLogout} className={styles.logoutButton}>
          Cerrar sesión
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.dashboard}>
          {Object.values(columns).map((column) => {
            const filteredTasks = column.tasks.filter((task) =>
              filterPriority === "all"
                ? true
                : task.priority === filterPriority
            );
            return (
              <Column
                key={column.id}
                column={{ ...column, tasks: filteredTasks } as ColumnType}
                addTask={addTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
