import { HooksObject } from '@feathersjs/feathers';
import FRequired from '../../../hooks/FRequired';
import { iff } from 'feathers-hooks-common';
import hasData from '../../../hooks/hasData';
import { HandleAuthentication } from './hooks/HandleAuthentication';

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [FRequired(['strategy']),
    iff(hasData('strategy', 'local'), FRequired(['email', 'password'])),
    HandleAuthentication()],
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
    all: [(error: any) => {
      console.log(error);
    }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
