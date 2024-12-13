// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { ProfileStatus } from './interfaces/ProfileInterface';
import { User } from '../user/user.model';

export class Profile extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'profile';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: [],

      properties: {
        user_id: { type: 'number' },
        profile_picture: { type: ['string', 'null'] },
        bio: { type: 'string' },
        skills: {
          type: ['array', 'null'],
          items: {
            type: 'string',
          },
        },
        interests: {
          type: ['array', 'null'],
          items: {
            type: 'string',
          },
        },
        status: { type: 'number', enum: [ProfileStatus.ACTIVE, ProfileStatus.INACTIVE, ProfileStatus.DELETED] },
      }
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date();
  }

  $formatDatabaseJson(json: any): any {
    const finalObject: any = {};
    if (Profile.jsonSchema.properties) {
      [...Object.keys(Profile.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
        if (typeof json[e] !== 'undefined') {
          finalObject[e] = json[e];
        }
      });
    }
    return super.$formatDatabaseJson(finalObject);
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'profile.user_id',
          to: 'user.id',
        },
      }
    };
  }
}

export default function (app: Application): typeof Profile {
  const db: Knex = app.get('knex');

  db.schema.hasTable('profile').then(exists => {
    if (!exists) {
      db.schema.createTable('profile', table => {
        table.increments('id');
        table.integer('user_id').unsigned().notNullable();
        table.string('profile_picture');
        table.text('bio');
        table.json('skills');
        table.json('interests');
        table.integer('status').defaultTo(ProfileStatus.ACTIVE);
        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
      })
        .then(() => console.log('Created profile table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating profile table', e)); // eslint-disable-line no-console
    }
    // else {
    //   db.schema
    //     .alterTable('profile', (table) => {
    //       table.string('profile_picture');
    //     })
    //     .then(() => console.log('Altered profile table')) // eslint-disable-line no-console
    //     .catch((e) => console.error('Error creating profile table', e));
    // }
  })
    .catch(e => console.error('Error creating profile table', e)); // eslint-disable-line no-console

  return Profile;
}
