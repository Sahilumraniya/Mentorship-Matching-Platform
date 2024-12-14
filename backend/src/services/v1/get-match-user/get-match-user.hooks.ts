import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { GetMatchUser } from './hook/GetMatchUser';
const { authenticate } = authentication.hooks;


export default {
  before: {
    all: [authenticate('jwt')],
    find: [GetMatchUser()],
    get: [GetMatchUser()],
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
