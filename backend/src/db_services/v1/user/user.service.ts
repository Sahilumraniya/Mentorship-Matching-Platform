// Initializes the `user` service on path `/user`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { User } from './user.class';
import createModel from './user.model';
import hooks from './user.hooks';
import { UserDBOperations } from './utils/UserDBOperations';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/user': User & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager'],
  };

  // Initialize our service with any options it requires
  app.use('v1/user', new User(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/user');
  UserDBOperations.initializeService(service);

  service.hooks(hooks);
}
