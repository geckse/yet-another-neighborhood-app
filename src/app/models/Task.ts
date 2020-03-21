import { SubTask } from './SubTask';

export class Task {
  id: string;
  creator: string;
  name: string;
  plz: number;
  description: string;
  items: Array<SubTasks>;
}
