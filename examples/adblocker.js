const puppeteer = require('puppeteer');

const BLOCK_DOMAINS_WITH = [
  /.*doubleclick.*/,
  /.*www-tampering.*/,
  /.*pagead.*/,
  /.*csi_*/,
  /.*stats.*/,
  /.*log_event.*/
];

const adblocker = (page) => {
  page.setRequestInterception(true);
  page.on('request', req => {
    const url = req.url();
    const type = req.resourceType();

    if (type === 'image' || BLOCK_DOMAINS_WITH.some(regexp => regexp.test(url))) {
      req.abort();
    } else {
      req.continue();
    }
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  // Instalamos el adblocker
  adblocker(page);

  await page.goto('https://youtube.com');

  const videoTitle = '#video-title';
  await page.waitForSelector(videoTitle);
  // Youtube no utiliza ids unicos...
  // Muy importante en este codigo el llamar a [0] una vez
  // que la llamada asincrona se ha completado.
  const title = (await page.$$(videoTitle))[0];

  console.log(await page.evaluate(el => el.textContent, title));

  await browser.close();
})();
