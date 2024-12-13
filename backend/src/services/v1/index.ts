import { Application } from '../../declarations';
import user from './user-management/user-management.service';
import accessToken from './access-token/access-token.service';
import authentication from './authentication/authentication.service';
import upload from './upload/upload.service';
import profile from "./profile-management/profile-management.service";
import mentorshipRequest from "./mentorship-requests-management/mentorship-requests-management.service";
import notification from './notification-managemnt/notification-managemnt.service';

export default function (app: Application): void {
    app.configure(user);
    app.configure(accessToken);
    app.configure(authentication);
    app.configure(upload);
    app.configure(profile);
    app.configure(mentorshipRequest);
    app.configure(notification);
}