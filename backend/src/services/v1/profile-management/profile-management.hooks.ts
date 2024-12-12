import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { SetUserId } from '../../../hooks/SetUserId';
import SetDefaultQuery from '../../../hooks/SetDefaultQuery';
import FRequired from '../../../hooks/FRequired';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [SetDefaultQuery('status', { $ne: -1 })],
    get: [],
    create: [FRequired(['bio', 'skills', 'interests']), SetUserId('user_id')],
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
