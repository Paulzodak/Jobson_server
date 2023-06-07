import puppeteer from "puppeteer";
import dotenv from "dotenv";
import axios from "axios";
import { APIURL } from "../utils/utils.js";
export const getJobDetails = async (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  // );
  async function run() {
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV == "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // console.log(req);
    if (req.body.url) {
      await page.goto(req.body.url);
      //   const html = await page.content();
      // const title = await page.evaluate(() => document.title);
      // const text = await page.evaluate(() => document.body.innerText);
      // const header = await page.evaluate(
      //   () => document.body.querySelector("article ").innerHTML
      // );
      const image = await page.evaluate(() =>
        document.body.querySelector(".hidden  .ml-auto")
      );
      // const applyLink = await page.evaluate(
      //   () =>
      //     document.body.querySelector(
      //       ".JobApplyButtonSideBarModule_jobApplyContainer__Hlere"
      //     ).innerHTML
      // );

      await browser.close();
      return {
        // header: header && header,
        image: image && image,
        // link: applyLink && applyLink,
      };
    } else {
      return { error: "error" };
    }
  }
  const result = await run();
  res.status(201).json(result);
  //   try {
  //     // res.status(201).json(run());
  //     res.status(201).json(run());
  //   } catch (error) {
  //     res.status(409).json({
  //       error: error.message,
  //     });
  //   }
};
const results = [];
export const getJobs = async (req, res) => {
  let pages = 10;

  const pageStart = req.body.pageStart;
  const pageEnd = req.body.pageEnd;
  // const searchFilter

  try {
    for (let i = pageStart; i < pageEnd; i++) {
      const response = await axios.get(APIURL, {
        params: {
          page: i,
          descending: true,
          category: "Software Engineering",
        },
      });
      console.log(response);
      response.data.results.map((item) => results.push(item));
    }
  } catch {}
  // const response = await axios.get(APIURL, {
  //   params: {
  //     page: 1,
  //     descending: true,
  //     category: "Software Engineering",
  //   },
  // });
  console.log(results.length);

  res.status(201).json(results);
};
// export const getJobTest = async (req, res) => {
//   const browser = await puppeteer.launch({
//     args: [
//       "--disable-setuid-sandbox",
//       "--no-sandbox",
//       "--single-process",
//       "--no-zygote",
//       "--proxy-server=64.225.8.82:9981",
//     ],
//     executablePath:
//       process.env.NODE_ENV == "production"
//         ? process.env.PUPPETEER_EXECUTABLE_PATH
//         : puppeteer.executablePath(),
//   });
//   const page = await browser.newPage();
//   // await page.setUserAgent(
//   //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"
//   // );

//   // await page.setDefaultNavigationTimeout(60000);
//   // await page.setRequestInterception(true);

//   // page.on("request", (request) => {
//   //   request.continue();
//   // });

//   // page.on("response", (response) => {
//   //   if (response.status() === 301 || response.status() === 302) {
//   //     const redirectUrl = response.headers()["location"];
//   //     page.goto(redirectUrl, { waitUntil: "networkidle0" });
//   //   }
//   // });
//   await page.goto(
//     "https://www.adzuna.co.uk/jobs/land/ad/4119746753?se=5unGLosA7hGAuJ_2WWCbQA&utm_medium=api&utm_source=1370ff3d&v=6F4D49B28A6ED30BF9EF89BAE0AD74987EDB2BB0",
//     { waitUntil: "networkidle0" }
//   );
//   // await page.waitForNavigation({ waitUntil: "networkidle0" });
//   // await page.waitForNavigation({ waitUntil: "networkidle0" });

//   // The page has now finished loading after following the redirect(s)

//   //   const html = await page.content();
//   // const title = await page.evaluate(() => document.title);
//   // const text = await page.evaluate(() => document.body.innerText);
//   // const header = await page.evaluate(
//   //   () => document.body.querySelector("article ").innerHTML
//   // );
//   // const image = await page.evaluate(
//   //   () =>
//   //     document.body.querySelector(".CompanyLogoOutlined_logoPill__weBC5")
//   //       .innerHTML
//   // );
//   // const applyLink = await page.evaluate(
//   //   () =>
//   //     document.body.querySelector(
//   //       ".JobApplyButtonSideBarModule_jobApplyContainer__Hlere"
//   //     ).innerHTML
//   // );
//   const content = await page.content();
//   // console.log(content);
//   const header = await page.evaluate(
//     () => document.body.querySelector("article ").innerHTML
//   );
//   console.log(header);

//   await browser.close();
//   return {
//     content,
//   };
//   // } else {
//   //   return { error: "error" };
//   // }
// };
