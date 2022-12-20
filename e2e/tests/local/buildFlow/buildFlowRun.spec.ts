import { test, expect, Page } from '@playwright/test'
import CartPage from '../../../page/cartPage';
import BuildFlow from '../../../page/buildFlow';


test.describe.serial('Eyeglasses Buildflow @buildflow @smoke', async () => {
	let page: Page;
	let cartPage: CartPage
	let buildFlow: BuildFlow;

	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
		// await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
		page = await context.newPage();
		cartPage = new CartPage(page, baseURL);
		buildFlow = new BuildFlow(page, baseURL);
	});

	test.afterAll(async () => await page.close());

	test.beforeEach(async ({}) => {
		test.slow();
		await buildFlow.handlePreviewBar()
	})

	test('Customer Should be able to complete the build flow', async ({ }) => {
	await buildFlow.goToShopWomen();
	await buildFlow.handlePopUp();
	const productTitle = await buildFlow.returnFrameTitle();
	await buildFlow.goToDesingYourFrame(productTitle);
	const checkOrder = await buildFlow.isBfReorder(page)
	if (checkOrder) {
		await buildFlow.clickSelectLensTypeBtn();
		await buildFlow.clickSingleVision();
		await buildFlow.clickChooseTopFramesBtn();
		await buildFlow.clickAddToCartBtn();
		expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(60);
		expect.soft(await cartPage.returnCartPageItemCount()).toBe(1);
		expect.soft(await cartPage.returnCartPageSubtotal()).toBe(60);
		await expect.soft(await cartPage.returnFrameTitleLocator('The ' + productTitle)).toBeVisible();
	} else {
	await buildFlow.clickChooseTopFramesBtn();
	await buildFlow.clickSelectLensTypeBtn();
	await buildFlow.clickSingleVision();
	await buildFlow.clickAddToCartBtn();
	expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(60);
	expect.soft(await cartPage.returnCartPageItemCount()).toBe(1);
	expect.soft(await cartPage.returnCartPageSubtotal()).toBe(60);
	await expect.soft(await cartPage.returnFrameTitleLocator('The ' + productTitle)).toBeVisible();
	}

});

})
