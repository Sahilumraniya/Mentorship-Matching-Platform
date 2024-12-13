// Initializes the `v1/mentorship_requests` service on path `/v1/mentorship-requests`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { MentorshipRequests } from './mentorship_requests.class';
import createModel from './mentorship_requests.model';
import hooks from './mentorship_requests.hooks';
import { MentorshipRequestDBOperations } from './utils/MentorshipRequestDBOperations';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/mentorship-requests': MentorshipRequests & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager'],
  };

  // Initialize our service with any options it requires
  app.use('/v1/mentorship-requests', new MentorshipRequests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/mentorship-requests');
  MentorshipRequestDBOperations.initializeService(service);

  service.hooks(hooks);
}
