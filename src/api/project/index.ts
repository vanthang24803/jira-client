import _http from "@/libs/http";
import type { Project } from "@/types/project";
import type { BaseResponse } from "@/types/base";

const fetchProject = () => _http.get<BaseResponse<Project[]>>(`/projects`);

export { fetchProject };
