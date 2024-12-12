// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import Objection, { Model, JSONSchema } from 'objection';
import Knex, { Knex as KnexType } from 'knex';
import { Application } from '../../../declarations';
import { UserRole, UserStatus } from './interfaces/UserInterface';

export class User extends Model {
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
        name: { type: 'string' },
        email: { type: ['string', 'null'] },
        password: { type: 'string' },
        role: { type: 'string', enum: [UserRole.MENTEE, UserRole.MENTOR] },
        status: { type: 'number', enum: [UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.DELETED] },
      }
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  $formatDatabaseJson(json: Objection.Pojo): Objection.Pojo {
    const finalObject: Objection.Pojo = {};
    if (User.jsonSchema.properties) {
      [...Object.keys(User.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
        if (typeof json[e] !== 'undefined') {
          finalObject[e] = json[e];
        }
      });
    }
    return super.$formatDatabaseJson(finalObject);
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
        table.integer('status').defaultTo(UserStatus.ACTIVE);

        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
      })
        .then(() => console.log('Created user table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating user table', e)); // eslint-disable-line no-console
    }
    // else {
    //   db.schema
    //     .alterTable('user', (table) => {
    //       table.integer('status').defaultTo(UserStatus.ACTIVE).alter();
    //     })
    //     .then(() => console.log('Altered user table')) // eslint-disable-line no-console
    //     .catch((e) => console.error('Error creating user table', e));
    // }
  })
    .catch(e => console.error('Error creating user table', e)); // eslint-disable-line no-console

  return User;
}
