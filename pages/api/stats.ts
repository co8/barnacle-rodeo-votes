import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = await db.connect();

  const data = {
    kuji_usd: "0.854",
    usk_usd: "1.049",
    kuji_liquid_supply: "35.20M",
    kuji_total_supply: "1.86M",
    block_height: "11,463,173",
    block_time: "3.13",
    inflation: "0.00%",
    delegated_kuji: "830.01k",
    voting_power: "1.31%",
    commission: "5.00%",
  };

  try {
    //await client.sql`DROP TABLE IF EXISTS Stats CASCADE;`;

    await client.sql`CREATE TABLE IF NOT EXISTS Stats (created timestamp, kuji_usd varchar(255), usk_usd varchar(255), kuji_liquid_supply varchar(255), kuji_total_supply varchar(255), block_height varchar(255), block_time varchar(255), inflation varchar(255), delegated_kuji varchar(255), voting_power varchar(255), commission varchar(255) );`;

    //await client.sql`ALTER TABLE Stats ADD COLUMN timestamp;`; // NOT NULL DEFAULT now()

    await client.sql`INSERT INTO Stats (created, kuji_usd, usk_usd, kuji_liquid_supply, kuji_total_supply, block_height, block_time, inflation, delegated_kuji, voting_power, commission) VALUES (now(), ${data["kuji_usd"]}, ${data["usk_usd"]}, ${data["kuji_liquid_supply"]}, ${data["kuji_total_supply"]}, ${data["block_height"]}, ${data["block_time"]}, ${data["inflation"]}, ${data["delegated_kuji"]}, ${data["voting_power"]}, ${data["commission"]});`;
  } catch (error) {
    return response.status(500).json({ error });
  }

  const stats = await client.sql`SELECT * FROM Stats ORDER BY created DESC;`;
  return response.status(200).json({ stats });
}
