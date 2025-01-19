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

  const { name, bio, profilePhoto, followers, following, articles } =
    userInfo || {};

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
              <h1 className="text-2xl font-semibold">{name}</h1>
              <p className="text-gray-600">
                {bio || "Add a bio about yourself."}
              </p>
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

        {/* Stats Section */}
        <div className="flex justify-between mt-6 border-t pt-4">
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
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full max-w-3xl mt-6">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Articles" />
          <Tab label="About" />
          <Tab label="Following" />
        </Tabs>
        <div className="mt-4 bg-white shadow-md rounded-lg p-6">
          {/* {activeTab === 0 && (
            <div>
              {articles.length > 0 ? (
                articles.map((article, idx) => (
                  <div
                    key={idx}
                    className="border-b py-4 first:pt-0 last:border-b-0"
                  >
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-600">
                      {article.description.slice(0, 120)}...
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No articles published yet.</p>
              )}
            </div>
          )} */}
          {activeTab === 1 && (
            <p className="text-gray-600">
              Add more information about yourself here.
            </p>
          )}
          {activeTab === 2 && (
            <p className="text-gray-600">
              This section shows the people you're following.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
