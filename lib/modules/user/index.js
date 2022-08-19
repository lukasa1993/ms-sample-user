import { query } from '../datastore/index.js';

export async function byUUID(uuid) {
  const { rows: [user] } = await query(`
      select "uuid",
             "company_uuid",
             "name",
             "email",
             "meta",
             "created",
             "updated"
      from "Users"
      where "uuid" = $1
  `, uuid);

  return user;

}
