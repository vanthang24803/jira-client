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

type TaskLevel = "Lowest" | "Low" | "Medium" | "Highest" | "High";
type TaskStatus = "Backlog" | "Process" | "Done";
type TaskType = "Task" | "Bug" | "Story";
