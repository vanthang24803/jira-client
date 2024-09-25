export type Report = {
  members: MemberReport[];
  chart: {
    status: number[];
    type: number[];
  };
};

export type MemberReport = {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  role: string;
  totalReport: number;
  assignee: number;
};
