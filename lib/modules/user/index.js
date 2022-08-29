import crypto     from 'crypto';
import sql        from 'ms-db';
import { sample } from '../company/index.js';

export async function byUUID(uuid) {
  const [user] = await sql`
      select "uuid",
             "company_uuid",
             "name",
             "email",
             "type",
             "meta",
             "created",
             "updated"
      from "Users"."Users"
      where "uuid" = ${uuid}
  `;

  return user;
}

export async function byCode(code) {
  const [user] = await sql`
      select "uuid",
             "company_uuid",
             "code",
             "name",
             "email",
             "type",
             "meta",
             "created",
             "updated"
      from "Users"."Users"
      where "code" = ${code}
  `;

  return user;
}

export async function auth(email) {
  let code = Math.abs(crypto.randomBytes(4).readInt32BE());

  if (email === 'demo@example.com') {
    code = '1234567890';
  }
  const name    = email.split('@')[0];
  const company = await sample();

  const [user] = await sql`
      insert into "Users"."Users"("company_uuid", "email", "name", "code", "type", "updated")
      values (${company.uuid}, ${email}, ${name}, ${code}, 'user', now())
      on conflict("email") do update set "code"    = excluded.code,
                                         "updated" = now()
      returning *
  `;

  return user;
}

export async function reset(user_uuid) {
  const [user] = await sql`
      update "Users"."Users"
      set "code" = null
      where "uuid" = ${user_uuid}
        and "email" != 'demo@example.com'
      returning *
  `;

  return user;
}
