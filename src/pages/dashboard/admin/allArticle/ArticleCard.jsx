/* eslint-disable react/prop-types */
import React, { useState } from "react";
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

export default function ArticleCard({ article }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const axiosSecure = useAxiosSecure();

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
  } = article || {};

  const time = new Date(creationTime).toLocaleDateString();

  const handleApprove = async () => {
    console.log("Article approved");

    const res = await axiosSecure.patch(`/api/articles/approve/${_id}`);
    console.log(res);
  };
  const handlePremium = () => console.log("Marked as premium");
  const handleDelete = () => console.log("Article deleted");
  const handleSubmitDecline = () => {
    console.log("Decline reason:", declineReason);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto border bg-white/50 rounded-lg shadow-sm overflow-hidden">
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
      <img
        src={thumbnail}
        alt="Article Thumbnail"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-2">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </p>
        <Divider />
        <p className="text-sm text-gray-500 mt-3 ">
          <strong>Tags:</strong>{" "}
          {tags.length ? tags.map((tag) => `#${tag.label} `) : "No tags"}
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
        <p className="text-sm text-gray-500">{`Publisher: ${publisher.value}`}</p>
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
          <button
            className="text-yellow-600 hover:text-yellow-800"
            onClick={handlePremium}
          >
            <StarIcon fontSize="large" />
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleDelete}
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
    </div>
  );
}
