import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { engine } from 'express-handlebars';
import usersRoutes from "./Routes/Registration/user.routes.js";
import ForgotPassword from "./Routes/ForgetPassword/forgotpassword.routes.js";
import puppeteer from "puppeteer";
import rewardsRoutes from "./Routes/Rewards/Rewards.routes.js";

const app = express();

// global middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(helmet());
app.use(morgan("tiny"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Routes 

app.use("/api/v1/user", usersRoutes)
app.use("/api/v1/otp", ForgotPassword)
app.use("/api/v1/reward", rewardsRoutes)
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

// startgg scrapper function
async function scrappper() {
    console.log("hi")
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    await page.goto("https://www.start.gg/discover")
    const allArticles = await page.evaluate(async () => {
        const article = await document.querySelectorAll('a')
        // console.log("article : ", article)
        return Array.from(article).map((item) => {
            const url = item.querySelector('a')?.innerText;
            // const image = item.querySelector('source')?.srcset;
            // const title = item.querySelector('span')?.innerText;
            // const heading = item.querySelector('a .field')?.innerText
            return { url }
        })

    })
    console.log(allArticles)
    await browser.close()
}

app.use("/scrap", async (req, res) => {
    const data = await scrappper()
    console.log(data)
    res.send(data)
})



export default app;