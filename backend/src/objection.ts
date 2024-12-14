import { Model } from 'objection';
import knex from 'knex';
import { Application } from './declarations';

export default function (app: Application): void {
  let { client, connection } = app.get('mysql');
  if (process.env.DB_URL) {
    connection = process.env.DB_URL;
  }
  const db = knex({ client, connection, useNullAsDefault: false });

  Model.knex(db);

  app.set('knex', db);
}
