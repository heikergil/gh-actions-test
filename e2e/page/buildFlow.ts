import { Locator, Page } from '@playwright/test';
import handlePreviewBar_util from './utils/handlePreviewBar';

export default class BuildFlow {
	readonly page: Page;
	readonly localUrl: string;
	readonly shopWomen: string;
	readonly shopMen: string;
	readonly shopKids: string;
	readonly popUpCloseBtn: Locator;
	readonly frameCardsTitle: Locator;
	readonly chooseTopFramesBtn: Locator;
	readonly currentCollectionsTops: Locator;
	readonly currentCollectionsTopsBtn: Locator;
	readonly currentCollectionsTopsTitles: Locator;
	readonly blueLightFiltering: Locator;
	readonly premiunPlus: Locator;
	readonly lightResponsive: Locator;
	readonly buildFlowBackBtn: Locator;
	readonly single_vision: Locator;
	readonly progressives: Locator;
	readonly readers: Locator;
	readonly selectLensType: Locator;
	readonly non_Prescription: Locator;
	readonly addToCart: Locator;
	readonly checkoutBtn: Locator;
	readonly orderSummary: Locator;
	readonly baseFrameLocatorCheckout: Function;
	readonly baseFrameCartCheckout: Function;
	readonly baseFrameLocatorPDP: Locator
	readonly frames: Array<string>;
	readonly trailingURL: string;
	readonly buildFlowSubtotal: Locator;
	readonly buildFlowPayments: Locator;
	readonly prices: {};
	readonly lensOptionsBackBtn: Locator;
	readonly sunLensPath: string;
	readonly greenReflective: Locator;
	readonly addToCartBtnbyText: Locator

