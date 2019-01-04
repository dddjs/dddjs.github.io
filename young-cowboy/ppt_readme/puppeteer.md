title: puppeteer.js
speaker: 小牛仔
highlightStyle: monokai_sublime

[slide]
# puppeteer.js

[slide]
# headless browser
![](/puppeteer_01.png)

[slide]
# Chromium drivers
![](/puppeteer_02.png)

[slide]
# puppeteer vs phantomjs
![](/puppeteer_03.png)

[slide]
# puppeteer vs phantomjs
![](/puppeteer_04.png)

[slide]
Puppeteer 是一个node库，他提供了一组用来操纵Chrome的API，Puppeteer是Chrome官方团队进行维护的

[slide]
![](/puppeteer_05.png)

[slide]
# launch
```javascript
const puppeteer = require('puppeteer');
const utils = require('../utils');

(async () => {
  const browser = await puppeteer.launch({
    dumpio: true,
    ignoreHTTPSErrors: true,
    headless: false,
    args: ['--window-size=1920,1080'],
    timeout: 10 * 1000,
    devtools: false
  });

  const page = await browser.newPage();
  
  await page.setViewport({width:1920, height:1080});
  await page.goto('http://www.taobao.com');
  await utils.wait(5000);
  await page.close();
  await utils.wait(1000);
  await browser.close();
})().catch(err => console.log(err));
```

[slide]
# utils
```javascript
exports.wait = function (time = 10 * 1000) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
```

[slide]
# dom
```javascript
const page = await browser.newPage();

await page.setViewport({width:1920, height:1080});
await page.goto('http://www.taobao.com', {
  waitUntil: 'networkidle0'
});

const position = await page.$eval('.J_MemberLogout .ml1', btn => {
  return {
    x: btn.getBoundingClientRect().x,
    y: btn.getBoundingClientRect().y
  }
});

await page.mouse.click(position.x + 10, position.y + 10);
await utils.wait(5000);
await page.close();
await browser.close();
```

[slide]
# evaluate
```javascript
const page = await browser.newPage();

await page.setViewport({width:1920, height:1080});
await page.goto('http://www.taobao.com', {
  waitUntil: 'networkidle0'
});

const keys = await page.evaluate(() => {
  return Object.keys(localStorage);
});

console.log(keys);
await utils.wait(5000);
await page.close();
await browser.close();
```

[slide]
# login
```javascript
const page = await browser.newPage();

await page.setViewport({width:1920, height:1080});
await page.goto('https://login.taobao.com/member/login.jhtml', {
  waitUntil: 'networkidle0'
});

await page.$eval('#J_Quick2Static', btn => {
  btn.click();
});
await page.$eval('#TPL_username_1', input => {
  input.value = '影逸';
});
await page.$eval('#TPL_password_1', input => {
  input.value = 'xxxxxxx';
})
await page.$eval('#J_SubmitStatic', button => {
  button.click();
});
await utils.wait(5000);
await page.close();
await browser.close();
```

[slide]
# screenshot
```javascript
const page = await browser.newPage();

await page.setViewport({width:1920, height:1080});
await page.goto('https://www.taobao.com', {
  waitUntil: 'networkidle0'
});

let scrollStep = 500;
let scrollEnable = true;

while (scrollEnable) {
  scrollEnable = await page.evaluate((scrollStep) => {
    let scrollTop = document.scrollingElement.scrollTop;
    
    document.scrollingElement.scrollTop = scrollTop + scrollStep;

    return document.body.clientHeight > (scrollTop + 1080);
  }, scrollStep)

  await utils.wait(1000);
}

await page.screenshot({path: './taobao.png', fullPage: true});
await page.close();
await browser.close();
```

[slide]
# 参考
* https://hackernoon.com/benchmark-headless-chrome-vs-phantomjs-e7f44c6956c
* https://github.com/dhamaniasad/HeadlessBrowsers
* http://www.r9it.com/20171106/puppeteer.html
* https://peter.sh/experiments/chromium-command-line-switches/#window-size