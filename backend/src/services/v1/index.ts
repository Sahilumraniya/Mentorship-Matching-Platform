import { Application } from '../../declarations';
import user from './user-management/user-management.service';
import accessToken from './access-token/access-token.service';
import authentication from './authentication/authentication.service';

export default function (app: Application): void {
    app.configure(user);
    app.configure(accessToken);
    app.configure(authentication);
}