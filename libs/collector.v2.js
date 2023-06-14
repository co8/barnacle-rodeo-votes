const puppeteer = require("puppeteer");

const target_kujira_data = "https://blue.kujira.app";
const target_validator_data = "https://blue.kujira.app/stake";
const target_chain_data = "https://kujira.smartstake.io/stats";
const validator_address =
  "kujiravaloper1tn29ajxxcgpx24ndjs5rtccy4wnuj9kqzap9gt";

(async () => {
  //initiate the browser
  const browser = await puppeteer.launch({
    userDataDir: "./data",
  });

  //create a new in headless chrome
  const page = await browser.newPage();

  //set timeout to 0 to prevent the page from loading forever
  page.setDefaultNavigationTimeout(0);

  /**
   * kujira data
   */

  //go to target website - kujira data
  await page.goto(target_kujira_data, {
    //wait for content to load
    waitUntil: "networkidle0",
  });
  //get elements
  const data = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("div.token span, div.summary h4, div.title h4")
    ).map((span) => span.textContent)
  );

  //remove comma from string. Divide by 1,000 for block per min
  const block_rate_int = parseFloat(data[6].replaceAll(",", ""));
  const block_rate = block_rate_int / 1000;
  const block_rate_seconds = block_rate.toFixed(2);

  //array of kuji data
  var obj_kuji = {
    kuji_usd: data[0] + data[1],
    kuji_total_supply: data[12],
    kuji_staked: data[3],
    kuji_liquid_supply: data[2],
    kuji_inflation: data[10] + data[11] + "%",
    usk_usd: data[8] + data[9],
    usk_total_supply: data[13],
    block_height: data[4],
    block_rate_seconds: block_rate_seconds,
  };
  console.log("kujira data collected");
  //console.log(obj_kuji);
  //process.exit();

  /**
   * validator data
   */

  //go to target website - validator data
  await page.goto(target_validator_data, {
    //wait for content to load
    waitUntil: "networkidle0",
  });
  //get span within div.token elements
  const data_validator = await page.evaluate(
    (validator_address) =>
      Array.from(
        document.querySelectorAll(
          `a.validator-row[href*="${validator_address}"] td`
        )
      ).map((td) => td.textContent),
    validator_address
  );

  //array of validator data
  var obj_validator = {
    val_delegated_kuji: data_validator[1],
    val_voting_power: data_validator[2],
    val_commission: data_validator[3],
  };
  console.log("validator data collected");

  /**
   * chain data
   */

  //go to target website - chain data
  await page.goto(target_chain_data, {
    //wait for content to load
    waitUntil: "networkidle0",
  });

  //get elements
  const data_chain = await page.evaluate(() =>
    Array.from(document.querySelectorAll("p.statValue")).map(
      (p) => p.textContent
    )
  );
  console.log("chain data collected");

  //array of chain data
  var obj_chain = {
    chain_unbonding_time: data_chain[3],
    chain_gini_coefficient: data_chain[6],
    chain_nakamoto_index: data_chain[11],
  };

  //merge objects for output
  const obj_output = Object.assign({}, obj_kuji, obj_validator, obj_chain);

  //console.log(typeof obj_output);
  console.log(obj_output);

  //send values to edge

  //close headless chrome
  await browser.close();
})(); //async ()

/**
{
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
}
 */
