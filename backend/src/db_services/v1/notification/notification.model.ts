// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../../declarations';
import { User } from '../user/user.class';
import { NotificationStatus, NotificationType } from './interfaces/NotificationInterface';

class Notification extends Model {
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName(): string {
    return 'notification';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: [],

      properties: {
        sender_id: { type: 'number' },
        receiver_id: { type: 'number' },
        type: { type: 'number', enum: [NotificationType.MentorshipAccept, NotificationType.MentorshipReject, NotificationType.MentorshipRequest, NotificationType.OTHER], default: NotificationType.OTHER },
        content: { type: 'string' },
        status: { type: 'number', enum: [NotificationStatus.READ, NotificationStatus.UNREAD, NotificationStatus.DELETED], default: NotificationStatus.UNREAD },
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
    if (Notification.jsonSchema.properties) {
      [...Object.keys(Notification.jsonSchema.properties), 'createdAt', 'updatedAt'].forEach((e) => {
        if (typeof json[e] !== 'undefined') {
          finalObject[e] = json[e];
        }
      });
    }
    return super.$formatDatabaseJson(finalObject);
  }

  static get relationMappings(): any {
    return {
      sender: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'notification.sender_id',
          to: 'user.id',
        },
      },
      receiver: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'notification.receiver_id',
          to: 'user.id',
        },
      },
    };
  }
}

export default function (app: Application): typeof Notification {
  const db: Knex = app.get('knex');

  db.schema.hasTable('notification').then(exists => {
    if (!exists) {
      db.schema.createTable('notification', table => {
        table.increments('id');
        table.integer('sender_id').unsigned().notNullable();
        table.integer('receiver_id').unsigned().notNullable();
        table.integer('type').notNullable().defaultTo(NotificationType.OTHER);
        table.text('content');
        table.integer('status').defaultTo(NotificationStatus.UNREAD);
        table.timestamp('createdAt', { useTz: true }).defaultTo(db.fn.now());
        table.timestamp('updatedAt', { useTz: true }).defaultTo(db.fn.now());
      })
        .then(() => console.log('Created notification table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating notification table', e)); // eslint-disable-line no-console
    }
    // else {
    //   db.schema
    //     .alterTable('notification', (table) => {
    //       table.integer('type').notNullable().defaultTo(NotificationType.OTHER).alter();
    //     })
    //     .then(() => console.log('Altered notification table')) // eslint-disable-line no-console
    //     .catch((e) => console.error('Error creating notification table', e));
    // }
  })
    .catch(e => console.error('Error creating notification table', e)); // eslint-disable-line no-console

  return Notification;
}
