const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [25,26,27,28,29,30,31,32,33,34];
  let grandTotal = 0;

  for (const s of seeds) {
    const url = `https://sanand0.github.io/tdsdata/table_seed_${s}.html`;
    await page.goto(url);

    const nums = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    grandTotal += nums.reduce((a,b) => a+b, 0);
  }

  console.log("TOTAL_SUM=" + grandTotal);

  await browser.close();
})();
