import { Locator, Page } from '@playwright/test';
import handlePreviewBar_util from './utils/handlePreviewBar';

export default class PLPpage {
	readonly page: Page;
	readonly localUrl: string;
	readonly popUpCloseBtn: Locator;
    readonly allTopsLink: string
    readonly allFramesLink: string
    readonly accessoriesPageLink: string
    readonly allTopsCTA: Locator
    readonly allFramesText: Locator
    readonly allFramesCTA: Locator
    readonly accessoriesTopFrameCasesTitle: Locator
    readonly accessoriesEarHooksTitle: Locator


	constructor(page: Page, baseURL: string) {
		this.page = page;
		this.localUrl = baseURL;
        this.allTopsLink = "collections/top-frames"
        this.popUpCloseBtn = page.locator("button:has-text('Close form')");
        this.allFramesLink = "collections/all-frames"
        this.accessoriesPageLink = "collections/accessories"
        this.allTopsCTA = page.locator("//h1[normalize-space()='Customize your Pair glasses with tops!']")
        this.allFramesText = page.locator("//span[contains(text(),'All Frames')]")
        this.allFramesCTA = page.locator("//h5[normalize-space()='Choose Your Base Frame']")
        this.accessoriesTopFrameCasesTitle = page.locator("//h5[normalize-space()='Top Frame Cases']")
        this.accessoriesEarHooksTitle = page.locator("//h5[normalize-space()='Ear Hooks']")


        }

	private async navigateTo(locator: Locator) {
		await locator.scrollIntoViewIfNeeded();
		await Promise.all([this.page.waitForNavigation(), locator.click()]);
	}

    async goToHomepage() {
        await this.page.goto(this.localUrl)
    }

    async handlePreviewBar() {
        await handlePreviewBar_util(this.page,this.localUrl)
    }

    async visitAllTopsPage() {
        await this.page.goto(this.localUrl + this.allTopsLink, {waitUntil: 'load'})
    }

    async visitAllFramesPage() {
        await this.page.goto(this.localUrl + this.allFramesLink , {waitUntil: 'load'})
    }

    async visitAccessoriesPage() {
        await this.page.goto(this.localUrl + this.accessoriesPageLink, {waitUntil: 'load'})
    }

    async handlePopUp() {
        // await this.popUpCloseBtn.scrollIntoViewIfNeeded()
		// await this.popUpCloseBtn.click();
	}

}