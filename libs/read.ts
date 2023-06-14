import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = await db.connect();

  const { rows } =
    await client.sql`SELECT * FROM statistics ORDER BY created DESC LIMIT 1;`;
  return response.status(200).json({ rows });
}
