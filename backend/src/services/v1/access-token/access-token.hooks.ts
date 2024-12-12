import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import { CheckToken } from './hook/CheckToken';
import { disallow } from 'feathers-hooks-common';

export default {
  before: {
    all: [],
    find: [CheckToken()],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
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
