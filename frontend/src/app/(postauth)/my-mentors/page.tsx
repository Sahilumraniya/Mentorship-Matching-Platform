"use client";

import { mentorRequestService, profileService } from '@/api/rest.app';
import Filter from '@/components/FilterUser';
import UserCard from '@/components/UserCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    const [filteredUsers, setFilteredUsers] = useState<any>({});
    const loginUser = useSelector((state: any) => state.auth.userData);
    const [users, setUsers] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        const skip = (currentPage - 1) * usersPerPage;
        await mentorRequestService.find({
            query: {
                sender_id: loginUser.id,
                status: 2,
                $eager: '[receiver.profile]',
                $sort: { createdAt: -1 },
                $skip: skip,
                $limit: usersPerPage
            }
        }).then((res: any) => {
            console.log("res ::", res);
            setUsers(res.data);
            setTotalUsers(res.total); // Assuming the API returns the total count of users
        }).catch((error: any) => {
            console.error(error);
        })
    };

    useEffect(() => {
        fetchUsers();
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return (
        <div className="container mx-auto p-4">
            <Filter setFilterObject={setFilteredUsers} hideRoleFilter />
            <div className="mt-4">
                <h2 className="text-lg font-bold">Users</h2>
                <div>
                    {users.length > 0 ? (
                        users.map((user: any, index: number) => (
                            <UserCard key={index} user={user?.receiver} />
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