import crypto from 'crypto';
import sql    from 'ms-db';

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

  const [user] = await sql`
      update "Users"."Users"
      set "code"    = ${code},
          "updated" = now()
      where "email" = ${email}
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
