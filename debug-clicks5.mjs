import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:5183/when-to-go", { waitUntil: "networkidle0" });
await page.evaluate(() => document.querySelector("#best-time").scrollIntoView());
await new Promise(r => setTimeout(r, 500));

const info = await page.evaluate(() => {
  const th = document.querySelectorAll("#best-time thead th")[2];
  const rect = th.getBoundingClientRect();
  return { tag: th.tagName, text: th.textContent, rect: {x: rect.x, y: rect.y, w: rect.width, h: rect.height}, hasListeners: !!th.onmouseenter };
});
console.log(info);

// dispatch a real mouseover event directly on it via CDP-level mouse move using elementFromPoint check
const elAtPoint = await page.evaluate((rect) => {
  const x = rect.x + rect.w/2, y = rect.y + rect.h/2;
  const el = document.elementFromPoint(x, y);
  return { tag: el.tagName, cls: el.className };
}, info.rect);
console.log("element at hover point:", elAtPoint);
await browser.close();
