import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
//import { collector } from "/libs/collector";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = await db.connect();

  const data_obj = collector();
  /** {
  kuji_usd: '0.886',
  kuji_total_supply: '116.97M',
  kuji_staked: '65.1M',
  kuji_liquid_supply: '35.55M',
  kuji_inflation: '0.00%',
  usk_usd: '1.065',
  usk_total_supply: '1.71M',
  block_height: '11,607,675',
  block_rate_seconds: '3.23',
  val_delegated_kuji: '859.02k',
  val_voting_power: '1.37%',
  val_commission: '5.00%',
  chain_unbonding_time: '14 days',
  chain_gini_coefficient: '0.305576',
  chain_nakamoto_index: '11'
} */

  try {
    //await client.sql`INSERT INTO statistics VALUES (now(), ${data["kuji_usd"]}, ${data["kuji_total_supply"]}, ${data["kuji_staked"]}, ${data["kuji_liquid_supply"]}, ${data["kuji_inflation"]}, ${data["usk_usd"]}, ${data["usk_total_supply"]}, ${data["block_height"]}, ${data["block_rate_seconds"]}, ${data["val_delegated_kuji"]}, ${data["val_voting_power"]}, ${data["val_commission"]}, ${data["chain_unbonding_time"]}, ${data["chain_gini_coefficient"]}, ${data["chain_nakamoto_index"]});`;

    const table = "statistics";
    const keys = Object.keys(data_obj);
    const values = Object.values(data_obj);
    const insertStatement = `INSERT INTO {${table}} (${keys.join(
      ", "
    )}) VALUES ('${values.join("', '")}')`;
    await client.sql`${insertStatement}`;
  } catch (error) {
    return response.status(500).json({ error });
  }

  //read from TABLE
  const { rows } =
    await client.sql`SELECT * FROM statistics ORDER BY created DESC LIMIT 1;`;
  return response.status(200).json({ rows });
}
