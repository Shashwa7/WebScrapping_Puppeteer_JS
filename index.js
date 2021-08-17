const puppeteer = require('puppeteer');

const ytHomePageTitleFetch = async () => {
    try{
    //const browser = await puppeteer.launch({ headless: false }); > incase you want to see the browser UI
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const URL = 'https://www.youtube.com'

    await page.goto(URL, {waitUntil: 'networkidle2'});

    const allTitles =  await page.evaluate(() => {
    let res = document.querySelectorAll('#video-title')
    let titles = []
    res.forEach(title => titles.push(title.innerHTML))
    return titles
    });

    console.log('--> YT Response:',allTitles)

    await browser.close()
 }catch(err){
    console.log(`Puppeteer Error Detected -> ${err}`)

 }
};

ytHomePageTitleFetch()

//sony headphones
async function sonyHeadphoneFetch(){
    try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const URL = 'https://www.amazon.in/s?k=sony+headphones'

    await page.goto(URL, {waitUntil: 'networkidle2'});

    const allSonyHeadphones =  await page.evaluate(() => {
    let res = document.querySelectorAll('.s-result-item')
    let headphoneList = []

    res.forEach(hdpn => {
        if(hdpn.querySelector('.a-size-medium') && hdpn.querySelector('.a-price-whole') && hdpn.querySelector('.a-link-normal'))
        headphoneList.push({product_name: hdpn.querySelector('.a-size-medium').innerText, product_price: hdpn.querySelector('.a-price-whole').innerText})
    })

    return headphoneList
    }
    );

    console.log('\n--> Amazon Response:',allSonyHeadphones)

    await browser.close()
    }
    catch(err){
        console.log(`Puppeteer Error Detected -> ${err}`)
    
     }
}

sonyHeadphoneFetch()


//zomato restricts web scrapping for some reason
async function zomatoMenuFetch(){
    try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const URL = 'https://www.zomato.com/mumbai'

    await page.goto(URL, {waitUntil: 'networkidle2'});

    const res = await page.evaluate(() => document.body.innerHTML);

    console.log('\n--> Zomato Response:',res)

    await browser.close()
    }catch(err){
        console.log(`Puppeteer Error Detected -> ${err}`)
     }
}

zomatoMenuFetch()


//swiggy fetch
async function swiggyMenuFetch(city){
 try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const URL = `https://www.swiggy.com/${city}`

    await page.goto(URL, {waitUntil: 'networkidle2'});

    const allMumbaiRestros =  await page.evaluate(() => {

    let res = document.querySelectorAll('._3XX_A')
    let restroList = []

    res.forEach(restro => {
        if(restro.querySelector('.nA6kb') && restro.querySelector('.nVWSi'))
            restroList.push({product_name: restro.querySelector('.nA6kb').innerHTML, estimate: restro.querySelector('.nVWSi').innerText, link:`https://www.swiggy.com/${restro.querySelector('._1j_Yo').getAttribute('href')}`} )
    })
    
    return restroList
    }
    );
    console.log('\n--> Swiggy Response:',allMumbaiRestros)

    await browser.close()
  }
  catch(err){
    console.log(`Puppeteer Error Detected -> ${err}`)
 }
}


swiggyMenuFetch('mumbai') //restros in mumbai
swiggyMenuFetch('chennai') //restros in chennai
