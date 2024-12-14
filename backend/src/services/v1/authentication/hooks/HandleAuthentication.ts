import { HookContext } from '@feathersjs/feathers';
import { ProfileDBOperations } from '../../../../db_services/v1/profile/utils/ProfileDBOperations';

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
      const profile = await ProfileDBOperations.getDetails({
        id: result.user.profile_id,
        dbQuery: {}
      })
      context.result = {
        accessToken: result.accessToken,
        user: { ...result.user, profile_picture: profile.profile_picture }
      };
      break;
    default:
      break;
  }
};