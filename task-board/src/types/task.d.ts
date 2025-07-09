export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};
