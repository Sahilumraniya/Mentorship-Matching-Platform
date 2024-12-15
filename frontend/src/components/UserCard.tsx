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
            toast.success('Mentorship request sent successfully');
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
            toast.success('Mentorship request rejected successfully');
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
            toast.success('Mentorship request accepted successfully');
        } catch (error: any) {
            console.error(error);
            toast(error.message, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row">
            <div className="flex flex-col items-center md:items-start md:flex-row mb-4 md:mb-0">
                {user.profile_picture ? (
                    <img
                        src={user.profile_picture}
                        alt={`${user.user.name}'s profile`}
                        className="w-20 h-20 rounded-full mb-4 md:mb-0 md:mr-4"
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-300 text-white rounded-full mb-4 md:mb-0 md:mr-4">
                        {user.user.name[0]}
                    </div>
                )}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{user.user.name}</h3>
                    <p className="text-sm text-gray-600">{user.bio}</p>
                    <div className="mt-2">
                        <strong className="text-gray-700">Skills:</strong>
                        <p className="text-gray-600">{user.skills.join(', ')}</p>
                    </div>
                    <div className="mt-1">
                        <strong className="text-gray-700">Interests:</strong>
                        <p className="text-gray-600">{user.interests.join(', ')}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center mt-4 md:mt-0">
                {showSendRequestButton && (
                    <button
                        onClick={onSendRequest}
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center mb-2 transition duration-200 hover:bg-blue-700"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        {loading ? 'Sending...' : 'Send Request'}
                    </button>
                )}
                {showRejectButton && (
                    <button
                        onClick={onReject}
                        className="bg-red-600 text-white rounded-lg px-4 py-2 flex items-center mb-2 transition duration-200 hover:bg-red-700"
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Reject
                    </button>
                )}
                {showAcceptButton && (
                    <button
                        onClick={onAccept}
                        className="bg-green-600 text-white rounded-lg px-4 py-2 flex items-center transition duration-200 hover:bg-green-700"
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