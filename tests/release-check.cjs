const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/galal/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const local=name=>process.env.RAQA_TEST_BASE_URL ? new URL(name+'.php',process.env.RAQA_TEST_BASE_URL).href : pathToFileURL(path.resolve('tests/results/rendered',name+'.html')).href;
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
 const page=await browser.newPage(); const errors=[]; let checks=0;
 page.on('pageerror',error=>errors.push(error.message));
 for(const width of [320,360,375,390,430,600,760,761,768,800,850,900,1024,1280,1440,1920]) {
  await page.setViewportSize({width,height:900});
  for(const route of ['index','products','gallery','about','contact']) {
   await page.goto(local(route)); await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth>innerWidth || document.body.scrollWidth>innerWidth,
    outside:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width && (r.left < -1 || r.right>innerWidth+1)}).map(el=>el.className),
    whatsapp:[...document.querySelectorAll('a[href^="https://wa.me/"]')].map(a=>a.href),
    social:document.querySelectorAll('.social-icon').length,
    fabricatedSocial:document.querySelectorAll('.social-unavailable[href]').length,
    rtl:document.documentElement.dir==='rtl'
   }));
   if(state.overflow||state.outside.length||state.social!==5||state.fabricatedSocial||!state.rtl||!state.whatsapp.length||state.whatsapp.some(url=>new URL(url).pathname!=='/966507413106'))throw Error(JSON.stringify({route,width,...state}));
   const horizontalScroll=await page.evaluate(()=>{window.scrollTo(-10000,0);return window.scrollX;});
   if(horizontalScroll!==0)throw Error(`Horizontal scrolling remains at ${width}px on ${route}`);
   checks++;
  }
 }
 await page.setViewportSize({width:390,height:844}); await page.goto(local('index'));
 await page.locator('.menu-toggle').click(); if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='true')throw Error('menu open');
 await page.keyboard.press('Escape'); if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='false')throw Error('menu close');
 await page.goto(local('gallery')); await page.locator('[data-filter="product"]').click();
 if(await page.locator('.gallery-item:visible').count()!==3)throw Error('gallery filter');
 await page.locator('.gallery-item:visible').first().click();
 if(await page.locator('dialog').evaluate(el=>el.getBoundingClientRect().width>innerWidth))throw Error('modal overflow');
 await page.keyboard.press('ArrowLeft'); if(await page.locator('.lightbox-count').textContent()!=='2 / 3')throw Error('gallery navigation');
 await page.keyboard.press('Escape'); if(!await page.locator('.gallery-item:visible').first().evaluate(el=>el===document.activeElement))throw Error('focus restoration');
 await page.goto(local('contact')); if(await page.locator('button[type=submit]').isDisabled())throw Error('official booking disabled');
 await page.locator('[name=event]').selectOption({label:'زواج'});await page.locator('[name=date]').fill('2030-12-20');await page.locator('[name=city]').fill('   ');await page.locator('button[type=submit]').click();
 if(await page.locator('[name=city]').evaluate(el=>el.validity.valid))throw Error('city validation');
 await page.locator('[name=city]').fill('تبوك');await page.locator('[name=guests]').fill('120');await page.locator('[name=notes]').fill('قهوة & ضيافة');
 let outbound='';await page.route('https://wa.me/**',route=>{outbound=route.request().url();route.abort();});await page.locator('button[type=submit]').click();await page.waitForTimeout(400);
 if(!outbound||new URL(outbound).pathname!=='/966507413106'||!new URL(outbound).searchParams.get('text').includes('قهوة & ضيافة'))throw Error('official message URL');
 await page.goto(local('index'));await page.emulateMedia({reducedMotion:'reduce'});if(await page.locator('.hero-video').getAttribute('src'))throw Error('reduced motion');
 await page.locator('footer').scrollIntoViewIfNeeded();
 const social=page.locator('button.social-unavailable').first();
 const originalURL=page.url(); const pagesBefore=browser.contexts()[0].pages().length;
 if(await social.evaluate(el=>getComputedStyle(el).cursor)!=='pointer')throw Error('social pointer');
 const initialBackground=await social.evaluate(el=>getComputedStyle(el).backgroundColor);
 await social.hover();
 if(await social.evaluate(el=>getComputedStyle(el).backgroundColor)===initialBackground)throw Error('social hover feedback');
 await social.click();await social.press('Enter');
 if(page.url()!==originalURL||browser.contexts()[0].pages().length!==pagesBefore)throw Error('placeholder social navigates');
 await page.screenshot({path:'tests/results/footer-mobile.png'});
 if(errors.length)throw Error(errors.join('\n'));
 fs.writeFileSync('tests/results/release.json',JSON.stringify({checks,widths:[320,360,375,390,430,600,760,761,768,800,850,900,1024,1280,1440,1920],errors,whatsapp:'966507413106',socialIcons:5},null,2));
 console.log(`PASS: ${checks} page/viewport checks; official WhatsApp links/form, five social icons, menu, gallery, reduced motion.`);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
