const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'@playwright/test');
const path=require('path');
const out=path.join(__dirname,'../.impeccable/review');
(async()=>{
  const browser=await chromium.launch();
  const results=[];
  for(const width of [1440,2540,390,320]){
    const page=await browser.newPage({viewport:{width,height:1000}});
    page.setDefaultTimeout(12000);
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(process.env.PORTFOLIO_URL||'http://127.0.0.1:4317/',{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
    await page.waitForFunction(()=>[...document.images].every(image=>image.complete));
    const active=()=>page.locator('.experience-panel[data-active=true]');
    const settle=()=>page.waitForTimeout(1000);
    const select=async brand=>{
      const index=await page.locator(`.experience-panel[data-brand=${brand}]`).getAttribute('data-index');
      const button=page.locator(`.index-item[data-role="${index}"]`);
      if(await button.isVisible())await button.click();else await page.locator('#experience-picker').selectOption(index);
      await page.waitForFunction(brand=>document.querySelector('.experience-panel[data-active=true]').dataset.brand===brand,brand);
      await settle();
    };
    const shot=async name=>{if(width!==320)await page.screenshot({path:path.join(out,`${name}-${width}.png`)});};
    if(await page.locator('.experience-panel').count()!==6)throw Error('Expected six experience/project cards');
    if(await active().getAttribute('data-brand')!=='google')throw Error('Google must open first');
    if(await page.locator('#reading,#clarity-showcase').count())throw Error('Sidebar or belowfold content remains');
    await settle();
    if(await page.locator('.profile-links a').count()!==3)throw Error('Missing profile links');
    if(/Clarity|personal project/i.test(await page.locator('.portfolio-intro').innerText()))throw Error('Project leaked into profile');
    await shot('gallery-current');
    await select('google');await shot('gallery-google');
    const dates=await page.locator('.panel-meta span:last-child').allTextContents();
    for(const date of dates.filter(Boolean))if(!/^[A-Z][a-z]{2} \d{4} – (Present|[A-Z][a-z]{2} \d{4})$/.test(date))throw Error('Nonstandard date '+date);
    await active().locator('.panel-description').click();
    await page.waitForFunction(()=>document.querySelector('.experience-panel[data-active=true]').dataset.flipped==='true');
    await settle();await shot('gallery-back');
    const googleBack=await active().locator('.back-overview').innerText();
    if(/Coursera|Amazon/.test(googleBack))throw Error('Google back mentions other employers');
    await active().locator('.back-role').click();
    await page.waitForFunction(()=>document.querySelector('.experience-panel[data-active=true]').dataset.flipped==='false');
    await settle();
    if(width>900){
      const point=await page.evaluate(()=>{
        const view=document.querySelector('#gallery-viewport').getBoundingClientRect();
        const current=document.querySelector('.experience-panel[data-brand=google]').getBoundingClientRect();
        const next=document.querySelector('.experience-panel[data-brand=coursera]').getBoundingClientRect();
        const left=Math.max(current.right+5,next.left,view.left),right=Math.min(view.right-5,next.right);
        return right>left?{x:(left+right)/2,y:next.top+next.height*.45}:null;
      });
      if(!point)throw Error('Coursera preview has no exposed click area');
      const logo=page.locator('.experience-panel[data-brand=coursera] .preview-brand img');
      if(!await logo.isVisible())throw Error('Neighbor logo is hidden');
      const visibleLogo=await logo.boundingBox();
      if(visibleLogo.x<point.x-150||visibleLogo.x+visibleLogo.width>width)throw Error('Preview logo is outside exposed region '+JSON.stringify(visibleLogo));
      await page.mouse.click(point.x,point.y);
      await page.waitForFunction(()=>document.querySelector('.experience-panel[data-active=true]').dataset.brand==='coursera');
      await settle();
    }else await select('coursera');
    await shot('gallery-coursera');
    for(const brand of ['google','coursera','amazon','internships','ucsd','clarity']){
      await select(brand);await active().locator('.panel-flip').click();await settle();
      const fit=await active().locator('.back-overview').evaluate(element=>({scroll:element.scrollHeight,height:element.clientHeight}));
      if(fit.scroll>fit.height+2)throw Error('Back requires scrolling '+JSON.stringify({width,brand,...fit}));
      if(brand==='internships'){
        if(!(await active().locator('.back-overview').innerText()).includes('Cardea Bio'))throw Error('Missing internship');
        await shot('gallery-internships');
      }
      if(brand==='ucsd'){
        if(!(await active().locator('.back-role').innerText()).includes('Education'))throw Error('Education card missing');
        await shot('gallery-education');
      }
      await page.keyboard.press('Escape');await settle();
    }
    await select('clarity');
    await active().locator('[data-preview=cashflow]').click();
    if(!(await active().locator('.project-preview img').getAttribute('src')).includes('cash-flow'))throw Error('Clarity feature switch failed');
    if(await active().getAttribute('data-flipped')!=='false')throw Error('Preview button flipped card');
    await active().locator('[data-preview=networth]').click();await shot('gallery-project');
    await page.locator('[data-story=about]').click();await settle();
    if(await active().getAttribute('data-brand')!=='google')throw Error('About opens on wrong card');
    await shot('gallery-about');
    const aboutFit=await active().locator('.back-overview').evaluate(e=>e.scrollHeight<=e.clientHeight+2);
    if(!aboutFit)throw Error('About requires scrolling');
    await page.locator('[data-story=contact]').click();await settle();
    await active().locator('a[href="mailto:le.tyler.h@gmail.com"]').waitFor();
    await page.keyboard.press('Escape');await select('google');
    await page.locator('#gallery-viewport').focus();await page.keyboard.press('ArrowRight');
    if(await active().getAttribute('data-brand')!=='coursera')throw Error('Keyboard browsing failed');
    await select('google');
    if(width>900){
      const box=await page.locator('#gallery-viewport').boundingBox();
      await page.mouse.move(box.x+box.width*.8,box.y+box.height*.3);await page.waitForTimeout(100);
      if(!(await page.locator('#gallery-camera').getAttribute('style'))?.includes('rotate'))throw Error('Camera not reactive');
      await page.mouse.move(box.x+box.width*.5,box.y+box.height*.4);await page.mouse.down();
      await page.mouse.move(box.x+box.width*.5-100,box.y+box.height*.4,{steps:10});await page.mouse.up();
      await page.waitForFunction(()=>document.querySelector('.experience-panel[data-active=true]').dataset.brand==='coursera');
    }
    const layout=await page.evaluate(()=>({footerHeight:document.querySelector('footer').getBoundingClientRect().height,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
    if(layout.footerHeight>80||layout.overflow||layout.broken.length||errors.length)throw Error(JSON.stringify({width,...layout,errors}));
    results.push({width,bodyFlip:true,neighborClick:width>900,allBacksFit:true,projectPreview:true,errors});
    console.log('Gallery passed',width);await page.close();
  }
  await browser.close();console.log(JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exit(1)});
