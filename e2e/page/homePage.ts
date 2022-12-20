import { Locator, Page } from '@playwright/test';
import handlePreviewBar_util from './utils/handlePreviewBar';

export default class Homepage {
	readonly page: Page;
	readonly localUrl: string;
	readonly popUpCloseBtn: Locator;
	readonly cta: Locator;
	readonly shopWomenBtn: Locator
	readonly shopMenBtn: Locator
	readonly shopKidsBtn: Locator
	readonly myCartIcon: Locator;
	readonly myCartValue: Locator;
	readonly myCartSubtotal: Locator;
	readonly myCartItemCount: Locator;
	readonly myCartBackBtn: Locator;
	readonly myCartPayments: Locator;
	readonly sunglassesCTA: Locator;
	readonly sunglassesShopWomen: Locator;
	readonly sunglassesShopMen: Locator;
	readonly sunglassesShopKids: Locator;
	readonly sunglassesCTAText: Locator;

	constructor(page: Page, baseURL: string) {
		this.page = page;
		this.localUrl = baseURL;
		this.popUpCloseBtn = page.locator("button:has-text('Close form')");
		this.cta = page.locator('h1:has-text("Customizable Glasses You\'ll Love")');
		this.shopWomenBtn = page.locator("a[data-name='Shop Women']")
		this.shopMenBtn = page.locator("a[data-name='Shop Men']")
		this.shopKidsBtn = page.locator("a[data-name='Shop Kids']")
		this.myCartIcon = page.locator("a[data-test='minicart']");
		this.myCartValue = page.locator("span[data-test='my-cart-value']");
		this.myCartSubtotal = page.locator("span[data-test='subtotal']");
		this.myCartItemCount = page.locator("[class$='cart-item-count-minicart']");
		this.myCartBackBtn = page.locator("a[class='button button-small']");
		this.myCartPayments = page.locator("p[data-test='split-payments']");
		this.sunglassesCTA = page.locator("section[data-test='suglasses-cta-container']");
		this.sunglassesShopWomen = page.locator("a[data-name='sunglasses-shop-women']");
		this.sunglassesShopMen = page.locator("a[data-name='sunglasses-shop-men']");
		this.sunglassesShopKids = page.locator("a[data-name='sunglasses-shop-kids']");
		this.sunglassesCTAText = page.locator("section[data-test='suglasses-cta-container'] h2");
		this.sunglassesCTA = page.locator("//section[@class='index-landing-cta']");
		this.sunglassesShopWomen = page.locator("//section[@class='index-landing-cta']//a[normalize-space()='Shop Women']");
		this.sunglassesShopMen = page.locator("//section[@class='index-landing-cta']//a[normalize-space()='Shop Men']");
		this.sunglassesShopKids = page.locator("//section[@class='index-landing-cta']//a[normalize-space()='Shop Kids']");
		this.sunglassesCTAText = page.locator("//section[@class='index-landing-cta']//*[normalize-space()='Sunglasses']");
	}

	private async navigateTo(locator: Locator) {
		await locator.scrollIntoViewIfNeeded();
		await Promise.all([this.page.waitForNavigation(), locator.click()]);
	}

	async handlePopUp() {
		// await this.popUpCloseBtn.scrollIntoViewIfNeeded()
		// await this.popUpCloseBtn.click();
	}

	async navigateToShopWomen() {
		await this.navigateTo(this.shopWomenBtn);
	}

	async clickMyCartIcon() {
		await this.myCartIcon.click();
	}

	async returnCartPaymenstValue(): Promise<number> {
		const cartPaymentsText = await this.myCartPayments.textContent();
		return parseFloat(cartPaymentsText.split(' ')[4].replace('$', ''));
	}

	async returnMyCartValue(): Promise<number> {
		const value = await this.myCartValue.textContent();
		return parseFloat(value.replace('$', ''));
	}

	async returnMyCartSubtotal(): Promise<number> {
		const value = await this.myCartSubtotal.textContent();
		return parseFloat(value.replace('$', ''));
	}

	async returnMyCartItemCount(): Promise<number> {
		const value = await this.myCartItemCount.textContent();
		return parseFloat(value.match(/\d+/)[0]);
	}

	async handlePreviewBar() {
        await handlePreviewBar_util(this.page,this.localUrl)
    }
}
