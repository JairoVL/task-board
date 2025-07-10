import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "../Dashboard.module.scss";
import type { Task } from "../../../types/board";
import Card from "../../../components/UI/Card/Card";

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
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className={styles.task}>
            <div className={styles.taskContent}>
              <div className={styles.taskHeader}>
                <span>{task.title}</span>
                <hr />
                <span className={`${styles.priority} ${styles[task.priority]}`}> <><i>prioridad</i> </>
                  {task.priority === "low"
                    ? "🔵 Baja"
                    : task.priority === "medium"
                    ? "🟡 Media"
                    : "🔴 Alta"}
                </span>
              </div>

              <div className={styles.taskActions}>
                <button onClick={() => onEdit(columnId, task.id)}>✏️</button>
                <button onClick={() => onDelete(columnId, task.id)}>🗑️</button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
