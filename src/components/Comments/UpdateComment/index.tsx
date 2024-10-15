import _http from "@/libs/http";
import { Comment } from "@/types";
import { CommentSchema, commentValidation } from "@/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  comment: Comment | undefined;
  handleToggle: () => void;
  taskId: string | undefined;
  slug: string | undefined;
  reload: () => void;
};

export default function UpdateComment({
  comment,
  handleToggle,
  taskId,
  slug,
  reload,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      content: comment?.content,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: CommentSchema) => {
    try {
      setIsLoading(true);

      const handelCreate = _http.put(
        `/projects/${slug}/tasks/${taskId}/comments/${comment?._id}`,
        data
      );

      toast.promise(handelCreate, {
        loading: "Loading...",
        success: () => {
          reload();
          handleToggle();
          return "Success!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      style={{
        flex: 1,
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        width: "545px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box display="flex" flexDirection="column" flex={1} gap={1} width="100%">
        <TextField
          id="outlined-basic"
          variant="outlined"
          disabled={isLoading}
          fullWidth
          InputProps={{
            sx: {
              height: "2.5rem",
            },
          }}
          error={!!errors.content}
          helperText={errors.content?.message}
          {...register("content")}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{ height: "2rem", padding: "0" }}
          >
            Save
          </Button>
          <Button type="button" variant="text" onClick={handleToggle}>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
}
