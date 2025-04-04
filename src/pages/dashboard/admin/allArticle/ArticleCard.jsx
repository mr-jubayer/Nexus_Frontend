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
      className={` ${isPremium ? "border-2 border-purple-600 dark:border-purple-600" : ""} w-full mx-auto border bg-white/50 dark:border-blackGray/50  dark:bg-black1 shadow-sm overflow-hidden `}
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
            <p className="font-bold dark:text-darkHeading">
              {authorInfo.fullName}
            </p>
            <p className="text-sm dark:text-whiteGray">{authorInfo.email}</p>
          </div>
        </div>
        <div className="self-start text-xs  text-whiteGray">
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
            Premium
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg dark:text-darkHeading font-semibold mb-2">
          {title.slice(0, 40)}...
        </h3>
        <p className="text-sm text-gray-700 mb-2 dark:text-whiteGray">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </p>
        <Divider />
        <p className="text-sm text-gray-500 mt-3  dark:text-whiteGray">
          {tags.length ? tags.map((tag) => `#${tag} `) : "No tags"}
        </p>
        <p className="text-sm font-medium my-1">
          <span
            className={`${
              status === "published" ? "text-green-600" : "text-orange-500"
            } font-bold`}
          >
            {status}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-whiteGray">
          {" "}
          By
          {` ${publisher}`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between p-4 border-t dark:border-whiteGray/50">
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
              className="text-red-600 hover:text-red-800 "
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
            className="text-gray-600 hover:text-gray-800 dark:text-whiteGray dark:hover:text-gray-600"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteIcon fontSize="large" />
          </button>
        </div>
      </div>

      {/* Decline Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-black2">
          <DialogTitle className="dark:text-darkHeading">
            Decline Article
          </DialogTitle>
          <DialogContent>
            <textarea
              rows={5}
              role="decline-reason"
              required={true}
              className={`overflow-y-auto  py-6 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner mt-2  dark:bg-black2 dark:text-white`}
              placeholder="Reason for Decline..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-1 px-2 dark: dark:bg-white bg-black"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitDecline}
              className="py-1 px-2  text-white bg-myGreen"
            >
              Submit
            </button>
          </DialogActions>
        </div>
      </Dialog>
      {/* delete modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Are you sure to delete it?</DialogTitle>

        <DialogActions>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="py-1 px-2 dark: dark:bg-white bg-black"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="py-1 px-2  text-white bg-myGreen"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
      {/* Confirm premium modal */}
      <Dialog
        open={isPremiumeModalOpen}
        onClose={() => setIsPremiumeModalOpen(false)}
      >
        <DialogActions>
          <button
            onClick={handlePremium}
            className="py-1 px-2  text-white bg-myGreen"
          >
            Confirm Update Premium
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
