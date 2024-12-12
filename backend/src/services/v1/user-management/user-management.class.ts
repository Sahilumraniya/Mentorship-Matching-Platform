import { Id, NullableId, Paginated, Params, ServiceAddons, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { User } from '../../../db_services/v1/user/user.class';
import { userPath } from '../../../service_endpoints/services';
import { FeathersError } from '@feathersjs/errors';

interface Data {}

interface ServiceOptions {}

export class UserManagement implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;
  service: User & ServiceAddons<any>;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
    this.service = app.service(userPath);
  }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return await this.service.find({ ...params, provider: undefined }).catch((e: FeathersError) => {
      throw e;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return await this.service.get(id, { ...params, provider: undefined }).catch((e: FeathersError) => {
      throw e;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    return await this.service.create(data, { ...params, provider: undefined }).catch((e: FeathersError) => {
      throw e;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return await this.service.patch(id, data, { ...params, provider: undefined }).catch((e: FeathersError) => {
      throw e;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return await this.service.remove(id, { ...params, provider: undefined }).catch((e: FeathersError) => {
      throw e;
    });
  }
}
