import useAuth from "@/hooks/use-auth";
import _http from "@/libs/http";
import { CommentSchema, commentValidation } from "@/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  taskId: string | undefined;
  slug: string | undefined;
};

export default function CreateComment({ taskId, slug }: Props) {
  const { profile } = useAuth();

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      content: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: CommentSchema) => {
    try {
      setLoading(true);

      const handelCreate = _http.post(
        `/projects/${slug}/tasks/${taskId}/comments`,
        data
      );

      toast.promise(handelCreate, {
        loading: "Loading...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: [`comments-${slug}-${taskId}`],
          });
          handleToggle();
          return "Success!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    reset(), setSelected(!selected);
  };

  return (
    <form
      style={{
        flex: 1,
        display: "flex",
        alignItems: "start",
        gap: "1rem",
        marginRight: "2rem",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Avatar src={profile?.avatar} />
      <Box display="flex" flexDirection="column" flex={1} gap={1}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onClick={handleToggle}
          disabled={loading}
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
        {selected && (
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              disabled={loading}
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
        )}
      </Box>
    </form>
  );
}
