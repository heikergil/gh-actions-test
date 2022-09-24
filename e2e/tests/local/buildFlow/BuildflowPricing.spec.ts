import { test, expect, Page } from '@playwright/test'
import BuildFlow from '../../../page/buildFlow';

test.describe.serial('Eyeglasses Buildflow pricing @buildflow', async () => {
	let page: Page;
	let buildFlow: BuildFlow;
	let prices: {};

	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
		page = await context.newPage();
		buildFlow = new BuildFlow(page, baseURL);
		prices = buildFlow.prices;
	});

	test.afterAll(async () => await page.close());

	test.beforeEach(async ({}) => {
		await buildFlow.handlePreviewBar()
	})

	test('adding tops should update price correctly @buildflow', async ({ }) => {
		const prices = buildFlow.prices;
		await buildFlow.goToChooseTopFrames();
		await buildFlow.handlePopUp();
		await buildFlow.clickChooseTopFramesBtn();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		const topIndex = await buildFlow.addTop();
		const topPrice = await buildFlow.returnTopPrice(topIndex)
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame'] + topPrice);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.currentCollectionsTopsBtn.nth(topIndex).click();
	
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
	
	});

	test('Customer Should see the correct pricing when selecting Single-Vision', async ({}) => {
		await buildFlow.clickSelectLensTypeBtn();
		await buildFlow.clickSingleVision();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.clickPremiunPlus();
		await buildFlow.clickBlueLightFiltering();
		await buildFlow.clickLightResponsive();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(
			prices['baseFrame'] + prices['premiunPlus'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.clickBackBtn();
	});

	test('Customer Should see the correct pricing when selecting Progressives', async ({}) => {
		await buildFlow.clickProgressive();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(
			prices['baseFrame'] +
				prices['premiunPlus'] +
				prices['blueLightFiltering'] +
				prices['lightResponsive'] +
				prices['progressives']
		);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.clickBackBtn();
	});

	test('Customer Should see the correct pricing when selecting Readers', async ({}) => {
		await buildFlow.clickReaders();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(
			prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.clickBackBtn();
	});

	test('Customer Should see the correct pricing when selecting Non-Prescription', async ({}) => {
		await buildFlow.clickNonPrescription();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(
			prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
	});
});
