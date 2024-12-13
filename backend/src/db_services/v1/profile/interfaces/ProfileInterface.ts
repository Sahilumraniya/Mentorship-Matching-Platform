export enum ProfileStatus {
    ACTIVE = 1,
    INACTIVE = 0,
    DELETED = -1
}


export interface Profile_GET {
    id: string;
    user_id: number;
    profile_picture: string;
    bio: string;
    skills: Array<string>;
    interests: Array<string>;
    status: ProfileStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Profile_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<Profile_GET>;
}

export interface Profile_POST {
    user_id: number;
    bio: string;
    profile_picture: string;
    skills: Array<string>;
    interests: Array<string>;
    status?: ProfileStatus;
}

export interface Profile_PATCH {
    user_id?: number;
    profile_picture?: string;
    bio?: string;
    skills?: Array<string>;
    interests?: Array<string>;
    status?: ProfileStatus;
}

export interface Profile_QUERY {
    user_id?: any;
    profile_picture?: any;
    bio?: any;
    skills?: any;
    interests?: any;
    status?: any;
    createdAt?: any;
    updatedAt?: any;
}