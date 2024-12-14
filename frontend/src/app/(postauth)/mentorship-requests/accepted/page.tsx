"use client";

import { mentorRequestService } from '@/api/rest.app';
import UserCard from '@/components/UserCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
    const loginUser = useSelector((state: any) => state.auth.userData);
    const [filter, setFilter] = useState<string>('send');
    // console.log("loginUser ::", loginUser);
    const [users, setUsers] = useState<any>([]);

    const fetchUsers = async () => {
        const query: any = {
            // receiver_id: loginUser.id,
            status: 2,
            $sort: { createdAt: -1 },
            $limit: -1
        };

        if (filter === 'send') {
            query.sender_id = loginUser.id;
            query['$eager'] = '[receiver.profile]';
        } else if (filter === 'revice') {
            query.receiver_id = loginUser.id;
            query['$eager'] = '[sender.profile]';
        }

        await mentorRequestService.find({
            query
        }).then((res: any) => {
            console.log("res ::", res);
            setUsers(res);
        }).catch((error: any) => {
            console.error(error);
        })
    };

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    return (
        <div className="container mx-auto p-4">
            <div className="mt-4">
                <div className='flex justify-between mt-4'>
                    <h2 className="text-lg font-bold">Users</h2>
                    {// fillter for send or revice request
                    }
                    <div className="flex justify-between mt-4">
                        <label
                            className="text-sm font-semibold">Fillter</label>
                        <select value={filter} onChange={(e) => {
                            setFilter(e.target.value)
                        }} className="text-sm font-semibold">
                            <option value={"send"} className="text-sm font-semibold">Send Request</option>
                            <option value={"revice"} className="text-sm font-semibold">Revice Request</option>
                        </select>
                    </div>
                </div>
                <div>
                    {users.length > 0 ? (
                        users.map((user: any, index: number) => {
                            console.log("user ::", user.receiver);
                            return (
                                <UserCard key={index} user={user.sender ? user.sender : user.receiver} mentorRequestId={user.id} />
                            )
                        })
                    ) : (
                        <p>No Request found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;