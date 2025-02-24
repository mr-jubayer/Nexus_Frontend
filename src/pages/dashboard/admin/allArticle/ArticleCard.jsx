/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Spinner1 from "../../../../components/spinners/Spinner1";
import { useNotifications } from "reapop";
import { useState } from "react";

export default function ArticleCard({ article, refetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { notify } = useNotifications();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPremiumeModalOpen, setIsPremiumeModalOpen] = useState(false);

  const {
    _id,
    authorInfo,
    title,
    description,
    tags,
    publisher,
    creationTime,
    thumbnail,
    status,
    isPremium,
  } = article || {};

  const time = new Date(creationTime).toLocaleDateString();

  // approve the article
  const handleApprove = async () => {
    setLoading(true);
    try {
      await axiosSecure.patch(`/api/articles/approve/${_id}`);

      refetch();
      notify(
        "Article has been publihsed. Now every one can read this. ",
        "success"
      );
    } finally {
      setLoading(false);
    }
  };

  // decline the article
  const handleSubmitDecline = async () => {
    try {
      await axiosSecure.patch(`/api/articles/reject/${_id}`, {
        declineReason: declineReason,
      });

      refetch();
      notify("Article Declined!", "success");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handlePremium = async () => {
    try {
      await axiosSecure.patch(`/api/articles/premiume/${_id}`);

      refetch();
      notify("Article is Premium", "success");
    } finally {
      setIsPremiumeModalOpen(false);
    }
  };
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/api/articles/delete/${_id}`);

      refetch();
      notify("Article Deleted!", "success");
    } finally {
      setIsDeleteModalOpen(true);
    }
  };

  if (loading) return <Spinner1 />;

  return (
    <div
      className={` ${isPremium ? "border-2 border-purple-600" : ""} w-full mx-auto border bg-white/50  shadow-sm overflow-hidden `}
    >
      {/* Header */}
      <div className="flex p-4 border-b justify-between">
        <div className="flex items-center">
          <img
            src={authorInfo.profilePhoto || "https://via.placeholder.com/40"}
            alt={authorInfo.fullName || "Author"}
            className="w-12 h-12 rounded-full mr-4"
          />

          <div>
            <p className="font-bold">{authorInfo.fullName}</p>
            <p className="text-sm">{authorInfo.email}</p>
          </div>
        </div>
        <div className="self-start text-xs ">
          <p>{time} </p>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail}
          alt="Article Thumbnail"
          className="w-full h-48 object-cover"
        />
        {isPremium && (
          <div className="px-3 py-1 bg-purple-600 text-white absolute top-0 right-0 rounded-none">
            Premiume
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title.slice(0, 40)}...</h3>
        <p className="text-sm text-gray-700 mb-2">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </p>
        <Divider />
        <p className="text-sm text-gray-500 mt-3 ">
          <strong>Tags:</strong>{" "}
          {tags.length ? tags.map((tag) => `#${tag} `) : "No tags"}
        </p>
        <p className="text-sm font-medium my-1">
          <strong>Status:</strong>{" "}
          <span
            className={`${
              status === "published" ? "text-green-600" : "text-orange-500"
            } font-bold`}
          >
            {status}
          </span>
        </p>
        <p className="text-sm text-gray-500">{`Publisher: ${publisher}`}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between p-4 border-t ">
        {status === "requested" && (
          <div className="space-x-3">
            <button
              className="text-green-600 hover:text-green-800"
              onClick={handleApprove}
              title="Approve"
            >
              <CheckCircleIcon fontSize="large" />
            </button>
            <button
              title="Decline"
              className="text-red-600 hover:text-red-800"
              onClick={() => setIsModalOpen(true)}
            >
              <CloseIcon fontSize="large" />
            </button>
          </div>
        )}
        <div className="space-x-3 ">
          {isPremium ? (
            <button className="text-yellow-600 cursor-default">
              <StarIcon fontSize="large" />
            </button>
          ) : (
            <button
              className={`
                  ${status === "requested" ? "text-yellow-950" : "text-yellow-950  hover:text-yellow-600"}`}
              disabled={status === "requested"}
              onClick={() => setIsPremiumeModalOpen(true)}
            >
              <StarIcon fontSize="large" />
            </button>
          )}
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteIcon fontSize="large" />
          </button>
        </div>
      </div>

      {/* Decline Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Decline Article</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason for Decline"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitDecline}
            variant="contained"
            color="error"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Are you sure to delete it?</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirm premium modal */}
      <Dialog
        open={isPremiumeModalOpen}
        onClose={() => setIsPremiumeModalOpen(false)}
      >
        <DialogActions>
          <Button onClick={handlePremium} variant="contained" color="error">
            Confirm Update Premiume
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
