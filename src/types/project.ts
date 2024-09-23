import { Base } from "./base";
import { Member } from "./member";
import { Task } from "./task";

export type Project = Base & {
  name: string;
  url: string;
  pm: Member;
  category: ProjectCategory;
  members: number;
  tasks: number;
};

export type ProjectDetail = Base & {
  name: string;
  url: string;
  category: ProjectCategory;
  pm: Member;
  members: Member[];
  tasks: Task[];
};

export type ProjectCategory = "Software" | "Marketing" | "Business";
