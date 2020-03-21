import { SubTask } from './SubTask';

export class Task {
  id: string;
  creator: string;
  type: string;
  name: string;
  plz: number;
  description: string;
  items: Array<SubTask>;
}
