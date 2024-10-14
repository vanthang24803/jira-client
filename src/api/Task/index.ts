import _http from "@/libs/http";
import { Task } from "@/types";

import { BaseResponse } from "@/types/base";
export const fetchTaskOfProject = (slug: string, name: string) => {
  if (name !== "") {
    return _http.get<BaseResponse<Task[]>>(`/projects/${slug}/tasks`, {
      params: { name },
    });
  }
  return _http.get<BaseResponse<Task[]>>(`/projects/${slug}/tasks`);
};
