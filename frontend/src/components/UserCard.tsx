import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { mentorRequestService } from '@/api/rest.app';
import { send } from 'process';
import { useState } from 'react';
import { toast } from 'react-toastify';

const UserCard = ({
    user,
    showSendRequestButton = false, // Default to false
    showRejectButton = false,       // Default to false
    showAcceptButton = false,       // Default to false
    mentorRequestId = null
}: {
    user: any;
    showSendRequestButton?: boolean; // Optional prop
    showRejectButton?: boolean;       // Optional prop
    showAcceptButton?: boolean;       // Optional prop
    mentorRequestId?: number | null;  // Optional prop
}) => {

    const loginUser = useSelector((state: any) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    console.log("user ::", user);
    
    const onSendRequest = async () => {
        setLoading(true);
        // Send request logic here
        try {
            await mentorRequestService.create({
                sender_id: loginUser.id,
                receiver_id: user.user.id,
            })
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast(error.message, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const onReject = async () => {
        setLoading(true);
        // Reject request logic here
        try {
            await mentorRequestService.patch(mentorRequestId, {
                status: 3
            });
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast(error.message, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const onAccept = async () => {
        setLoading(true);
        // Accept request logic here
        try {
            console.log("mentorRequestId ::", mentorRequestId);
            await mentorRequestService.patch(mentorRequestId, {
                status: 2
            });
            setLoading(false);
        } catch (error: any) {
            console.error(error);
            toast(error.message, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between">
            {user?.profile_picture ? (<div className="flex">
                <img
                    src={user.profile_picture}
                    alt={`${user.user.name}'s profile`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-bold">{user.user.name}</h3>
                    <p className="text-sm text-gray-600">{user.bio}</p>
                    <div className="mt-2">
                        <strong>Skills:</strong>
                        <p>{user.skills.join(', ')}</p>
                    </div>
                    <div className="mt-1">
                        <strong>Interests:</strong>
                        <p>{user.interests.join(', ')}</p>
                    </div>
                </div>
            </div>) : <div className="flex">
                <img
                    src={user.profile.profile_picture}
                    alt={`${user.name}'s profile`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.profile.bio}</p>
                    <div className="mt-2">
                        <strong>Skills:</strong>
                        <p>{user.profile.skills.join(', ')}</p>
                    </div>
                    <div className="mt-1">
                        <strong>Interests:</strong>
                        <p>{user.profile.interests.join(', ')}</p>
                    </div>
                </div>
            </div>}
            <div className="flex flex-col justify-center">
                {showSendRequestButton && (
                    <button
                        onClick={onSendRequest}
                        className="bg-blue-500 text-white rounded px-4 py-2 flex items-center mb-2"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        {loading ? 'Sending...' : 'Send Request'}
                    </button>
                )
                }
                {showRejectButton && (
                    <button
                        onClick={onReject}
                        className="bg-red-500 text-white rounded px-4 py-2 flex items-center mb-2"
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Reject
                    </button>
                )}
                {showAcceptButton && (
                    <button
                        onClick={onAccept}
                        className="bg-green-500 text-white rounded px-4 py-2 flex items-center"
                    >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Accept
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserCard;