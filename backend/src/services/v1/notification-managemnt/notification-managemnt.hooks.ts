import * as authentication from '@feathersjs/authentication';
import { HooksObject } from '@feathersjs/feathers';
import SetDefaultQuery from '../../../hooks/SetDefaultQuery';
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [SetDefaultQuery('status', { $ne: -1 })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
