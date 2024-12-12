// Initializes the `v1/profile` service on path `/v1/profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Profile } from './profile.class';
import createModel from './profile.model';
import hooks from './profile.hooks';
import { ProfileDBOperations } from './utils/ProfileDBOperations';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/profile': Profile & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager'],
  };

  // Initialize our service with any options it requires
  app.use('/v1/profile', new Profile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/profile');
  ProfileDBOperations.initializeService(service);

  service.hooks(hooks);
}
