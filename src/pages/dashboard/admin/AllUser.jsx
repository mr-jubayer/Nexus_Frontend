import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useUserInfo from "../../../hooks/useUserInfo";
import Spinner1 from "../../../components/spinners/Spinner1";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function AllUser() {
  const { userInfo, isLoading } = useUserInfo();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: [userInfo.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users`);
      return data;
    },
  });

  console.log(data);

  if (isLoading) return <Spinner1 />;
  console.log(userInfo);
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
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={userInfo.profilePhoto}
                        className="h-12 w-12 rounded-full "
                        alt="user profile photo"
                      />
                    </div>
                    <div className="">
                      <p>{userInfo.fullName} </p>
                      <p>{userInfo.role}</p>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {userInfo.email}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button>Add mimn</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
