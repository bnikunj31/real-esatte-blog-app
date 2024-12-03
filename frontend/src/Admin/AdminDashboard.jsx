import React from "react";

const AdminDashboard = ({
  totalProperties = 0, // Default value for totalProperties
  totalAgents = 0, // Default value for totalAgents
  totalSales = 0, // Default value for totalSales
  totalRentals = 0, // Default value for totalRentals
  recentActivities = [], // Default empty array to prevent map on undefined
  properties = [], // Default empty array to prevent map on undefined
}) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">Real Estate Admin</h1>
        <div>
          <a href="/logout" className="text-gray-300 hover:text-white">
            Logout
          </a>
        </div>
      </nav>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Properties</h3>
          <p className="text-2xl">{totalProperties}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Agents</h3>
          <p className="text-2xl">{totalAgents}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl">{totalSales}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Rentals</h3>
          <p className="text-2xl">{totalRentals}</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
        <div className="overflow-auto max-h-64 bg-white shadow-lg rounded-lg p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Activity</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{activity.description}</td>
                    <td className="px-4 py-2">{activity.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan="3">
                    No recent activities available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Property List Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Properties</h2>
        <div className="overflow-auto max-h-64 bg-white shadow-lg rounded-lg p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((property, index) => (
                  <tr key={property.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{property.title}</td>
                    <td className="px-4 py-2">{property.price}</td>
                    <td className="px-4 py-2">{property.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan="4">
                    No properties available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
