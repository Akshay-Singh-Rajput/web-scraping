const express = require("express");
const app = express();
const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
// import {scrappers} from './scrapper.js';
// const {scraper} = require("./scraper");
// console.log(scraper)
// const scrapeChannel = require("./scrapeChannel");


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.listen(port, () =>
    console.log(`JobScrape listening at http://localhost:${port}`)
);

app.post("/job", async (req, res) => {
    // console.log("job endpoint", req.body);
    const jobData = await scrapeChannel(req.body.customURL, req.body.technology);
    res.send(jobData);
});





// --------------------------------------------------------------------------------------------

const puppeteer = require("puppeteer");

async function scrapeChannel(url, technology) {

    // console.log("technology", technology);

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    // await page.waitForTimeout(1000);


    let titles = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".BjJfJf"),
            (element) => element.textContent
        )
    );

    let company = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".vNEEBe"),
            (element) => element.textContent
        )
    );

    let location = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".Qk80Jf"),
            (element) => element.textContent
        )
    );

    let via = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".Qk80Jf"),
            (element) => element.textContent
        )
    );
    const hrefs = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".EDblX"),
            (element) =>
                element.firstElementChild.firstElementChild.firstElementChild.href
        )
    );

    browser.close();

    // filtering the output 
    technology = technology.trim();
    technology = technology.split(" ");

    //cleaning strings to match for lower case

    technology = technology.map(it => it.toLowerCase());
    titles = titles.map(it => it.toLocaleLowerCase());

    const checker = (title) => {
        let doesTitleContain = technology.some((tech) => {
            let truthy = title.includes(tech);
            return truthy;
        });
        if (doesTitleContain) return true;
    };
    // console.log({titles,company,location})
    titles = titles.filter((title) => checker(title));


    // const job = {
    //     index: "",
    //     title: "",
    //     company: "",
    //     location: "",
    //     hrefs: "",
    // };

    let jobData = [];

    for (let i = 0; i < titles.length; i++) {
        let x = {
            index: "",
            title: "",
            company: "",
            location: "",
            hrefs: "",
        };

        x.index = i+1;
        x.title = titles[ i ];
        x.company = company[ i ];
        x.location = location[ i ];
        x.hrefs = hrefs[ i ];
        
        jobData.push( x); 
    }
    // console.log("jobData", jobData);
    return jobData;

    // return { titles, company, location, hrefs }; // arrays of strings
}

// module.exports = {
//     scrapeChannel,
// };
// module.exports = scrapeChannel;



