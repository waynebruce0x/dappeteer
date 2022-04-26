import { Page } from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const switchNetwork = (page: Page, version?: string) => async (network = 'main'): Promise<void> => {
  await page.bringToFront();
  try {
    const popup = await page.waitForSelector('#popover-content button', { timeout: 3000 })
    await popup.click()
  } catch { }
  const networkSwitcher = await page.waitForSelector('.network-display');
  await networkSwitcher.click();
  await page.waitForSelector('li.dropdown-menu-item');

  const networkIndex = await page.evaluate((network) => {
    const elements = document.querySelectorAll('li.dropdown-menu-item');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if ((element as HTMLLIElement).innerText.toLowerCase().includes(network.toLowerCase())) {
        return i;
      }
    }
    return 0;
  }, network);

  const networkFullName = await page.evaluate((index) => {
    const elements = document.querySelectorAll(`li.dropdown-menu-item > span`);
    return (elements[index] as HTMLLIElement).innerText;
  }, networkIndex);

  const networkButton = (await page.$$('li.dropdown-menu-item'))[networkIndex];
  await networkButton.click();

  await page.waitForXPath(`//*[text() = '${networkFullName}']`);
};
