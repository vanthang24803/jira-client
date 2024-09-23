import { Base } from "./base";

export type Project = Base & {
  name: string;
  url: string;
  pm: Member;
  category: string;
  members: number;
  tasks: number;
};

type Member = {
  _id: string;
  fullName: string;
  avatar: string;
  email: string;
  role: MemberRole;
};

type MemberRole = "Software" | "Marketing" | "Business";
