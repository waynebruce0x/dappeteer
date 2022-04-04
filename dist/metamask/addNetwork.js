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
    const networkIndex = yield page.evaluate((network) => {
        const elements = document.querySelectorAll('li.dropdown-menu-item');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.innerText.toLowerCase().includes(network.toLowerCase())) {
                return i;
            }
        }
        return elements.length - 1;
    }, 'Custom RPC');
    const networkButton = (yield page.$$('li.dropdown-menu-item'))[networkIndex];
    yield networkButton.click();
    const networkNameInput = yield page.waitForSelector('input#network-name');
    yield networkNameInput.type(networkName);
    const rpcInput = yield page.waitForSelector('input#rpc-url');
    yield rpcInput.type(rpc);
    const chainIdInput = yield page.waitForSelector('input#chainId');
    yield chainIdInput.type(String(chainId));
    if (symbol) {
        const symbolInput = yield page.waitForSelector('input#network-ticker');
        yield symbolInput.type(symbol);
    }
    yield delay(200);
    const saveButton = yield page.waitForSelector('.network-form__footer > button.button.btn-secondary');
    yield delay(200);
    yield saveButton.click();
});
function delay(delayInms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    });
}
