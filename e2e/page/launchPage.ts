import { Locator, Page } from '@playwright/test';
import handlePreviewBar_util from './utils/handlePreviewBar';

export default class ProductsLaunch {
	readonly page: Page;
	readonly localUrl: string;
	readonly shopWomen: string;
	readonly shopMen: string;
	readonly shopKids: string;
	readonly sunLensPath: string;
	readonly popUpCloseBtn: Locator;
	readonly collectionsCTA: Locator;
	readonly navHamburguerMenuIcon: Locator;
	readonly topFramesLink: Locator;
	readonly chooseTopFramesBtn: Locator;
	readonly frameCardsTitle: Locator;
	readonly collectionsMenuBtn: Locator;
	readonly currentCollectionsTops: Locator;
	readonly currentCollectionsTopsBtn: Locator;
	readonly currentCollectionsTopsTitles: Locator;
	readonly collectionMenuHeaders: Locator;
	readonly selectLensType: Locator;
	readonly non_Prescription: Locator;
	readonly addToCart: Locator;
	readonly productsCardContainer: Locator
	readonly larkinUrl: string
	readonly collectionsGrid: Locator

	constructor(page: Page) {
		this.page = page;
		this.localUrl = 'https://paireyewear.com/';
		this.shopWomen = '/collections/womens-frames';
		this.shopMen = '/collections/mens-frames';
		this.shopKids = '/collections/kids-frames';
		this.sunLensPath = '?view=sun_lens';
		this.larkinUrl = this.localUrl + 'products/large-base?&base_color=Tortoise&adult=default&women=true'
		this.productsCardContainer = page.locator("//div[@id='buildFlowApp']//div//section//div//div//ul")
		this.currentCollectionsTops = page.locator("//div[@id='classic-designs']//ul//div//li");
		this.currentCollectionsTopsBtn = page.locator("//div[@id='classic-designs']//ul//div//li//button");
		this.currentCollectionsTopsTitles = page.locator("//div[@id='classic-designs']//ul//div//li//p");
		this.frameCardsTitle = page.locator('.pair-product-card .grid-view-item__title');
		this.chooseTopFramesBtn = page.locator('text=Choose Top Frames');
		this.popUpCloseBtn = page.locator("button:has-text('Close form')");
		this.collectionsCTA = page.locator("text='Explore Our Top Collections'");
		this.navHamburguerMenuIcon = page.locator("//span[@class='icon--open']");
		this.selectLensType = page.locator("button:has-text('Select Lens Type')");
		this.non_Prescription = page.locator("//div[@data-name='Non-Prescription']");
		this.addToCart = page.locator("button:has-text('Add to Cart')");
		this.topFramesLink = page.locator("//button[@aria-controls='subnav-top-frames']");
		this.collectionMenuHeaders = page.locator("//p[normalize-space()='Select Collection']");
		this.collectionsMenuBtn = page.locator("button[title='Collection Grid View']");
		this.collectionsGrid = page.locator("div[data-test='data-collection-grid']")
	}

	async handlePopUp() {
		// await this.popUpCloseBtn.scrollIntoViewIfNeeded()
		// await this.popUpCloseBtn.click();
	}

	async returnFrameTitle() {
		const products = await this.frameCardsTitle.allTextContents();
		return products[Math.floor(Math.random() * products.length)].split(' ').pop();
	}

	async goToShopWomen() {
		await this.page.goto(this.localUrl + this.shopWomen);
	}
	async goToShopMen() {
		await this.page.goto(this.localUrl + this.shopWomen);
	}

	replaceSpacesWithHyphens(name: string): string {
		return name.replace(/ /g, '-');
	}

	returnCollectionURL(collectionName: string) {
		return '/collections/' + this.replaceSpacesWithHyphens(collectionName.toLocaleLowerCase());
	}

	newCollectionBanner(collectionName: string) {
		return this.page.locator(`a[data-collection-tile='${collectionName}']`)
	}

	returnNewCollectionNavLink(collectionName: string) {
		return this.page.locator(`li[data-handle='${this.replaceSpacesWithHyphens(collectionName.toLocaleLowerCase())}']`);
	}

	async goToCollection(collectionName: string) {
		await Promise.all([
			this.page.waitForNavigation(),
			this.returnNewCollectionNavLink(this.replaceSpacesWithHyphens(collectionName)).click(),
		]);
	}

	async goToDesingYourFrame(frameTitle: string) {
		await this.page
			.locator(`.pair-product-card a:has-text('     Design Your     ${frameTitle}   ')`)
			.scrollIntoViewIfNeeded();
		await this.page.locator(`.pair-product-card a:has-text('     Design Your     ${frameTitle}   ')`).click();
		// await Promise.all([
		// 	this.page.waitForNavigation(),
		// 	this.page.locator(`.pair-product-card a:has-text('     Design Your     ${frameTitle}   ')`).click(),
		// ]);
	}

	async clickChooseTopFramesBtn() {
		await this.chooseTopFramesBtn.click();
	}

	async productCardLocatorContainer(collectionName: string) {
		return this.page.locator(`div[data-handle='${this.replaceSpacesWithHyphens(collectionName)}']`);
	}

	async clickCollectionsMenuBtn() {
		await this.collectionsMenuBtn.click();
	}

	async productCardLocator(productName: string, collectionName: string): Promise<Locator> {
		return (await this.productCardLocatorContainer(collectionName)).locator(
			`//div[@data-handle='${this.replaceSpacesWithHyphens(productName)}']`
		);
	}

	async productCardLocatorPLP(productName: string) {
		return this.page.locator(`img[data-product-name="${productName}"]`)
	}

	async productTitlePLP(productName: string) {
		return this.page.locator(`//h4[normalize-space()="${productName}"]`)
	}

	async returnCollectionMenuTileLocator(collectionName: string): Promise<Locator> {
		return this.page.locator(`(//*[@data-collection-name="${collectionName}"])[2]`);
	}

	async topTitle(product: string) {
		return this.page.locator(`//p[normalize-space()="${product}"]`);
	}

	async clickAddTopBtn(product: string) {
		await this.page.locator(`//button[@data-add-top="${product}"]`).click();
	}

	async clickSelectLensTypeBtn() {
		await this.selectLensType.click();
	}

	async clickNonPrescription() {
		await this.non_Prescription.click();
	}

	async clickAddToCartBtn() {
		await Promise.all([this.page.waitForNavigation(), this.addToCart.click()]);
	}

	async handlePreviewBar() {
        await handlePreviewBar_util(this.page,this.localUrl)
    }
}
