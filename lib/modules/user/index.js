import crypto    from 'crypto';
import { query } from '../datastore/index.js';

export async function byUUID(uuid) {
  const { rows: [user] } = await query(`
      select "uuid",
             "company_uuid",
             "name",
             "email",
             "type",
             "meta",
             "created",
             "updated"
      from "Users"
      where "uuid" = $1
  `, [uuid]);

  return user;
}

export async function byCode(code) {
  const { rows: [user] } = await query(`
      select "uuid",
             "company_uuid",
             "code",
             "name",
             "email",
             "type",
             "meta",
             "created",
             "updated"
      from "Users"
      where "code" = $1
  `, [code]);

  return user;
}

export async function auth(email) {
  let code = Math.abs(crypto.randomBytes(4).readInt32BE());

  if (email === 'demo@example.com') {
    code = '1234567890';
  }

  const { rows: [user] } = await query(`
      update "Users"
      set "code"    = $2,
          "updated" = now()
      where "email" = $1
      returning *
  `, [email, code]);

  return user;
}

export async function reset(user_uuid) {
  const { rows: [user] } = await query(`
      update "Users"
      set "code" = null
      where "uuid" = $1
        and "email" != 'demo@example.com'
      returning *
  `, [user_uuid]);

  return user;
}
