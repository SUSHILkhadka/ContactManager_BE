import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('id');
    // table.string('email').notNullable();
    table.string('name').notNullable();
    table.string('phoneNumber').notNullable();
    table.string('photograph').notNullable();
    table.boolean('favourite').notNullable();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('id').inTable('user_account').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contacts');
}
