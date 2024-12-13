"use client";

import { mentorRequestService, profileService } from '@/api/rest.app';
import UserCard from '@/components/UserCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    const loginUser = useSelector((state: any) => state.auth.userData);
    console.log("loginUser ::", loginUser);
    const [users, setUsers] = useState<any>([]);

    const fetchUsers = async () => {
        await mentorRequestService.find({
            query: {
                receiver_id: loginUser.id,
                status: 1,
                $eager: '[sender.profile]',
                $limit: -1
            }
        }).then((res: any) => {
            console.log("res ::", res);
            setUsers(res);
        }).catch((error: any) => {
            console.error(error);
        })
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="mt-4">
                <h2 className="text-lg font-bold">Users</h2>
                <div>
                    {users.length > 0 ? (
                        users.map((user: any, index: number) => (
                            <UserCard key={index} user={user?.sender} mentorRequestId={users.id} showAcceptButton showRejectButton />
                        ))
                    ) : (
                        <p>No Request found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;