import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Fragment, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { CircularProgress, Typography } from "@mui/material";
import { toast } from "sonner";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectValidation } from "@/validations/project";
import { useLocation } from "react-router-dom";
import { slugify } from "@/utils/slugify";
import { categories } from "@/constant";
import _http from "@/libs/http";

type FormSchema = z.infer<typeof projectValidation>;

type Props = {
  handlerData: () => void;
};

export default function CreateProject({ handlerData }: Props) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Software");

  const form = useForm<FormSchema>({
    resolver: zodResolver(projectValidation),
    defaultValues: {
      name: "",
      url: "",
      category: selectedCategory,
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = form;

  const name = useWatch({
    control,
    name: "name",
  });

  useEffect(() => {
    if (name) {
      form.setValue("url", `${currentPath}/${slugify(name)}`);
    }
  }, [name, currentPath]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    setValue("category", event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading(true);
      const response = await _http.post(`/projects`, data);

      if (response.status === 201) {
        toast.success("Create project success!");
        handlerData();
        handleClose();
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        sx={{
          boxShadow: "none",
        }}
        onClick={handleClickOpen}
      >
        Create project
      </Button>
      <Dialog
        maxWidth={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "600px",
            maxWidth: "100%",
            height: "80vh",
          },
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: 500, letterSpacing: "-0.05em", pb: 1 }}
          id="customized-dialog-title"
        >
          Create new project
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 2, pt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2} width="100%">
              <Stack direction="column">
                <Typography fontWeight={500} fontSize={13} color="#3d3736">
                  Name
                </Typography>
                <TextField
                  disabled={loading}
                  variant="outlined"
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name")}
                />
              </Stack>

              <Stack direction="column">
                <Typography fontWeight={500} fontSize={13} color="#3d3736">
                  URL
                </Typography>
                <TextField
                  disabled
                  variant="outlined"
                  size="small"
                  error={!!errors.url}
                  helperText={errors.url?.message}
                  {...register("url")}
                />
              </Stack>

              <Stack direction="column">
                <Typography fontWeight={500} fontSize={13} color="#3d3736">
                  Project Category
                </Typography>
                <Select
                  disabled={loading}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  sx={{ height: "35px" }}
                  onChange={handleChange}
                  value={selectedCategory}
                  error={!!errors.category}
                >
                  {categories.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>

              <Stack direction="column">
                <Typography fontWeight={500} fontSize={13} color="#3d3736">
                  Description
                </Typography>
                <ReactQuill
                  theme="snow"
                  style={{
                    height: "100px",
                  }}
                  onChange={(value) => setValue("description", value)}
                />
              </Stack>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              textTransform: "uppercase",
            }}
          >
            {loading ? <CircularProgress size={16} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
