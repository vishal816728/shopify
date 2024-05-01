import puppeteer from "puppeteer";


// gameinformer scrapper function
// async function scrappper() {
//     console.log("hi")
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage()
//     await page.goto("https://www.gameinformer.com/")
//     const allArticles = await page.evaluate(async () => {
//         const article = await document.querySelectorAll('article')
//         return Array.from(article).map((item) => {
//             const url = item.querySelector('a')?.href;
//             const image = item.querySelector('source')?.srcset;
//             const title = item.querySelector('span')?.innerText;
//             const heading = item.querySelector('a .field')?.innerText
//             return { url, title, image, heading }
//         })

//     })
//     console.log(allArticles)
//     await browser.close()
// }