export enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 0,
    DELETED = -1
}

export enum UserRole {
    MENTOR = "mentor",
    MENTEE = "mentee"
}

export interface User_GET {
    id: string;
    name: string;
    email: string;
    profile_id: number;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface User_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<User_GET>;
}

export interface User_POST {
    name: string;
    email: string;
    password?: string;
    profile_id?: number;
    role?: UserRole;
    status?: UserStatus;
}

export interface User_PATCH {
    name?: string;
    email?: string;
    profile_id?: number;
    password?: string;
    role?: UserRole;
    status?: UserStatus;
}

export interface User_QUERY {
    name?: string;
    email?: any;
    role?: any;
    profile_id?: number;
    status?: any;
    createdAt?: any;
    updatedAt?: any;
}