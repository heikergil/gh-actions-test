import { test, expect, Page } from '@playwright/test';
import BuildFlow from '../../../page/buildFlow';
import CartPage from '../../../page/cartPage';

test.describe.serial('sunglasses @buildflow @buildflow', async () => {
	let page: Page;
	let buildFlow: BuildFlow;
	let cartPage: CartPage;
	let prices: {};

	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
		page = await context.newPage();
		// await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
		buildFlow = new BuildFlow(page, baseURL);
		cartPage = new CartPage(page, baseURL);
		prices = buildFlow.prices;
	});

	test.afterAll(async () => await page.close());

	test.beforeEach(async ({}) => {
		await buildFlow.handlePreviewBar()
	})

	test('Customer Should be able to complete the Sunglasses buildflow', async ({}) => {
		await buildFlow.goToSunLensShopMen();
		await buildFlow.handlePopUp();
		const productTitle = await buildFlow.returnFrameTitle();
		await buildFlow.selectGreenReflective('The ' + productTitle);
		await buildFlow.navigateToSunLensPDP(productTitle);
		const checkOrder = await buildFlow.isBfReorder(page)
		if (checkOrder) {
			await buildFlow.clickSelectLensTypeBtn();
			await buildFlow.clickNonPrescription();
			await buildFlow.clickChooseTopFramesBtn();
			await buildFlow.clickAddToCartBtn();
			await expect.soft(page.locator('text=Sun Lens - Green Reflective Lens')).toBeVisible();
			expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(75);
			expect.soft(await cartPage.returnCartPageItemCount()).toBe(2);
			expect.soft(await cartPage.returnCartPageSubtotal()).toBe(75);
			await expect.soft(await cartPage.returnFrameTitleLocator('The ' + productTitle)).toBeVisible();
		} else {
			await buildFlow.clickChooseTopFramesBtn();
			await buildFlow.clickSelectLensTypeBtn();
			await buildFlow.clickNonPrescription();
			await buildFlow.clickAddToCartBtn();
			await expect.soft(page.locator('text=Sun Lens - Green Reflective Lens')).toBeVisible();
			expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(75);
			expect.soft(await cartPage.returnCartPageItemCount()).toBe(2);
			expect.soft(await cartPage.returnCartPageSubtotal()).toBe(75);
			await expect.soft(await cartPage.returnFrameTitleLocator('The ' + productTitle)).toBeVisible();
		}
		
	});
});


