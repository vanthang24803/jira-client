import { Base } from "./base";

export type Comment = Base & {
  author: string;
  avatar: string;
  isEdited: boolean;
  content: string;
};
