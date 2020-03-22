import { SubTask } from './SubTask';

export class Task {
  id: string;
  creator: string;
  applicants: Array<string>;
  type: string;
  dueAt: Date;
  createdAt: Date;
  name: string;
  plz: number;
  description: string;
  items: Array<SubTask>;
}
