import { Application } from '../../declarations';
import user from './user/user.service';
import profile from './profile/profile.service';
import mentorshipRequest from './mentorship_requests/mentorship_requests.service';
import notification from './notification/notification.service';

export default function (app: Application): void {
    app.configure(user);
    app.configure(profile);
    app.configure(mentorshipRequest);
    app.configure(notification);
}