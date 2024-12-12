import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '@feathersjs/authentication';
import { UserDBOperations } from '../../../../db_services/v1/user/utils/UserDBOperations';
import { UserStatus } from '../../../../db_services/v1/user/interfaces/UserInterface';

export const CheckToken = () => async (context: HookContext) => {
  const { app, params } = context;
  if (!params.headers || !params.headers.authorization) {
    throw new NotAuthenticated('Invalid attempt, Access token is required in headers.');
  }
  const accessToken = params.headers.authorization.split(' ')[1];

  if (!accessToken) {
    throw new NotAuthenticated('Please Login');
  }

  if (accessToken) {
    const tokenData = jwtDecode(accessToken);
    // console.log(
    //     "Token Data", tokenData
    // );

    const { exp, sub } = tokenData;
    if (exp && Date.now() <= exp * 1000 && sub) {
      const user = await UserDBOperations.getDetails({
        id: sub,
        dbQuery: {
          status: UserStatus.ACTIVE
        }
      }).catch((e) => {
        console.error('Error ::', e);
        throw new BadRequest('User not found');
      });

      context.result = {
        accessToken,
        user
      };

    } else {
      if (!sub) throw new BadRequest('Invaild Token');
      const user = await UserDBOperations.getDataWithoutPagination({
        dbQuery: {
          status: UserStatus.ACTIVE
        },
        specifiedQuery: {
          $or: [
            { _id: sub },
          ]
        }
      }).catch((e) => {
        console.error('Error ::', e);
        throw new BadRequest('User not found');
      }).then((res) => res[0]);

      const authenticateService: AuthenticationService = app.service('authentication');
      const expTime = app.get('jwtOptions').expiresIn;
      const payload = {
        sub: user._id,
        expiresIn: expTime
      };
      const token = authenticateService.createAccessToken(payload);

      context.result = {
        accessToken: token,
        user
      };
    }
  }
};