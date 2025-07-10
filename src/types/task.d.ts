type Task = { id: string; title: string };

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type Columns = {
  [key: string]: Column;
};
