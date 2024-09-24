import { Base } from "./base";
import { Member } from "./member";

export type Task = Base & {
  name: string;
  type: TaskType;
  description: string;
  code: string;
  level: TaskLevel;
  status: TaskStatus;
  reporter: Member;
  assignees: Member[];
};

export type TaskLevel = "Lowest" | "Low" | "Medium" | "Highest" | "High";
export type TaskStatus = "Backlog" | "Process" | "Done" | "Develop";
export type TaskType = "Task" | "Bug" | "Story";
