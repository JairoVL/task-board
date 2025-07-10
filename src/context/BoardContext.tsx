// src/context/BoardContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ColumnsType,  Task } from "../types/board";
import { generateId } from "../utils/idGenerator";

const LOCAL_STORAGE_KEY = "task-board-columns";

type BoardContextType = {
  columns: ColumnsType;
  addTask: (columnId: string, title: string) => void;
  editTask: (columnId: string, taskId: string, newTitle: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  moveTask: (sourceId: string, destId: string, sourceIndex: number, destIndex: number) => void;
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType>>;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const initialData: ColumnsType = {
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
};

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<ColumnsType>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId: string, title: string) => {
    const newTask: Task = { id: generateId(), title, priority: "medium" };
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask],
      },
    }));
  };

  const editTask = (columnId: string, taskId: string, newTitle: string) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.map(task =>
          task.id === taskId ? { ...task, title: newTitle } : task
        ),
      },
    }));
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(task => task.id !== taskId),
      },
    }));
  };

  const moveTask = (sourceId: string, destId: string, sourceIndex: number, destIndex: number) => {
    const sourceTasks = [...columns[sourceId].tasks];
    const [movedTask] = sourceTasks.splice(sourceIndex, 1);

    if (sourceId === destId) {
      sourceTasks.splice(destIndex, 0, movedTask);
      setColumns(prev => ({
        ...prev,
        [sourceId]: { ...prev[sourceId], tasks: sourceTasks },
      }));
    } else {
      const destTasks = [...columns[destId].tasks];
      destTasks.splice(destIndex, 0, movedTask);
      setColumns(prev => ({
        ...prev,
        [sourceId]: { ...prev[sourceId], tasks: sourceTasks },
        [destId]: { ...prev[destId], tasks: destTasks },
      }));
    }
  };

  return (
    <BoardContext.Provider
      value={{ columns, addTask, editTask, deleteTask, moveTask, setColumns }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
