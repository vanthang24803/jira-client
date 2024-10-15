import { Comment } from "@/types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import _http from "@/libs/http";
import { toast } from "sonner";
import UpdateComment from "../UpdateComment";

type Props = {
  comment: Comment | undefined;
  taskId: string | undefined;
  slug: string | undefined;
  reload: () => void;
};

export default function CommentItem({ comment, slug, taskId, reload }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleToggle = () => setIsUpdate(!isUpdate);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      await _http.delete(
        `/projects/${slug}/tasks/${taskId}/comments/${comment?._id}`
      );

      toast.success("Comment deleted!");

      reload();

      handleClose();
    } catch (error) {
      toast.error("Failed to delete the comment.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Box flex={1} display="flex" alignItems="center" gap={2}>
        <Avatar src={comment?.avatar} />
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ fontWeight: "bold" }}>
              {comment?.author}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                color: "rgb(113 113 122)",
                fontSize: "13px",
              }}
            >
              {comment && formatDistanceToNow(comment.createdAt)}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            {isUpdate ? (
              <UpdateComment
                reload={reload}
                slug={slug}
                taskId={taskId}
                comment={comment}
                handleToggle={handleToggle}
              />
            ) : (
              <Typography sx={{ fontSize: "14px" }}>
                {comment?.content}
              </Typography>
            )}

            {!isUpdate && (
              <Box display="flex" alignItems="center" gap={2}>
                <Typography
                  fontSize={13}
                  onClick={handleToggle}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Edit
                </Typography>
                <Typography
                  fontSize={13}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleClickOpen}
                >
                  Delete
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Comment?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              bgcolor: "red",
              color: "#ffffff",
            }}
            onClick={handleDeleteComment}
            disabled={loading}
          >
            Confirm
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: "#333333",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
