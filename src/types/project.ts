import { Base } from "./base";
import { Profile } from "./profile";

export type Project = Base & {
  name: string;
  url: string;
  createdBy: Profile;
  category: string;
  members: number;
  tasks: number;
};
