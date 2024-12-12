import * as local from '@feathersjs/authentication-local';
import PatchDeleted from '../../../hooks/PatchDeleted';
// Don't remove this comment. It's needed to format import lines nicely.

import { disallow, iff, isProvider } from 'feathers-hooks-common';
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [iff(isProvider('server')).else(disallow())],
    find: [],
    get: [],
    create: [hashPassword('password')],
    update: [disallow()],
    patch: [hashPassword('password')],
    remove: [PatchDeleted()],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
