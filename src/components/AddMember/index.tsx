import { Fragment, useEffect, useState } from "react";
import UserIcon from "./icon";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Profile, ProjectDetail } from "@/types";
import { roles } from "@/constant";
import _http from "@/libs/http";
import { toast } from "sonner";

type Props = {
  data: ProjectDetail | undefined;
  reload: () => void;
};

export default function AddMember({ data, reload }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Member");
  const [selectEmail, setSelectEmail] = useState<Profile>();

  const [members, setMember] = useState<Profile[]>();

  const searchMember = async () => {
    const response = await _http.get(`/me/search?email=${search}`);
    if (response.status === 200) {
      setMember(response.data);
    }
  };

  useEffect(() => {
    searchMember();
  }, [search]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setSelectEmail(undefined);
  };

  const onSubmit = async () => {
    const jsonData = {
      role: selectedCategory,
      email: selectEmail?.email,
    };

    try {
      await _http.post(`/projects/${data?._id}/add`, jsonData);

      reload();
      toast.success("Add Member Successfully");
      handleClose();
    } catch (error) {
      toast.error("Member is existed");
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Tooltip title="Add Members">
        <Avatar
          onClick={handleClickOpen}
          sx={{
            bgcolor: "gray",
            width: 34,
            height: 34,
            cursor: "pointer",
          }}
        >
          <UserIcon />
        </Avatar>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "400px",
            maxWidth: "100%",
            height: "auto",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          fontWeight={500}
          sx={{
            letterSpacing: "-0.075em",
          }}
        >
          Add People to {data?.name}
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            {selectEmail ? (
              <Box
                sx={{
                  width: "100%",
                  borderRadius: "4px",
                  py: 1,
                  px: 2,
                  border: "1px solid #ccc",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Avatar src={selectEmail.avatar} />
                    <Stack direction="column">
                      <Typography>
                        {selectEmail.firstName} {selectEmail.lastName}
                      </Typography>
                      <Typography>{selectEmail.email}</Typography>
                    </Stack>
                  </Stack>
                  <CloseIcon
                    onClick={() => {
                      setSelectEmail(undefined);
                      setSearch("");
                    }}
                  />
                </Stack>
              </Box>
            ) : (
              <Box position="relative">
                <Stack direction="column">
                  <Typography fontWeight={500} fontSize={13} color="#3d3736">
                    Email
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Stack>
                {search != "" && (
                  <Stack
                    position="absolute"
                    sx={{
                      width: "350px",
                      zIndex: 100,
                      height: "auto",
                      backgroundColor: "white",
                      color: "gray",
                      overflowY: "auto",
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "4px",
                      mt: 1,
                    }}
                    direction="column"
                    spacing={2}
                  >
                    {members &&
                      members?.length > 0 &&
                      members?.map((member, index) => (
                        <Stack
                          direction="row"
                          spacing={1}
                          onClick={() => setSelectEmail(member)}
                          key={index}
                          alignItems="center"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Avatar src={member.avatar} />
                          <Stack direction="column">
                            <Typography>
                              {member.firstName} {member.lastName}
                            </Typography>
                            <Typography>{member.email}</Typography>
                          </Stack>
                        </Stack>
                      ))}
                  </Stack>
                )}
              </Box>
            )}

            <Stack direction="column">
              <Typography fontWeight={500} fontSize={13} color="#3d3736">
                Role
              </Typography>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                sx={{ height: "35px" }}
                onChange={handleChange}
                value={selectedCategory}
              >
                {roles.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Typography fontSize={10}>
              This site is protected by reCAPTCHA and the Google Privacy
              Policy﻿, (opens new window) and Terms of Service﻿, (opens new
              window) apply.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              color: "black",
            }}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} autoFocus variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
