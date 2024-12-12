import { Application } from '../../declarations';
import users from './user/user.service';

export default function (app: Application): void {
  app.configure(users);
}