const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/');

  const input = '.js-search-field';
  const button = '.js-search-submit';
  await page.waitForSelector(input);
  await page.type(input, "puppeteer");
  await page.click(button);

  const result = '.js-search-results .search-result:first-child h3 a';
  await page.waitForSelector(result);
  const first = await page.$(result);

  console.log(await page.evaluate(el => el.textContent, first));

  await browser.close();
})();
