import { HookContext } from '@feathersjs/feathers';

export const SetUserId = (filedName = 'userId') => async (context: HookContext) => {
  const { params } = context;

  const user = params.user;

  context.data[filedName] = user?.id;
  
  return context;
};