import { Page } from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const switchAccount = (page: Page, version?: string) => async (accountNumber: number): Promise<void> => {
  await page.bringToFront();
  const accountSwitcher = await page.waitForSelector('.identicon');
  await accountSwitcher.click();
  await delay(500)
  const account = await page.waitForSelector(`.account-menu__accounts > div:nth-child(${accountNumber})`);
  await account.click();
};
async function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
};