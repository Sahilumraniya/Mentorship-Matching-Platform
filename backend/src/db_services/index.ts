import { Application } from '../declarations';
import v1 from './v1';

export default function (app: Application): void {
  app.configure(v1);
}