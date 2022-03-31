import { Page } from 'puppeteer';

import { AddNetwork } from '../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addNetwork = (page: Page, version?: string) => async ({
  networkName,
  rpc,
  chainId,
  symbol,
  explorer,
}: AddNetwork): Promise<void> => {
  await page.bringToFront();
  const networkSwitcher = await page.waitForSelector('.network-display');
  await networkSwitcher.click();
  await page.waitForSelector('li.dropdown-menu-item');

  const networkButton = await page.$('.network-droppo > div > button');
  await networkButton.click();

  const networkNameInput = await page.waitForSelector('div:nth-child(1) > label > input');
  await networkNameInput.type(networkName);

  const rpcInput = await page.waitForSelector('div:nth-child(2) > label > input');
  await rpcInput.type(rpc);

  const chainIdInput = await page.waitForSelector('div:nth-child(3) > label > input');
  await chainIdInput.type(String(chainId));

  if (symbol) {
    const symbolInput = await page.waitForSelector('input#network-ticker');
    await symbolInput.type(symbol);
  }
  if (explorer) {
    const explorerInput = await page.waitForSelector('input#block-explorer-url');
    await explorerInput.type(explorer);
  }
  await delay(200);
  const saveButton = await page.waitForSelector('.btn-primary');
  await delay(200);
  await saveButton.click();
};
async function delay(delayInms): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
