import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('refresh_token', (table) => {
        table.string('refreshToken').notNullable();
        table.string('id').notNullable();
        table.string('expiresAt').notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('refresh_token');

}

