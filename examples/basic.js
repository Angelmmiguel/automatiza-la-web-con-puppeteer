const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const title = await page.$('h1');

  console.log(await page.evaluate(el => el.textContent, title));

  await browser.close();
})();