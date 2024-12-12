// Initializes the `v1/notification-managemnt` service on path `/v1/notification-managemnt`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { NotificationManagemnt } from './notification-managemnt.class';
import hooks from './notification-managemnt.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/notification-managemnt': NotificationManagemnt & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/notification-managemnt', new NotificationManagemnt(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/notification-managemnt');

  service.hooks(hooks);
}
