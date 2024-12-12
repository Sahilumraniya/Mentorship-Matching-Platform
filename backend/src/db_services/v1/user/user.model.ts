// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import Knex, { Knex as KnexType } from 'knex';
import { Application } from '../../../declarations';
import { UserRole, UserStatus } from './interfaces/UserInterface';

class User extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'user';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['password'],

      properties: {

        email: { type: ['string', 'null'] },
        password: { type: 'string' },

      }
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date();
  }
}

export default function (app: Application): typeof User {
  const db: KnexType = app.get('knex');

  db.schema.hasTable('user').then(exists => {
    if (!exists) {
      db.schema.createTable('user', table => {
        table.increments('id');

        table.string('name');
        table.string('email').unique();
        table.string('password');

        table.enum('role', [UserRole.MENTEE, UserRole.MENTOR]).defaultTo(UserRole.MENTEE);
        table.enum('status', [UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.DELETED]).defaultTo(UserStatus.ACTIVE);

        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created user table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating user table', e)); // eslint-disable-line no-console
    }
    // else {
    //   db.schema
    //     .alterTable('user', (table) => {
    //       table.string('name');
    //     })
    //     .then(() => console.log('Altered user table')) // eslint-disable-line no-console
    //     .catch((e) => console.error('Error creating user table', e));
    // }
  })
    .catch(e => console.error('Error creating user table', e)); // eslint-disable-line no-console

  return User;
}
