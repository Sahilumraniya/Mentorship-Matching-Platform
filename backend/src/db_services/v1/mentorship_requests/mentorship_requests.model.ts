// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { User } from '../user/user.model';
import { MentorshipRequestStatus } from './interfaces/MentorshipRequestInterface';

class MentorshipRequests extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'mentorship_requests';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: [],

      properties: {
        sender_id: { type: 'number' },
        receiver_id: { type: 'number' },
        text: { type: ['string', 'null'] },
        status: { type: 'number', enum: [MentorshipRequestStatus.PENDING, MentorshipRequestStatus.ACCEPTED, MentorshipRequestStatus.REJECTED, MentorshipRequestStatus.DELETED], default: MentorshipRequestStatus.PENDING },
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
    if (MentorshipRequests.jsonSchema.properties) {
      [...Object.keys(MentorshipRequests.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
        if (typeof json[e] !== 'undefined') {
          finalObject[e] = json[e];
        }
      });
    }
    return super.$formatDatabaseJson(finalObject);
  }

  static get relationMappings() {
    return {
      sender: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'mentorship_requests.sender_id',
          to: 'user.id',
        },
      },
      receiver: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'mentorship_requests.receiver_id',
          to: 'user.id',
        },
      },
    }
  }
}

export default function (app: Application): typeof MentorshipRequests {
  const db: Knex = app.get('knex');

  db.schema.hasTable('mentorship_requests').then(exists => {
    if (!exists) {
      db.schema.createTable('mentorship_requests', table => {
        table.increments('id');
        table.integer('sender_id').unsigned().notNullable();
        table.integer('receiver_id').unsigned().notNullable();
        table.text('text');
        table.integer('status').notNullable();
        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
      })
        .then(() => console.log('Created mentorship_requests table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating mentorship_requests table', e)); // eslint-disable-line no-console
    }
    // else {
    //   db.schema
    //     .alterTable('mentorship_requests', (table) => {
    //       table.text('text').alter();
    //     })
    //     .then(() => console.log('Altered mentorship_requests table')) // eslint-disable-line no-console
    //     .catch((e) => console.error('Error creating mentorship_requests table', e));
    // }
  })
    .catch(e => console.error('Error creating mentorship_requests table', e)); // eslint-disable-line no-console

  return MentorshipRequests;
}
