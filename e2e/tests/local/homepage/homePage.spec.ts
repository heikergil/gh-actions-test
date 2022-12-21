import { test, expect, Page } from '@playwright/test';
import Homepage from '../../../page/homePage';

test.describe.serial('Home Page tests @homepage @smoke', async () => {
	let page: Page;
	let homepage: Homepage;
	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
		page = await context.newPage();
		homepage = new Homepage(page, baseURL);
		await homepage.handlePreviewBar()
		await page.goto(homepage.localUrl, {waitUntil: 'load'} );
	});


	test.afterAll(async () => await page.close());

	test.beforeEach(async ({}) => {
        await homepage.handlePreviewBar()
    })

	test('Customer should be able to see eyeglasses CTA', async ({}) => {
		await homepage.handlePopUp();
		await expect.soft(homepage.cta).toBeVisible();
		await expect.soft(homepage.shopWomenBtn).toBeVisible();
		await expect.soft(homepage.shopMenBtn).toBeVisible();
		await expect.soft(homepage.shopKidsBtn).toBeVisible();
	});

	test.skip('Customer should be able to see sunglasses CTA', async ({}) => {
		await expect.soft(homepage.sunglassesCTA).toBeVisible();
		await expect.soft(homepage.sunglassesCTAText).toHaveText('Sunglasses');
		await expect.soft(homepage.sunglassesShopWomen).toBeVisible();
		await expect.soft(homepage.sunglassesShopMen).toBeVisible();
		await expect.soft(homepage.sunglassesShopKids).toBeVisible();
	});

	test('Customer Should see an empty cart before adding items', async ({}) => {
		await homepage.clickMyCartIcon();
		expect.soft(await homepage.returnMyCartValue()).toBe(0);
		expect.soft(await homepage.returnMyCartSubtotal()).toBe(0);
		expect.soft(await homepage.returnMyCartItemCount()).toBe(0);
		expect.soft(await homepage.returnCartPaymenstValue()).toBe(0);
	});
});
