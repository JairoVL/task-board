import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { DragDropContext } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";
import type { ColumnsType, Priority, Task } from "../../types/board";
import { generateId } from "../../utils/idGenerator";
import Column from './components/Column';
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import initialBoardData from "../../data/initialBoardData.json";
import '../../styles/variables.scss';

// import { useBoard } from '../../context/BoardContext';


type DashboardProps = {
  onLogout: () => void;
};

const LOCAL_STORAGE_KEY = "task-board-columns";

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [columns, setColumns] = useState<ColumnsType>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialBoardData.columns;
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
    <div className={styles.header}>
      <h1 className={styles.title}>Prueba Técnica Baleares</h1>
      <h2 className={styles.subtitle}>Gestión de tareas</h2>

      <div className={styles.controlsRow}>
        {onLogout && (
          <Button onClick={onLogout} variant="danger">
            Cerrar sesión
          </Button>
        )}

        <div className={styles.filterContainer}>
          <label htmlFor="priority-filter" className={styles.filterLabel}>
            Filtrar por prioridad:
          </label>
          <Select
            id="priority-filter"
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as "all" | Priority)
            }
            options={[
              { value: "all", label: "Todas" },
              { value: "low", label: "Baja" },
              { value: "medium", label: "Media" },
              { value: "high", label: "Alta" },
            ]}
          />
        </div>
      </div>
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
              column={{ ...column, tasks: filteredTasks }}
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
