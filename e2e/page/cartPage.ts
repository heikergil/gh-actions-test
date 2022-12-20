import { Locator, Page } from '@playwright/test';
import handlePreviewBar_util from './utils/handlePreviewBar';

export default class CartPage {
	readonly page: Page;
	readonly localUrl: string;
	readonly url: string;
	readonly popUpCloseBtn: Locator;
	readonly cartPageTotalPrice: Locator;
	readonly cartPageItemCount: Locator;
	readonly cartPageBackBtn: Locator;
	readonly cartPageSubtotal: Locator;
	readonly cartPagePayments: Locator;
	readonly cartPageBaseFrameTheKirby: Locator;
	readonly cartPageBlueLightFiltering: Locator;
	readonly cartPageLightResponsive: Locator;
	readonly cartPagePremiumPlus: Locator;
	readonly cartPageTheGalaxy: Locator;
	readonly cartPageTheOceanBlue: Locator;
	readonly baseFrameDeleteBtn: Locator;
	readonly lightResponsiveDeleteBtn: Locator;
	readonly blueLightFilteringDeleteBtn: Locator;
	readonly premiumPlusDeleteBtn: Locator;
	readonly theGalaxyDeleteBtn: Locator;
	readonly theOceanBlueDeleteBtn: Locator;
	readonly addWallHangerBtn: Locator;
	readonly addTopFrameCaseBtn: Locator;
	readonly addCleaningKitBtn: Locator;
	readonly otherItemCleaningKit: Locator;
	readonly otherItemTopFrameCase: Locator;
	readonly otherItemWallHanger: Locator;
	readonly itemsRoot: Locator;
	readonly prices: {};
	readonly inCart: string;
	readonly deleteOtherItems: string;
	readonly footer: Locator;
	readonly removeCleaningKit: Locator;
	readonly removeTopFrameCase: Locator;
	readonly removeWallHanger: Locator;

	constructor(page: Page, baseURL: string) {
		this.page = page;
		this.localUrl = baseURL
		this.url = baseURL + 'cart';
		this.popUpCloseBtn = page.locator("button:has-text('Close form')");
		this.cartPageTotalPrice = page.locator("[data-test='my-cart-value']");
		this.cartPageItemCount = page.locator("[class$='cart-item-count-minicart']");
		this.cartPageSubtotal = page.locator("(//span[@data-test='subtotal'])[1]");
		this.cartPagePayments = page.locator("(//p[@data-test='split-payments'])[1]");
		this.cartPageBaseFrameTheKirby = page.locator("[data-base-frame='The Kirby']");
		this.cartPageLightResponsive = page.locator("[data-top-frame='Light Responsive']");
		this.cartPageBlueLightFiltering = page.locator("[data-top-frame='Blue Light Filtering']");
		this.cartPagePremiumPlus = page.locator("[data-top-frame='Premium Plus']");
		this.cartPageTheGalaxy = page.locator("//div[@data-top-frame-title='The Galaxy']//p");
		this.cartPageTheOceanBlue = page.locator("//div[@data-top-frame-title='The Ocean Blue']//p");
		this.baseFrameDeleteBtn = page.locator("[data-cart-remove='The Kirby - Pink Clear']");
		this.lightResponsiveDeleteBtn = page.locator("[data-cart-remove='Light Responsive']");
		this.blueLightFilteringDeleteBtn = page.locator("[data-cart-remove='Blue Light Filtering']");
		this.premiumPlusDeleteBtn = page.locator("[data-cart-remove='Premium Plus']");
		this.theGalaxyDeleteBtn = page.locator("[data-cart-remove='The Galaxy - Kirby']");
		this.theOceanBlueDeleteBtn = page.locator("[data-cart-remove='The Ocean Blue - Kirby']");
		this.addWallHangerBtn = page.locator("div[data-name$='Wall Hanger']");
		this.addTopFrameCaseBtn = page.locator("div[data-name$='Top Frame Case']");
		this.addCleaningKitBtn = page.locator("div[data-name$='Handy Dandy Cleaning Kit']");
		this.itemsRoot = page.locator('//section[@id="itemsRoot"]');
		this.inCart = "(//div[contains(text(),'In Cart!')])";
		this.removeCleaningKit = page.locator("[data-cart-remove='Handy Dandy Cleaning Kit']");
		this.removeTopFrameCase = page.locator("[data-cart-remove*='Top Frame Case - ']");
		this.removeWallHanger = page.locator("[data-cart-remove*='Wall Hanger - ']");
		this.footer = page.locator('footer');
		this.prices = {
			baseFrame: 60.0,
			blueLightFiltering: 49.0,
			lightResponsive: 149.0,
			premiunPlus: 59.0,
			progressives: 199.0,
			sunglassLens: 99,
			top: 25,
			licensedTop: 30,
			wallHanger: 15,
			topFrameCase: 15,
			cleaningKit: 15,
			reflectiveLens: 15,
		};
	}

	private async navigateTo(locator: Locator) {
		await locator.scrollIntoViewIfNeeded();
		await Promise.all([this.page.waitForNavigation(), locator.click()]);
	}

	async returnFrameTitleLocator(title: string) {
		return this.page.locator(`//*[normalize-space()='${title}']`).nth(1);
	}

	async returnBaseFrameRemoveBtn(baseFrame: string) {
		return this.page.locator(`[data-cart-remove*='${baseFrame} - ']`)
	}

	async goto() {
		await this.page.goto(this.url);
	}

	async handlePopUp() {
		// await this.popUpCloseBtn.scrollIntoViewIfNeeded()
		// await this.popUpCloseBtn.click();
	}

	async returnCartPageTotalPrice(): Promise<number> {
		const value = await this.cartPageTotalPrice.textContent();
		return parseFloat(value.replace('$', ''));
	}

	async returnCartPageSubtotal(): Promise<number> {
		const value = await this.cartPageSubtotal.first().textContent();
		return parseFloat(value.replace('$', ''));
	}

	async returnCartPageItemCount(): Promise<number> {
		const value = await this.cartPageItemCount.textContent();
		return parseFloat(value.match(/\d+/)[0]);
	}

	async clickWallHangerAddBtn(): Promise<void> {
		await this.addWallHangerBtn.click();
	}

	async clickTopFrameCaseAddBtn(): Promise<void> {
		await this.addTopFrameCaseBtn.click();
	}

	async clickCleaningKitAddBtn(): Promise<void> {
		await this.addCleaningKitBtn.click();
	}

	async deleteBaseFrame(): Promise<void> {
		await this.baseFrameDeleteBtn.click();
	}

	async handlePreviewBar() {
        await handlePreviewBar_util(this.page,this.localUrl)
    }
}
