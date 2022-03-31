"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNetwork = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.addNetwork = (page, version) => ({ networkName, rpc, chainId, symbol, explorer, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.bringToFront();
    const networkSwitcher = yield page.waitForSelector('.network-display');
    yield networkSwitcher.click();
    yield page.waitForSelector('li.dropdown-menu-item');

    const networkButton = (yield page.$('.network-droppo > div > button'));

    yield networkButton.click();
    const networkNameInput = yield page.waitForSelector('div:nth-child(1) > label > input');
    yield networkNameInput.type(networkName);
    const rpcInput = yield page.waitForSelector('div:nth-child(2) > label > input');
    yield rpcInput.type(rpc);
    const chainIdInput = yield page.waitForSelector('div:nth-child(3) > label > input');
    yield chainIdInput.type(String(chainId));
    yield delay(200);
    const saveButton = yield page.waitForSelector('.btn-primary');
    yield saveButton.click();
    yield delay(200);
});
function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
