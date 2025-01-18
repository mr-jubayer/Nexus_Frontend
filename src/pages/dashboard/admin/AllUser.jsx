import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Spinner1 from "../../../components/spinners/Spinner1";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import FilledBtn from "../../../components/buttons/FilledBtn";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllUser() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users`);
      return data;
    },
  });

  console.log(data);

  if (isLoading || loading) return <Spinner1 />;
  console.log(data);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Profile</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-2 items-center">
                    <div>
                      <img
                        src={user.profilePhoto}
                        className="h-12 w-12 rounded-full "
                        alt="user profile photo"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg ">{user.fullName} </p>
                      <p className="opacity-80">{user.role}</p>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  <FilledBtn className="bg-myGreen text-white">
                    Make Admin
                  </FilledBtn>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
