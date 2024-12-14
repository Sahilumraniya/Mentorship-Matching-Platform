"use client";

import { matchUserService } from '@/api/rest.app';
import UserCard from '@/components/UserCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  const loginUser = useSelector((state: any) => state.auth.userData);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    const skip = (currentPage - 1) * usersPerPage;

    // Fetch users from the API
    await matchUserService.find({
      query: {
        $skip: skip,
        $limit: usersPerPage
      }
    }).then((res: any) => {
      setUsers(res.data);
      setTotalUsers(res.total); // Assuming the API returns the total count of users
    }).catch((error: any) => {
      console.error(error);
    });

  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="mt-4">
        <h2 className="text-lg font-bold">Users</h2>
        <div>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <UserCard key={index} user={user} showSendRequestButton={true} />
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;