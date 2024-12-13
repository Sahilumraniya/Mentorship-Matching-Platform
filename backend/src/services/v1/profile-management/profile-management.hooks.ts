import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { SetUserId } from '../../../hooks/SetUserId';
import SetDefaultQuery from '../../../hooks/SetDefaultQuery';
import FRequired from '../../../hooks/FRequired';
import { AddAWSURL } from './hook/AddAWSURL';
import { Filter } from './hook/Filter';
import { AddProfileId } from './hook/AddProfileId';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [SetDefaultQuery('status', { $ne: -1 }), Filter()],
    get: [SetDefaultQuery('status', { $ne: -1 }), Filter()],
    create: [FRequired(['bio', 'skills', 'interests']), SetUserId('user_id'), AddAWSURL("profile_picture")],
    update: [],
    patch: [AddAWSURL("profile_picture")],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [AddProfileId()],
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
