import * as feathersAuthentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { S3Utilities } from '../../../utils/S3Utilities';
import { UploadURL } from './hooks/UploadURL';
import { RemoveFile } from './hooks/RemoveFile';
import { disallow } from 'feathers-hooks-common';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [
            /*authenticate('jwt')*/
        ],
        find: [disallow()],
        get: [disallow()],
        create: [UploadURL()],
        update: [disallow()],
        patch: [disallow()],
        remove: [RemoveFile()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
