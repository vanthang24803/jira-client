import _http from "@/libs/http";
import type { Project, ProjectDetail } from "@/types/project";
import type { BaseResponse } from "@/types/base";

const fetchProject = () => _http.get<BaseResponse<Project[]>>(`/projects`);

const fetchProjectDetail = (slug: string) =>
  _http.get<BaseResponse<ProjectDetail>>(`/projects/${slug}`);

export { fetchProject, fetchProjectDetail };
