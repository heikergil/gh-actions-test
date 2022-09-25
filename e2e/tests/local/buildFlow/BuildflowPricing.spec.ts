import { test, expect, Page } from '@playwright/test'
import BuildFlow from '../../../page/buildFlow';

test.describe.serial('Eyeglasses Buildflow pricing @buildflow @smoke', async () => {
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
		expect(0).toBe(1)
	});

});
