export type Member = {
  _id: string;
  fullName: string;
  avatar: string;
  email: string;
  role: MemberRole;
};

type MemberRole = "Software" | "Marketing" | "Business";
