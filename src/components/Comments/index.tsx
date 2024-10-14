import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCommentOfTask } from "@/api/Comment";
import CommentItem from "./CommentItem";
import { Fragment } from "react/jsx-runtime";

type Props = {
  taskId: string | undefined;
  slug: string | undefined;
};

export default function Comments({ taskId, slug }: Props) {
  const { data: comments, refetch } = useQuery({
    queryKey: [`comments-${slug}-${taskId}`],
    queryFn: () => fetchAllCommentOfTask(slug || "", taskId || ""),
  });

  return (
    <Box
      width="100%"
      height="30vh"
      sx={{
        overflow: "auto",
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <Fragment>
          {comments?.data.result.map((item) => (
            <CommentItem
              reload={refetch}
              taskId={taskId}
              slug={slug}
              key={item._id}
              comment={item}
            />
          ))}
        </Fragment>
      </Box>
    </Box>
  );
}
