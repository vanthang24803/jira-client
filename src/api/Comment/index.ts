import _http from "@/libs/http";
import { BaseResponse } from "@/types/base";
import type { Comment } from "@/types/comment";

const fetchAllCommentOfTask = (slug: string, taskId: string) =>
  _http.get<BaseResponse<Comment[]>>(
    `/projects/${slug}/tasks/${taskId}/comments`
  );

export { fetchAllCommentOfTask };
