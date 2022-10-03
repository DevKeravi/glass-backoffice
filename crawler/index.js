require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const port = 5000;
const puppeteer = require("puppeteer");
const moment = require("moment");
const app = express();

app.use(cors());
app.listen(port);

console.log(`crawler server started!!`);

app.get("/crawler/getTime", async (req, res) => {
  const { JOBCAN_ID, JOBCAN_PASS } = process.env;
  const data = await getData({
    id: JOBCAN_ID,
    password: JOBCAN_PASS,
  });
  res.send(data);
});

async function getData({ id, password }) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://ssl.jobcan.jp/employee/attendance");
  await page.type("#client_id", "iacryl");
  await page.type("#email", id);
  await page.type("#password", password);

  await page.evaluate(() => {
    const submitBtn = document.getElementsByClassName("btn btn-info btn-block");
    submitBtn[0].click();
  });

  await page.waitForSelector(".jbc-text-reset", { timeout: 10000 });

  const tableData = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".jbc-table > tbody > tr"), (row) =>
      Array.from(row.querySelectorAll("th, td"), (cell) => cell.innerText)
    )
  );
  browser.close();

  const thisWeek = getThisWeek();
  const filteredData = tableData.filter((v) => {
    if (v.length > 0 && thisWeek.includes(v[0])) {
      return true;
    } else {
      return false;
    }
  });

  const result = [];
  filteredData.forEach((v) => {
    const data = {
      date: v[0],
      start: v[3],
      end: v[4],
      work: v[5],
      rest: v[6],
    };
    result.push(data);
  });

  return result;
}

const getThisWeek = () => {
  const currentDay = new Date();
  const theYear = currentDay.getFullYear();
  const theMonth = currentDay.getMonth();
  const theDate = currentDay.getDate();
  const theDayOfWeek = currentDay.getDay();

  const thisWeek = [];

  for (let i = 0; i < 7; i++) {
    const resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
    const yyyy = resultDay.getFullYear();
    let mm = Number(resultDay.getMonth()) + 1;
    let dd = resultDay.getDate();

    mm = String(mm).length === 1 ? "0" + mm : mm;
    dd = String(dd).length === 1 ? "0" + dd : dd;
    const day = moment(`${yyyy}-${mm}-${dd}`).day();

    thisWeek[i] = mm + "/" + dd;
    thisWeek[i] = `${mm}/${dd}(${요일변환(day)})`;
  }

  const result = thisWeek.filter(
    (v) => !(v.includes("토") || v.includes("일"))
  );
  return result;
};

const 요일변환 = (value) => {
  let result = "월";
  switch (value) {
    case 1:
      result = "월";
      break;
    case 2:
      result = "화";
      break;
    case 3:
      result = "수";
      break;
    case 4:
      result = "목";
      break;
    case 5:
      result = "금";
      break;
    case 6:
      result = "토";
      break;
    case 0:
      result = "일";
      break;
  }
  return result;
};
