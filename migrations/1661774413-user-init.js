import { byEmail } from '../lib/modules/company/index.js';

export async function up(client) {
  const company = await byEmail({ email: 'support@example.com' });

  await client`drop table IF EXISTS "Users"."Users"`;
  await client`
      create table "Users"."Users"
      (
          uuid         uuid                     default gen_random_uuid() not null,
          company_uuid uuid                                               not null,
          name         varchar                                            not null,
          email        varchar                                            not null,
          code         varchar                                            null,
          type         varchar                  default 'user'            not null,
          meta         jsonb                    default '{}'              not null,
          created      timestamp with time zone default now()             not null,
          updated      timestamp with time zone default now()             not null
      )`;

  await client`
      insert into "Users"."Users"("company_uuid", "name", "email", "code")
      values (${company.uuid}, 'demo', 'demo@example.com', '1234567890')
  `;

  await client`
      insert into "Users"."Users"("company_uuid", "name", "email", "type")
      values (${company.uuid}, 'admin', 'admin@example.com', 'admin')
  `;

}

export async function down(client) {
  // just in case...
}
