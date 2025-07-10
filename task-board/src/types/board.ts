export type Priority = "low" | "medium" | "high";
export type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
};


export type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

export type ColumnsType = {
  [key: string]: ColumnType;
};

