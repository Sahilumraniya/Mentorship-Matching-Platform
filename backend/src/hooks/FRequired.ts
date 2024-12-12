/**
 * Created By Sahil(sahilumraniya9512@gmail.com) on 10-09-2024
 */
import { HookContext } from '@feathersjs/feathers';
import { checkContext, getItems } from 'feathers-hooks-common';
import { BadRequest } from '@feathersjs/errors';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import getByDot from 'lodash/get';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import existsByDot from 'lodash/has';

/**
 *
 * @param fieldNames
 * @param message
 * @constructor
 */
const FRequired =
    (fieldNames: Array<string> | string, message = '%name% is required') =>
      (context: HookContext) => {
        checkContext(context, 'before', ['create', 'update', 'patch'], 'Required');

        const _items: Array<string> = getItems(context);

        const items: Array<string> = Array.isArray(_items) ? _items : [_items];

        if (!Array.isArray(fieldNames)) fieldNames = [fieldNames];

        const fields: Array<string> = fieldNames;

        items.forEach((item) =>
          fields.forEach((each) => {
            if (Array.isArray(each)) {
              const [name, nickName] = each;

              const newMessage = message.replace('%name%', nickName);

              if (!existsByDot(item, name)) throw new BadRequest(newMessage);

              const value: any = getByDot(item, name);

              if (!value && value !== 0 && value !== false) throw new BadRequest(newMessage);
            } else {
              const newMessage = message.replace('%name%', each);

              if (!existsByDot(item, each)) throw new BadRequest(newMessage);

              const value = getByDot(item, each);

              if (!value && value !== 0 && value !== false) throw new BadRequest(newMessage);
            }
          }),
        );

        return context;
      };

export default FRequired;
