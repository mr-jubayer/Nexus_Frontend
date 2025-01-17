import {
  BsBarChart,
  BsCashStack,
  BsPeopleFill,
  BsPersonPlus,
} from "react-icons/bs";

function AllUser() {
  console.log("users");

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <BsCashStack className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Todays Money
              </p>
              <h3 className="text-xl font-bold">$53k</h3>
              <p className="text-xs text-green-500">+55% than last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <BsPeopleFill className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Todays Users
              </p>
              <h3 className="text-xl font-bold">2,300</h3>
              <p className="text-xs text-green-500">+3% than last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <BsPersonPlus className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm font-semibold text-gray-600">New Clients</p>
              <h3 className="text-xl font-bold">3,462</h3>
              <p className="text-xs text-red-500">-2% than yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <BsBarChart className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm font-semibold text-gray-600">Sales</p>
              <h3 className="text-xl font-bold">$103,430</h3>
              <p className="text-xs text-green-500">+5% than yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600">Website View</h3>
          <p className="text-xs text-gray-400">Last Campaign Performance</p>
          <div className="mt-4 h-40 bg-gray-200 rounded-md"></div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600">Daily Sales</h3>
          <p className="text-xs text-gray-400">Increase in Sales</p>
          <div className="mt-4 h-40 bg-gray-200 rounded-md"></div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-600">
            Completed Tasks
          </h3>
          <p className="text-xs text-gray-400">Last Campaign Performance</p>
          <div className="mt-4 h-40 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default AllUser;
