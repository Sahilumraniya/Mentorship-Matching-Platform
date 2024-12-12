// Initializes the `v1/authentication` service on path `/v1/authentication`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Authentication } from './authentication.class';
import hooks from './authentication.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/authentication': Authentication & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/authentication', new Authentication(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/authentication');

  service.hooks(hooks);
}
