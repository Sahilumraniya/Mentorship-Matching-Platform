// Initializes the `v1/get-match-user` service on path `/v1/get-match-user`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { GetMatchUser } from './get-match-user.class';
import hooks from './get-match-user.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/get-match-user': GetMatchUser & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/get-match-user', new GetMatchUser(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/get-match-user');

  service.hooks(hooks);
}
