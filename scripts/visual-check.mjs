import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire(new URL('../frontend/package.json',import.meta.url));
const {chromium}=require('@playwright/test');await fs.mkdir('output/preview',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const url=process.env.PLAYWRIGHT_BASE_URL??'http://127.0.0.1:3001';
await page.goto(url,{waitUntil:'networkidle',timeout:120000});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(600);await page.screenshot({path:'output/preview/desktop.png'});
for(const id of ['about','skills','projects','experience','education','contact']){await page.locator(`#${id}`).scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.screenshot({path:`output/preview/${id}.png`});}
await page.setViewportSize({width:375,height:812});await page.goto(url);await page.screenshot({path:'output/preview/mobile.png'});
console.log(JSON.stringify({pageErrors:errors}));await browser.close();
