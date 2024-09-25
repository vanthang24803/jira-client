import { MemberReport } from "@/types/report";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Stack,
  TablePagination,
} from "@mui/material";
import { useState } from "react";

type Props = {
  members: MemberReport[];
};

export default function ReportTable({ members }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedMembers = members.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          sx={{
            fontSize: 14,
            textTransform: "capitalize",
            fontWeight: 600,
            mb: 2,
          }}
        >
          Member Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Member</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Reports</TableCell>
                <TableCell>Assignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMembers.map((member, index) => (
                <TableRow key={member._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar alt={member.fullName} src={member.avatar} />
                      <Typography>{member.fullName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.totalReport}</TableCell>
                  <TableCell>{member.assignee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={members.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </CardContent>
    </Card>
  );
}
