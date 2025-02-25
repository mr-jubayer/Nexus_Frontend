import { useState, useEffect } from "react";
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
import { toast } from "react-hot-toast";
import { styled } from "@mui/material";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllUser() {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetching paginated data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", page, rowsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/users?page=${page}&limit=${rowsPerPage}`
      );
      return data;
    },
  });

  const makeAdminHandler = async (email) => {
    try {
      const updatingToo = async () => {
        await axiosSecure.patch(`/api/users/update/user-role/${email}`);
        refetch();
      };
      const updating = (id) => {
        toast.promise(updatingToo(), {
          loading: "Processing...",
          success: <b>Updated Successfully!</b>,
          error: <b>Update failed.</b>,
        });
        toast.dismiss(id);
      };

      toast((t) => (
        <span>
          Are you <b>sure</b>?
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-400 px-3 py-1 rounded-md shadow-inner mx-3 text-white"
          >
            no
          </button>
          <button
            onClick={() => updating(t.id)}
            className="bg-orange-400 px-3 py-1 rounded-md shadow-inner  text-white"
          >
            yes
          </button>
        </span>
      ));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  if (isLoading || loading) return <Spinner1 />;

  // Handle changing the page
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

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
          <TableBody className="dark:border-whiteGray/50 dark:bg-black2">
            {data?.users?.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className=" dark:border-whiteGray/50"
                >
                  <div className="flex gap-2 items-center">
                    <div>
                      <img
                        src={user.profilePhoto}
                        className="h-12 w-12 rounded-full "
                        alt="user profile photo"
                      />
                    </div>
                    <div>
                      <p className="text-lg dark:text-darkHeading">
                        {user.fullName}
                      </p>
                      <p className="opacity-80 dark:text-whiteGray">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right" className="dark:text-whiteGray">
                  {user.email}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.role === "admin" ? (
                    <h2>Admin</h2>
                  ) : (
                    <FilledBtn
                      onClick={() => makeAdminHandler(user.email)}
                      className="bg-myGreen text-white"
                    >
                      Make Admin
                    </FilledBtn>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-myGreen text-white mr-2 disabled:bg-gray-500 "
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(data?.total / rowsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handleChangePage(index + 1)}
                className={`px-4 py-2  ${page === index + 1 ? "bg-myGreen text-white" : "bg-gray-200"}`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={page === Math.ceil(data?.total / rowsPerPage)}
          className="px-4 py-2 bg-myGreen text-white ml-2 disabled:bg-gray-500 "
        >
          Next
        </button>
      </div>
    </div>
  );
}
