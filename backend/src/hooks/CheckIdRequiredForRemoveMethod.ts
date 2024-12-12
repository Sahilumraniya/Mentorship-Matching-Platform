/**
 * Created By Sahil(sahilumraniya9512@gmail.com) on 10-09-2024
 */
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

/**
 * @description check if id given or not during remove method.
 * @constructor
 */
const CheckIdRequiredForRemoveMethod = () => async (context: HookContext) => {
  const { id, method } = context;

  if (method === 'remove') {
    if (!id) throw new BadRequest('An id must be required to remove the item.');
  }
};

export default CheckIdRequiredForRemoveMethod;
