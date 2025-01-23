import { Avatar, Button, Tabs, Tab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const { userInfo } = useUserInfo();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const { fullName, profilePhoto, email } = userInfo || {};

  return (
    <div className="flex flex-col items-center py-8 px-4 mb-44">
      {/* Profile Section */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar
              src={profilePhoto}
              alt="Profile"
              sx={{ width: 80, height: 80 }}
            />
            <div>
              <h1 className="text-2xl font-semibold">{fullName}</h1>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
          <div className="space-x-2">
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
              className="normal-case"
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              size="small"
              color="primary"
              className="normal-case"
            >
              Follow
            </Button>
          </div>
        </div>

        {/* <div className="flex justify-between mt-6 border-t pt-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{articles?.length}</h2>
            <p className="text-gray-500">Articles</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{followers}</h2>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{following}</h2>
            <p className="text-gray-500">Following</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
