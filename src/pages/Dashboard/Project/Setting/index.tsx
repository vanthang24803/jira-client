import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetail } from "@/api/Project";
import { updateProjectValidation } from "@/validations/project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/constant";
import ReactQuill from "react-quill";
import { z } from "zod";
import { ProjectCategory } from "@/types";
import { toast } from "sonner";
import _http from "@/libs/http";

type FormSchema = z.infer<typeof updateProjectValidation>;

export default function ProjectSetting() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: [`project/${slug}`],
    queryFn: () => fetchProjectDetail(slug || ""),
  });
  const [selectedCategory, setSelectedCategory] = useState("Software");

  const form = useForm<FormSchema>({
    resolver: zodResolver(updateProjectValidation),
    defaultValues: {
      name: "",
      category: selectedCategory,
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as ProjectCategory);
    setValue("category", event.target.value);
  };

  useEffect(() => {
    if (data?.data.result) {
      setSelectedCategory(data.data.result.category);
      setValue("name", data.data.result.name);
      setValue("description", data.data.result.description);
    }
  }, [data?.data.result]);

  const onSubmit = async (json: FormSchema) => {
    try {
      setLoading(true);
      const response = await _http.put(`/projects/${data?.data.result._id}`, {
        ...json,
        url: data?.data.result.url,
      });

      if (response.status === 200) {
        toast.success("Project updated successfully!");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Container maxWidth="sm">
        <Stack direction="column" py={2} spacing={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/dashboard/project"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: 500,
              }}
            >
              Projects
            </Link>
            <Typography>{data?.data.result?.name}</Typography>
            <Typography>Project Details</Typography>
          </Breadcrumbs>
          <Typography variant="h6">Project Details</Typography>
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
                  value={`/dashboard/project/${data?.data.result.url}`}
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
              <Stack direction="column" sx={{ mb: 8 }}>
                <Typography fontWeight={500} fontSize={13} color="#3d3736">
                  Description
                </Typography>
                <ReactQuill
                  theme="snow"
                  onChange={(value) => setValue("description", value)}
                />
              </Stack>
            </Stack>
            <Button
              variant="contained"
              disabled={loading}
              sx={{ width: "200px", margin: "1rem 0" }}
              type="submit"
            >
              {loading ? <CircularProgress size={16} /> : "Submit"}
            </Button>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}
