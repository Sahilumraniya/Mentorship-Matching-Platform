// Initializes the `v1/notification` service on path `/v1/notification`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Notification } from './notification.class';
import createModel from './notification.model';
import hooks from './notification.hooks';
import { NotificationDBOperations } from './utils/NotificationDBOperations';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/notification': Notification & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/notification', new Notification(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/notification');
  NotificationDBOperations.initializeService(service);

  service.hooks(hooks);
}
