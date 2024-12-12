export enum MentorshipRequestStatus {
    PENDING = 1,
    ACCEPTED = 2,
    REJECTED = 3,
    DELETED = -1
}


export interface MentorshipRequest_GET {
    id: string;
    sender_id: number;
    receiver_id: number;
    text: string;
    status: MentorshipRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface MentorshipRequest_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<MentorshipRequest_GET>;
}

export interface MentorshipRequest_POST {
    sender_id: number;
    receiver_id: number;
    text?: string;
    status?: MentorshipRequestStatus;
}

export interface MentorshipRequest_PATCH {
    sender_id?: number;
    receiver_id?: number;
    text?: string;
    status?: MentorshipRequestStatus;
}

export interface MentorshipRequest_QUERY {
    sender_id?: any;
    receiver_id?: any;
    text?: any;
    status?: any;
    createdAt?: any;
    updatedAt?: any;
}