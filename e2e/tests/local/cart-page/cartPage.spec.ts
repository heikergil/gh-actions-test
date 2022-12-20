import { test, expect, Page } from '@playwright/test';
import CartPage from '../../../page/cartPage';
import BuildFlow from '../../../page/buildFlow';

test.describe.serial('Cart Page tests @cart', async () => {
	let page: Page;
	let buildFlow: BuildFlow;
	let cartPage: CartPage;
	let productTitle: string
	test.beforeAll(async ({ browser,baseURL }) => {
		const context = await browser.newContext();
		await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
		page = await context.newPage();
		buildFlow = new BuildFlow(page, baseURL);
		cartPage = new CartPage(page, baseURL);
		
	});

	test.beforeEach(async ({}) => {
		test.slow();
        await cartPage.handlePreviewBar()
    })

	test.afterAll(async () => {
		await page.close()
	});

	test('Customer should see selected items on the cart page', async ({}) => {
		await buildFlow.goToShopWomen();
		await buildFlow.handlePopUp();
		productTitle = await buildFlow.returnFrameTitle();
		await buildFlow.goToDesingYourFrame(productTitle);

		const checkOrder = await buildFlow.isBfReorder(page)
		if (checkOrder) {
			await buildFlow.clickSelectLensTypeBtn();
			await buildFlow.clickSingleVision();
			await buildFlow.clickPremiunPlus();
			await buildFlow.clickBlueLightFiltering();
			await buildFlow.clickLightResponsive();
			await buildFlow.clickChooseTopFramesBtn();
			const topIndex = await buildFlow.addTop();
			const topTitle = await buildFlow.returnTopTitle(topIndex)
			const topPrice = await buildFlow.returnTopPrice(topIndex)
			await buildFlow.clickAddToCartBtn();
			await expect(cartPage.itemsRoot).not.toBeEmpty();
			expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(317 + topPrice);
			expect.soft(await cartPage.returnCartPageItemCount()).toBe(5);
			expect.soft(await cartPage.returnCartPageSubtotal()).toBe(317 + topPrice);
			await expect.soft(await cartPage.returnFrameTitleLocator('The ' + productTitle)).toBeVisible();
			await expect.soft(await cartPage.returnFrameTitleLocator(topTitle)).toBeVisible();
			await expect.soft(cartPage.cartPageLightResponsive).toBeVisible();
			await expect.soft(cartPage.cartPageBlueLightFiltering).toBeVisible();
			await expect.soft(cartPage.cartPagePremiumPlus).toBeVisible();
		} else {
			await buildFlow.clickChooseTopFramesBtn();
			const topIndex = await buildFlow.addTop();
			const topTitle = await buildFlow.returnTopTitle(topIndex)
			const topPrice = await buildFlow.returnTopPrice(topIndex)
			await buildFlow.clickSelectLensTypeBtn();
			await buildFlow.clickSingleVision();
			await buildFlow.clickPremiunPlus();
			await buildFlow.clickBlueLightFiltering();
			await buildFlow.clickLightResponsive();
			await buildFlow.clickAddToCartBtn();
			await expect(cartPage.itemsRoot).not.toBeEmpty();
			expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(317 + topPrice);
			expect.soft(await cartPage.returnCartPageItemCount()).toBe(5);
			expect.soft(await cartPage.returnCartPageSubtotal()).toBe(317 + topPrice);
			await expect.soft(await cartPage.returnFrameTitleLocator('The ' + productTitle)).toBeVisible();
			await expect.soft(await cartPage.returnFrameTitleLocator(topTitle)).toBeVisible();
			await expect.soft(cartPage.cartPageLightResponsive).toBeVisible();
			await expect.soft(cartPage.cartPageBlueLightFiltering).toBeVisible();
			await expect.soft(cartPage.cartPagePremiumPlus).toBeVisible();
		}


		
	});

	test('Deleting a Base Frame should also delete its attached tops and lenses', async ({}) => {
		await (await cartPage.returnBaseFrameRemoveBtn(productTitle)).click();
		await expect(cartPage.itemsRoot).toBeEmpty();
		expect.soft(await cartPage.returnCartPageTotalPrice()).toBe(0);
		expect.soft(await cartPage.returnCartPageItemCount()).toBe(0);
		expect.soft(await cartPage.returnCartPageSubtotal()).toBe(0);
	});
});
