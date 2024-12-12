import * as authentication from '@feathersjs/authentication';
import { SetUserId } from '../../../hooks/SetUserId';
import SetDefaultQuery from '../../../hooks/SetDefaultQuery';
import { SendNotifications } from './utils/SendNotifications';
import { NotificationType } from '../../../db_services/v1/notification/interfaces/NotificationInterface';
import FRequired from '../../../hooks/FRequired';
import { Vaildations } from './hooks/Vaildations';
import { UpdateRequest } from './hooks/UpdateRequest';
import { GetAllRequest } from './hooks/GetAllRequest';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [SetDefaultQuery('status', { $ne: -1 }), GetAllRequest()],
    get: [],
    create: [FRequired('receiver_id'), SetUserId('sender_id'), Vaildations()],
    update: [],
    patch: [UpdateRequest()],
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
