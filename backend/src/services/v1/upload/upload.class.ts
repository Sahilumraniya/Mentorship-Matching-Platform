import { Id, NullableId, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';

interface Data { }

interface ServiceOptions { }


export class Upload implements ServiceMethods<Data>  {
    app: Application;
    options: ServiceOptions;

    constructor(options: ServiceOptions = {}, app: Application) {
      this.options = options;
      this.app = app;
    }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async find(params?: Params) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async get(id: Id, params?: Params) {
      return { id };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async create(data: Data, params?: Params) {
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: NullableId, data: Data, params?: Params) {
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async patch(id: NullableId, data: Data, params?: Params) {
      return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async remove(id: NullableId, params?: Params) {
      return { id };
    }
}
