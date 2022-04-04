import { Page } from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const approve = (page: Page, version?: string) => async (): Promise<void> => {
  await page.bringToFront();
  await page.reload();
  await delay(5000)
  const button = await page.waitForSelector('.btn-primary');
  await button.click();

  const connectButton = await page.waitForSelector('.btn-primary');
  await connectButton.click();
};
async function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
};