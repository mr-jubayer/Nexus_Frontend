import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { TbDetails } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import FilledBtn from "../../../components/buttons/FilledBtn";
import Heading from "../../../components/Heading";
import toast from "react-hot-toast";
import useUserInfo from "../../../hooks/useUserInfo";
import { Helmet } from "react-helmet-async";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  width: "90%",
  maxWidth: 400,
};

export default function MyArticles() {
  const axiosSecure = useAxiosSecure();
  const { userInfo, isLoading: userLoading } = useUserInfo();
  const [openModal, setOpenModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const navigate = useNavigate();

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-articles", userInfo?._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/articles/my-articles/${userInfo?._id}`
      );
      return data;
    },
  });

  const handleOpenModal = (reason) => {
    setSelectedReason(reason);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReason("");
  };

  const handleDeleteArticle = (id) => {
    try {
      const detetingToo = async () => {
        await axiosSecure.delete(`/api/articles/user/delete/${id}`);
        refetch();
      };
      const deleting = (id) => {
        toast.promise(detetingToo(), {
          loading: "Processing...",
          success: <b>Deleted Successfull!</b>,
          error: <b>Deleted failed.</b>,
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
            onClick={() => deleting(t.id)}
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

  if (userLoading || isLoading) return <Spinner1 />;

  return (
    <div className="max-w-7xl mx-auto lg:px-20 md:px-10 px-3 mt-24">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | My Articles</title>
      </Helmet>
      <Heading title="My Articles" />
      <Divider />

      {articles.length ? (
        <TableContainer className="mt-8">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article, index) => (
                <TableRow key={article._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {article.status === "published" ? (
                      <Typography sx={{ color: "green" }}>Approved</Typography>
                    ) : article.status === "rejected" ? (
                      <div className="flex items-center">
                        <Typography sx={{ color: "red" }}>Declined</Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<FaInfoCircle />}
                          onClick={() =>
                            handleOpenModal(article.reasonForDecline)
                          }
                          className="ml-2 "
                        >
                          Reason
                        </Button>
                      </div>
                    ) : (
                      <Typography sx={{ color: "orange" }}>Pending</Typography>
                    )}
                  </TableCell>
                  <TableCell>{article.isPremium ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <FilledBtn
                      onClick={() =>
                        navigate(`/all-articles/details/${article._id}`)
                      }
                      className="mr-1 text-lg"
                    >
                      <TbDetails />
                    </FilledBtn>
                    <FilledBtn
                      onClick={() =>
                        navigate(`/my-articles/update/${article._id}`)
                      }
                      className="mr-1 text-lg text-green-500"
                    >
                      <FaEdit />
                    </FilledBtn>
                    <FilledBtn
                      className="text-lg text-red-500"
                      onClick={() => handleDeleteArticle(article._id)}
                    >
                      <FaTrash />
                    </FilledBtn>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className="h-[300px] flex justify-center items-center text-3xl font-semibold w-full">
          No Articles Found!
        </Typography>
      )}

      {/* Modal for Decline Reason */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="mb-2 text-error font-bold mb-4">
            Decline Reason
          </Typography>
          <br />
          <Typography className="border p-5 rounded-md ">
            {selectedReason}
          </Typography>{" "}
          <br />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            className="mt-4 "
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
