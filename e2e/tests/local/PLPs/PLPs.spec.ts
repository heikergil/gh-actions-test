import { test, expect, Page} from '@playwright/test';
import PLPpage from '../../../page/PLPpage'


test.describe.serial('PLPs and PDPs @plps', async () => {
	let page: Page;
    let plpPage: PLPpage

	test.beforeAll(async ({ baseURL, browser }) => {
		const context = await browser.newContext();
        page = await context.newPage();
        // await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
        plpPage = new PLPpage(page, baseURL)
	});

	test.afterAll(async () => await page.close());

    test.beforeEach(async ({}) => {
        test.slow();
        await plpPage.handlePreviewBar()
    })

    test('User should be able to  visit all tops Page', async ({ }) => {
       await plpPage.visitAllTopsPage()
       await plpPage.handlePopUp()
       await expect(plpPage.allTopsCTA).toBeVisible()
    });  
    
    test('User should be able to visit all frames Page', async ({ }) => {
        await plpPage.visitAllFramesPage()
        await expect(plpPage.allFramesCTA).toBeVisible()
    });

    test('User should be able to visit Accessories Page', async ({ }) => {
        await plpPage.visitAccessoriesPage()
        await expect(plpPage.accessoriesEarHooksTitle).toBeVisible()
        await expect(plpPage.accessoriesTopFrameCasesTitle).toBeVisible()
    });
});