import {createRequire} from 'node:module';
const require=createRequire(new URL('../frontend/package.json',import.meta.url));const {chromium}=require('@playwright/test');
const browser=await chromium.launch({channel:'msedge'});const page=await browser.newPage({reducedMotion:'reduce'});
page.on('console',m=>{if(['error','warning'].includes(m.type()))console.log(m.type()+': '+m.text())});
await page.goto(process.env.PLAYWRIGHT_BASE_URL??'http://127.0.0.1:3001',{waitUntil:'networkidle',timeout:120000});
await page.waitForTimeout(2500);
console.log(await page.evaluate(()=>({classes:document.documentElement.className,font:getComputedStyle(document.documentElement).getPropertyValue('--font-code'),bodyFont:getComputedStyle(document.body).fontFamily})));
console.log(await page.locator('.role-line').evaluate(e=>({html:e.outerHTML,styles:Array.from(e.children).map(c=>({text:c.textContent,opacity:getComputedStyle(c).opacity,color:getComputedStyle(c).color,font:getComputedStyle(c).fontFamily}))})));
await browser.close();
