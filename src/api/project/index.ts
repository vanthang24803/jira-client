import _http from "@/libs/http";
import type { Project, ProjectDetail } from "@/types/project";
import type { BaseResponse } from "@/types/base";
import { Profile, Task } from "@/types";

const fetchProject = () => _http.get<BaseResponse<Project[]>>(`/projects`);

const fetchProjectDetail = (slug: string) =>
  _http.get<BaseResponse<ProjectDetail>>(`/projects/${slug}`);

const fetchTaskDetail = (slug: string, taskId: string) =>
  _http.get<BaseResponse<Task>>(`/projects/${slug}/tasks/${taskId}`);

const searchUser = (email: string) => {
  if (email !== "") {
    _http.get<Profile[]>(`/me/search`, {
      params: {
        email,
      },
    });
  }
};

export { fetchProject, fetchProjectDetail, searchUser, fetchTaskDetail };
