// Initializes the `v1/profile-management` service on path `/v1/profile-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { ProfileManagement } from './profile-management.class';
import hooks from './profile-management.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/profile-management': ProfileManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/profile-management', new ProfileManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/profile-management');

  service.hooks(hooks);
}
