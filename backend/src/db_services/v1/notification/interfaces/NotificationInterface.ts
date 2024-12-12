export enum NotificationStatus {
    UNREAD = 0,
    READ = 1,
    DELETED = -1
}

export enum NotificationType {
    MentorshipRequest = 1,
    MentorshipAccept = 2,
    MentorshipReject = 3,
    OTHER = 4
}

export interface Notification_GET {
    id: string;
    sender_id: number;
    receiver_id: number;
    type: NotificationType;
    content: string;
    status: NotificationStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notification_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<Notification_GET>;
}

export interface Notification_POST {
    sender_id: number;
    receiver_id: number;
    type: NotificationType;
    content?: string;
    status?: NotificationStatus;
}

export interface Notification_PATCH {
    sender_id?: number;
    receiver_id?: number;
    type?: NotificationType;
    content?: string;
    status?: NotificationStatus;
}

export interface Notification_QUERY {
    sender_id?: any;
    receiver_id?: any;
    type?: any;
    content?: any;
    status?: any;
    createdAt?: any;
    updatedAt?: any;
}