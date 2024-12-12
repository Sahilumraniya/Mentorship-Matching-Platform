import { Application } from '../declarations';
import v1 from './v1';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(v1);
}
