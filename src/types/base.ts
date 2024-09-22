export type Base = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type BaseResponse<T> = {
  code: number;
  result: T;
  timestamp: string;
  isSuccess: boolean;
};
