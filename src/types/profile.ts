import { Base } from "./base";

export type Profile = Base & {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};