	constructor(page: Page, baseURL: string) {
		this.page = page;
		this.localUrl = baseURL;
		this.shopWomen = 'collections/womens-frames';
		this.shopMen = 'collections/mens-frames';
		this.shopKids = 'collections/kids-frames';
		this.sunLensPath = '?view=sun_lens';
		this.lensOptionsBackBtn = page.locator("//span[normalize-space()='Back']");
		this.popUpCloseBtn = page.locator('button:has-text("Close form")');
		this.frameCardsTitle = page.locator("//div[@class='pair-product-card']//div[@data-handle]");
		this.chooseTopFramesBtn = page.locator('text=Choose Top Frames');
		this.non_Prescription = page.locator("div[data-name='Non-Prescription']");
		this.blueLightFiltering = page.locator("div[data-name='Blue Light Filtering']");
		this.premiunPlus = page.locator("div[data-name='Premium Plus']");
		this.lightResponsive = page.locator("div[data-name='Light Responsive']");
		this.single_vision = page.locator("div[data-name='Single-Vision']");
		this.progressives = page.locator("div[data-name='Progressives']");
		this.readers = page.locator("div[data-name='Readers']");
		this.selectLensType = page.locator("[data-select-lens-type]");
		this.addToCart = page.locator("span:has-text('Add to Cart')");
		this.chooseTopFramesBtn = page.locator('button:has-text("Choose Top Frames")');
		this.currentCollectionsTops = page.locator("(//*[@data-collection])[1]").locator("//div//li");
		this.currentCollectionsTopsBtn = page.locator("(//*[@data-collection])[1]").locator("//button");
		this.currentCollectionsTopsTitles = page.locator("(//*[@data-collection])[1]").locator("//div//li//p");
		this.selectLensType = page.locator("button:has-text('Select Lens Type')");
		this.non_Prescription = page.locator("//div[@data-name='Non-Prescription']");
		this.blueLightFiltering = page.locator("//div[@data-name='Blue Light Filtering']");
		this.premiunPlus = page.locator("//div[@data-name='Premium Plus']");
		this.lightResponsive = page.locator("//div[@data-name='Light Responsive']");
		this.single_vision = page.locator("//div[@data-name='Single-Vision']");
		this.progressives = page.locator("//div[@data-name='Progressives']");
		this.readers = page.locator("//div[@data-name='Readers']");
		this.selectLensType = page.locator("button:has-text('Select Lens Type')");
		this.addToCart = page.locator("button:has-text('Add to Cart')");
		this.checkoutBtn = page.locator('text=Checkout >> nth=0');
		this.orderSummary = page.locator("//button[@aria-controls='order-summary']");
		this.buildFlowSubtotal = page.locator("[data-testid='buildflow-subtotal-price']");
		this.buildFlowPayments = page.locator("[data-testid='buildflow-split-payments']");

		this.baseFrameLocatorCheckout = (productTitle: string) => {
			return this.page.locator(`th span:has-text('The ${productTitle}')`);
		};
		this.baseFrameCartCheckout = (productTitle: string) => {
			return this.page.locator(`//p[normalize-space()='The ${productTitle}']`);
		};
		this.baseFrameLocatorPDP = this.page.locator("//section[@data-section-name='product-details']//h1");
		this.trailingURL = '?base_color=Crystal%20Clear&adult=default&women=true';
		this.frames = [
			'the-kirby',
			'large-base',
			'the-wanda',
			'the-ella',
			'the-finley',
			'the-casper',
			'base-frame-3',
			'the-reese',
			'the-otis',
			'the-soto',
		];
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

	async handlePopUp() {
		await this.popUpCloseBtn.scrollIntoViewIfNeeded()
		await this.popUpCloseBtn.click();
	}

	private async navigateTo(locator: Locator) {
		await locator.scrollIntoViewIfNeeded();
		await Promise.all([this.page.waitForNavigation({ waitUntil: 'load' }), locator.click()]);
	}


	async selectGreenReflective(frameTitle: string) {
		const swatchList = this.page.locator(`.pair-product-card:has-text('${frameTitle}')`);
		await swatchList.locator('[data-lens-color="Green Reflective"]').click();
	}

	async returnFrameTitle() {
		const products = await this.frameCardsTitle.allTextContents();
		return products[Math.floor(Math.random() * products.length)].split(' ').pop();
	}
	async goToShopWomen() {
		await this.page.goto(this.localUrl + this.shopWomen, { waitUntil: 'networkidle' });
	}
	async goToShopMen() {
		await this.page.goto(this.localUrl + this.shopWomen, { waitUntil: 'load' });
	}

	async navigateToSunLensPDP(frameTitle: string) {
		await this.navigateTo(this.page.locator(`.pair-product-card a:has-text('     Design Your     ${frameTitle}   ')`));
		// await this.page.locator(`.pair-product-card a:has-text('     Design Your     ${frameTitle}   ')`).click();
	}

	async goToSunLensShopMen() {
		await this.page.goto(this.localUrl + this.shopMen + this.sunLensPath);
	}

	async goToSunLensShopWomen() {
		await this.page.goto(this.localUrl + this.shopWomen + this.sunLensPath);
	}

	async goToSunLensShopKids() {
		await this.page.goto(this.localUrl + this.shopKids + this.sunLensPath);
	}

	async goToShopKids() {
		await this.page.goto(this.localUrl + this.shopWomen);
	}

	async clickBackBtn() {
		await this.lensOptionsBackBtn.click();
	}

	async goToDesingYourFrame(frameTitle: string) {

		if (frameTitle === 'Kirby') {
			await this.page.locator(`//a[normalize-space()='Design Your ${frameTitle}']`).nth(1).scrollIntoViewIfNeeded()
		await Promise.all([
			this.page.waitForNavigation(),
			this.page.locator(`//a[normalize-space()='Design Your ${frameTitle}']`).nth(1).click(),
		]);
		} else {
			await this.page.locator(`//a[normalize-space()='Design Your ${frameTitle}']`).nth(0).scrollIntoViewIfNeeded()
		await Promise.all([
			this.page.waitForNavigation(),
			this.page.locator(`//a[normalize-space()='Design Your ${frameTitle}']`).nth(0).click(),
		]);
		}
		
	}

	async clickChooseTopFramesBtn() {
		await this.chooseTopFramesBtn.click();
	}

	async clickSelectLensTypeBtn() {
		await this.selectLensType.click();
	}

	async clickSingleVision() {
		await this.single_vision.click();
	}

	async clickProgressive() {
		await this.progressives.click();
	}

	async clickReaders() {
		await this.readers.click();
	}

	async clickNonPrescription() {
		await this.non_Prescription.click();
	}

	async clickBlueLightFiltering() {
		await this.blueLightFiltering.click();
	}

	async clickPremiunPlus() {
		await this.premiunPlus.click();
	}

	async clickLightResponsive() {
		await this.lightResponsive.click();
	}

	async clickAddToCartBtn() {
		await Promise.all([this.page.waitForNavigation(), this.addToCart.click()]);
	}

	async navigateToCheckout() {
		await Promise.all([this.page.waitForNavigation(), this.checkoutBtn.click()]);
	}

	async handleOrderSummary() {
		let isOrderHidden = await this.orderSummary.isVisible();
		if (isOrderHidden) {
			await this.orderSummary.first().click();
		}
	}

	async addTop() {
		const count = await this.currentCollectionsTops.count();
		const topIndex = Math.floor(Math.random() * count);
		const status = await this.currentCollectionsTopsBtn.nth(topIndex).getAttribute('data-added');
		if (status === 'true') {
			this.addTop();
		} else {
			await this.currentCollectionsTopsBtn.nth(topIndex).scrollIntoViewIfNeeded();
			await this.currentCollectionsTopsBtn.nth(topIndex).click();
			return topIndex
		}
	}

	async returnTopPrice(topIndex: number) {
		const price = await this.currentCollectionsTopsBtn.nth(topIndex).locator("[data-name='price']").textContent()
		return parseInt(price.replace('$', ''));
	}

	async returnTopTitle(topIndex: number) {
		const title = await this.currentCollectionsTopsTitles.nth(topIndex).textContent()
		return title;
	}

	returnBuildFlowURL(): string {
		const index = Math.floor(Math.random() * this.frames.length);
		return 'products/' + this.frames[index] + this.trailingURL;
	}

	async goToChooseTopFrames() {
		const url = this.returnBuildFlowURL()
		await this.page.goto(this.localUrl + url, {waitUntil: 'load'});
	}

	async returnBuildFlowSubtotalValue() {
		return parseFloat(await this.buildFlowSubtotal.textContent());
	}

	async returnBuildFlowPaymentsValue() {
		return parseFloat(await this.buildFlowPayments.textContent());
	}

	async handlePreviewBar() {
        await handlePreviewBar_util(this.page,this.localUrl)
    }
}
