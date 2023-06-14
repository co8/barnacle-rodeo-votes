import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = await db.connect();

  const table = "statistics";

  const data = {
    kuji_usd: "0.884",
    kuji_total_supply: "116.97M",
    kuji_staked: "65.1M",
    kuji_liquid_supply: "35.55M",
    kuji_inflation: "0.00%",
    usk_usd: "1.070",
    usk_total_supply: "1.71M",
    block_height: "11,610,885",
    block_rate_seconds: "3.22",
    val_delegated_kuji: "859.02k",
    val_voting_power: "1.37%",
    val_commission: "5.00%",
    chain_unbonding_time: "14 days",
    chain_gini_coefficient: "0.30557",
    chain_nakamoto_index: "11",
  };

  try {
    //create table Statistics if not exists
    //await client.sql`CREATE TABLE IF NOT EXISTS ${table} (created timestamp, kuji_usd varchar(255), kuji_total_supply varchar(255), kuji_staked varchar(255), kuji_liquid_supply varchar(255), kuji_inflation varchar(255), usk_usd varchar(255), usk_total_supply varchar(255), block_height varchar(255), block_rate_seconds varchar(255), val_delegated_kuji varchar(255), val_voting_power varchar(255), val_commission varchar(255), chain_unbonding_time varchar(255), chain_gini_coefficient varchar(255), chain_nakamoto_index varchar(255));`;

    //init populate table
    const keys = Object.keys(data);
    const key_list = keys.join(", ");
    const values = Object.values(data);
    const val_list = values.join("', '");
    await client.sql`INSERT INTO ${table}(created, ${key_list}) VALUES (NOW(), '${val_list}');`;
    //const insertSql = `INSERT INTO ${table}(created, ${key_list}) VALUES (NOW(), '${val_list}');`;
    //console.log(insertSql);
    //await client.sql`${insertSql}`;
  } catch (error) {
    return response.status(500).json({ error });
  }

  //read from TABLE
  const { rows } =
    await client.sql`SELECT * FROM ${table} ORDER BY created DESC LIMIT 1;`;
  return response.status(200).json({ rows });
}
