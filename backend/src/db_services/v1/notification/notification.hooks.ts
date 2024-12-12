import { HooksObject } from '@feathersjs/feathers';
import { disallow, iff, isProvider } from 'feathers-hooks-common';
import PatchDeleted from '../../../hooks/PatchDeleted';

export default {
  before: {
    all: [iff(isProvider('server')).else(disallow())],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [],
    remove: [PatchDeleted()],
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
