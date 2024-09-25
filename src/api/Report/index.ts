import _http from "@/libs/http";
import type { Report } from "@/types/report";

const fetchReport = (slug: string) =>
  _http.get<Report>(`/projects/${slug}/report`);

export { fetchReport };
