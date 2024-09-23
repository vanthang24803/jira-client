import Stack from "@mui/material/Stack";
import NavigationSidebar from "./Navigation";
import SidebarIcon from "./Icon";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetail } from "@/api/Project";

type Props = {
  slug: string | undefined;
};

export default function Sidebar({ slug }: Props) {
  const { data } = useQuery({
    queryKey: [`project/${slug}`],
    queryFn: () => fetchProjectDetail(slug || ""),
  });

  return (
    <Stack
      direction="column"
      height="100vh"
      spacing={4}
      borderRight="2px solid #ccc"
      p={2}
    >
      <SidebarIcon data={data?.data.result} />
      <NavigationSidebar />
    </Stack>
  );
}
