// Initializes the `v1/mentorship-requests-management` service on path `/v1/mentorship-requests-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { MentorshipRequestsManagement } from './mentorship-requests-management.class';
import hooks from './mentorship-requests-management.hooks';
import { SendNotifications } from './utils/SendNotifications';
import { MentorshipRequestStatus } from '../../../db_services/v1/mentorship_requests/interfaces/MentorshipRequestInterface';
import { NotificationType } from '../../../db_services/v1/notification/interfaces/NotificationInterface';
import { OnCreate } from './event/Oncreate';
import { OnUpdate } from './event/OnUpdate';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/mentorship-requests-management': MentorshipRequestsManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/mentorship-requests-management', new MentorshipRequestsManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/mentorship-requests-management');

  service.on('created', OnCreate);
  service.on('patched', OnUpdate);

  service.hooks(hooks);
}
