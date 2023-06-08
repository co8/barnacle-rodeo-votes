const puppeteer = require("puppeteer");

const target_kujira_data = "https://blue.kujira.app";
const target_validator_data = "https://blue.kujira.app/stake";
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
  await page.setDefaultNavigationTimeout(0);

  //go to target website - kujira data
  await page.goto(target_kujira_data, {
    //wait for content to load
    waitUntil: "networkidle0",
  });
  //get span within div.token elements
  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.token span, div.summary h4")).map(
      (span) => span.textContent
    )
  );

  //convert string 3,352 to float 3352
  //remove comma first. Divide by 6,000 for block per min
  const block_time_int = parseFloat(data[6].replaceAll(",", ""));
  const block_time = block_time_int / 1000; //.toFixed(2);

  //array of kuji data
  var obj_kuji = {
    kuji_usd: data[0] + data[1],
    usk_usd: data[8] + data[9],
    kuji_liquid_supply: data[2],
    kuji_total_supply: data[12],
    block_height: data[4],
    block_time: block_time.toFixed(2),
    inflation: data[10] + data[11] + "%",
  };

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
    delegated_kuji: data_validator[1],
    voting_power: data_validator[2],
    commission: data_validator[3],
  };

  //merge objects for output
  const obj_output = Object.assign({}, obj_kuji, obj_validator);

  console.log(obj_output);

  //save array to database

  //send values to edge

  //close headless chrome
  await browser.close();
})(); //async ()

/**
{
  kuji_usd: '0.847',
  usk_usd: '1.048',
  kuji_liquid_supply: '35.20M',
  kuji_total_supply: '1.86M',
  block_height: '11,460,664',
  block_time: '3.11',
  inflation: '0.00%',
  delegated_kuji: '830.01k',
  voting_power: '1.31%',
  commission: '5.00%'
}
 */
