/**
 * Created By Sahil(sahilumraniya9512@gmail.com) on 27-11-2024
 */
import { HookContext } from '@feathersjs/feathers';

/**
 * @description set createdBy field in object.
 * @param key
 * @constructor
 */
const SetCreatedBy =
    (key = 'user') =>
        (context: HookContext) => {
            const { data } = context;
            const { user } = context.params;

            if (!user) return context;

            if (Array.isArray(context.data)) {
                context.data.map((each) => {
                    each[key] = data.staff_id ? data.staff_id : user._id || user.id;
                });
            } else {
                context.data[key] = data.staff_id ? data.staff_id : user._id || user.id;
            }
            return context;
        };

export default SetCreatedBy;
