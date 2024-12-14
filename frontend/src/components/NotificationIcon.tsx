import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { notificationService } from '@/api/rest.app'; // Adjust the import based on your project structure

export enum NotificationStatus {
    UNREAD = 0,
    READ = 1,
    DELETED = -1
}

const NotificationType = {
    "1": "Mentorship Request",
    "2": "Mentorship Accept",
    "3": "Mentorship Reject",
    "4": "OTHER"
}

interface Notification {
    id: string;
    type: keyof typeof NotificationType;
    sender: { name: string };
    createdAt: string;
    status: NotificationStatus;
}

const NotificationIcon: React.FC<{ notifications: Array<Notification> }> = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = async () => {
        if (!isOpen) {
            // If the dropdown is being opened, update notifications to READ
            await markNotificationsAsRead();
        }
        setIsOpen(!isOpen);
    };

    const markNotificationsAsRead = async () => {
        try {
            // Assuming you have an endpoint to mark notifications as read
            notifications.forEach(async notification => {
                await notificationService.patch(notification.id, { type: NotificationStatus.READ });
            });
            // Optionally, you can update the local state to reflect the changes
            // For example, you can map through notifications and set the status to READ
        } catch (error) {
            console.error("Failed to mark notifications as read:", error);
        }
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="p-2">
                <FontAwesomeIcon icon={faBell} className="text-xl" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
                    <ul className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <li key={notification.id} className={`p-2 border-b ${notification?.status === NotificationStatus.UNREAD ? 'bg-gray-100' : ''}`}>
                                    <span className="font-semibold">You have a notification from {notification.sender.name} for </span>
                                    <span className="font-semibold">{NotificationType[notification.type]}</span>
                                    <span className="text-gray-500 text-sm block">{new Date(notification.createdAt).toLocaleString()}</span>
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-center">No notifications</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationIcon;