import puppeteer from "puppeteer";
export const getJobDetails = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  async function run() {
    const browser = await puppeteer.launch({
      headless: "new",
      // `headless: true` (default) enables old Headless;
      // `headless: 'new'` enables new Headless;
      // `headless: false` enables “headful” mode.
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    // console.log(req);
    if (req.body.url) {
      await page.goto(req.body.url);
      //   const html = await page.content();
      // const title = await page.evaluate(() => document.title);
      // const text = await page.evaluate(() => document.body.innerText);
      const header = await page.evaluate(
        () => document.body.querySelector("article ").innerHTML
      );
      const image = await page.evaluate(
        () =>
          document.body.querySelector(".CompanyLogoOutlined_logoPill__weBC5")
            .innerHTML
      );
      const applyLink = await page.evaluate(
        () =>
          document.body.querySelector(
            ".JobApplyButtonSideBarModule_jobApplyContainer__Hlere"
          ).innerHTML
      );

      await browser.close();
      return {
        header: header && header,
        image: image && image,
        link: applyLink && applyLink,
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
