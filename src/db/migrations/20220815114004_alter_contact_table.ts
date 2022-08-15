import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.alterTable('contacts', (table) => {
        table.string('email');
        table.string('workNumber');
        table.string('homeNumber');
  });

}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('contacts', (table) => {
        table.dropColumn('email');
        table.dropColumn('workNumber');
        table.dropColumn('homeNumber');
  });

}

