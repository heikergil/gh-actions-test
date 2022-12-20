import { test, expect, Page } from '@playwright/test'
import BuildFlow from '../../../page/buildFlow';

test.describe.serial('Eyeglasses Buildflow pricing @buildflow', async () => {
	let page: Page;
	let buildFlow: BuildFlow;
	let prices: {};

	test.beforeAll(async ({ browser, baseURL }) => {
		
		const context = await browser.newContext();
		page = await context.newPage();
		// await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
		buildFlow = new BuildFlow(page, baseURL);
		
		prices = buildFlow.prices;
	});

	test.afterAll(async () => await page.close());

	test.beforeEach(async ({}) => {

		await buildFlow.handlePreviewBar()
	})

	test('get to PDP @buildflow', async ({ }) => {
		await buildFlow.goToChooseTopFrames();
		await buildFlow.handlePopUp();
		const checkOrder = await buildFlow.isBfReorder(page)
		if (!checkOrder || checkOrder === 'undefiend') {test.skip()}
	});


	test('Customer Should see the correct pricing when selecting Single-Vision', async ({}) => {
		const checkOrder = await buildFlow.isBfReorder(page)
		if (!checkOrder || checkOrder === 'undefiend') {test.skip()}
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
		const checkOrder = await buildFlow.isBfReorder(page)
		if (!checkOrder || checkOrder === 'undefiend') {test.skip()}
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
		const checkOrder = await buildFlow.isBfReorder(page)
		if (!checkOrder || checkOrder === 'undefiend') {test.skip()}
		await buildFlow.clickReaders();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(
			prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.clickBackBtn();
	});

	test('Customer Should see the correct pricing when selecting Non-Prescription', async ({}) => {
		const checkOrder = await buildFlow.isBfReorder(page)
		if (!checkOrder || checkOrder === 'undefiend') {test.skip()}
		await buildFlow.clickNonPrescription();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(
			prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
	});


	test('adding tops should update price correctly', async ({ }) => {
		const checkOrder = await buildFlow.isBfReorder(page)
		if (!checkOrder || checkOrder === 'undefiend') {test.skip()}
		await buildFlow.clickChooseTopFramesBtn();
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		const topIndex = await buildFlow.addTop();
		const topPrice = await buildFlow.returnTopPrice(topIndex)
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive'] + topPrice);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
		await buildFlow.currentCollectionsTopsBtn.nth(topIndex).click();
	
		expect(await buildFlow.returnBuildFlowSubtotalValue()).toBe(prices['baseFrame'] + prices['blueLightFiltering'] + prices['lightResponsive']);
		expect(await buildFlow.returnBuildFlowPaymentsValue()).toBe((await buildFlow.returnBuildFlowSubtotalValue()) / 4);
	
	});
});
