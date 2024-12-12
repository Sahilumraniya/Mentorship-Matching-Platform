import { HookContext } from '@feathersjs/feathers';

export const HandleAuthentication = () => async (context: HookContext) => {
  const { data, app } = context;
  const { strategy } = data;

  switch (strategy) {
    case 'local':
      const { email, password } = data;
      const result = await app.service('authentication').create({
        strategy,
        email,
        password
      });
      context.result = {
        accessToken: result.accessToken,
        user: result.user
      };
      break;
    default:
      break;
  }
};