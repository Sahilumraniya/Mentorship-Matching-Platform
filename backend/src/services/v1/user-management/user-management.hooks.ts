import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import SetDefaultQuery from '../../../hooks/SetDefaultQuery';
import { UserStatus } from '../../../db_services/v1/user/interfaces/UserInterface';
import FRequired from '../../../hooks/FRequired';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [SetDefaultQuery('status', UserStatus.ACTIVE)],
    get: [],
    create: [FRequired(['name', 'email', 'password']),],
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
    all: [(error: any) => console.log(error)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
