import { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstances";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/get-users");
        setUsers(response.data?.users ?? []); 
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeactivateUser = async (userId, isActive) => {
    try {
      const response = await axiosInstance.patch(`/admin/deactivate-user/${userId}`, {
          isActive: !isActive, 
      });

      if (response.status === 200) {
          setUsers((prevUsers) =>
              prevUsers.map((user) =>
                  user._id === userId ? { ...user, isActive: !isActive } : user
              )
          ); 

          alert(`User ${isActive ? "deactivated" : "activated"} successfully`);
      }
    } catch (err) {
        console.error("Error updating user status:", err);
        alert("Failed to update user status. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-500 border-solid"></div>
          <p className="text-lg font-bold mt-3">Loading Users...</p>
        </div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="text-center border-b">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">
                  {user.role !== "admin" && ( // Prevent deleting admins
                    <button
                      onClick={() => handleDeactivateUser(user._id, user.isActive)}
                      className={`px-4 py-2 rounded-full transition ${
                        user.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
