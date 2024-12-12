import { Params, ServiceAddons } from '@feathersjs/feathers';

import {
    MentorshipRequest_QUERY as Query,
    MentorshipRequest_POST as Body_POST,
    MentorshipRequest_FIND as Data,
    MentorshipRequest_GET as Datum,
    MentorshipRequest_PATCH as Body_Patch,
} from '../interfaces/MentorshipRequestInterface';
import { MentorshipRequests } from '../mentorship_requests.class';

export class MentorshipRequestDBOperations {
    private static _service: MentorshipRequests & ServiceAddons<any>;
    static _servicePath = 'v1/mentorship-requests';

    /**
       * Initialize service
       * @param service - Service value.
       */
    static initializeService(service: MentorshipRequests & ServiceAddons<any>) {
        MentorshipRequestDBOperations._service = service;

    }

    /**
       * Get data.
       * @param dbQuery - Db fields related query.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object from context.
       */
    static async getDataWithPagination({
        dbQuery,
        specifiedQuery = {},
        params = {},
    }: {
        dbQuery: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            ._find({
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    ...params,
                },
            })
            .then((res) => {
                return res as Data;
            });
    }

    /**
       * Get data.
       * @param dbQuery - Db fields related query.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object
       */
    static async getDataWithoutPagination({
        dbQuery,
        specifiedQuery = {},
        params = {},
    }: {
        dbQuery: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            ._find({
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    ...params,
                },
                paginate: false,
            })
            .then((res) => {
                return res as Array<Datum>;
            });
    }

    /**
       * Get details.
       * @param id - Id of the data.
       * @param dbQuery - Db fields a related query.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object
       */
    static async getDetails({
        id,
        dbQuery,
        specifiedQuery = {},
        params = {},
    }: {
        id: number;
        dbQuery: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            ._get(id, {
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    ...params,
                },
                paginate: false,
            })
            .then((res) => {
                return res as Datum;
            });
    }

    /**
       * create data.
       * @param dbBody - Body of the request.
       * @param dbQuery - Query related to fields.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object
       */
    static async createDatum({
        dbBody,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        dbBody: Body_POST;
        dbQuery?: any;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            .create(
                {
                    ...dbBody,
                },
                {
                    ...params,
                    query: {
                        ...dbQuery,
                        ...specifiedQuery,
                    },
                    provider: 'server',
                },
            )
            .then((res) => {
                return res as Datum;
            })
            .catch((e) => {
                throw e;
            });
    }

    /**
       * create data.
       * @param dbBody - Body of the request.
       * @param dbQuery - Query related to fields.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object
       */
    static async createData({
        dbBody,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        dbBody: Array<Body_POST>;
        dbQuery?: any;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            .create(dbBody, {
                ...params,
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                    $limit: dbBody.length,
                },
                provider: 'server',
            })
            .then((res) => {
                return res as Array<Datum>;
            });
    }

    /**
       * Modify data.
       * @param id - datum id.
       * @param dbBody - Body of the request.
       * @param dbQuery - Query of the request.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object
       */
    static async modifyDatum({
        id,
        dbBody,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        id: string | null;
        dbBody: Body_Patch;
        dbQuery?: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            .patch(
                id,
                {
                    ...dbBody,
                },
                {
                    ...params,
                    query: {
                        ...dbQuery,
                        ...specifiedQuery,
                    },
                    provider: 'server',
                },
            )
            .then((res) => {
                if (id) {
                    return res as Datum;
                } else {
                    return res as Array<Datum>;
                }
            });
    }

    /**
       * Delete data.
       * @param id - datum id.
       * @param dbQuery - Query of the request.
       * @param specifiedQuery - Any other specified query like $sort, $limit etc.
       * @param params - Feathers params object
       */
    static async deleteDatum({
        id,
        dbQuery = {},
        specifiedQuery = {},
        params = {},
    }: {
        id: number;
        dbQuery?: Query;
        specifiedQuery?: any;
        params?: Params;
    }) {
        return await MentorshipRequestDBOperations._service
            .remove(id, {
                ...params,
                query: {
                    ...dbQuery,
                    ...specifiedQuery,
                },
                provider: 'server',
            })
            .then((res) => {
                return res as Datum;
            });
    }
}