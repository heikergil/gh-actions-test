import { test, expect, Page} from '@playwright/test';
import AccountsPage from '../../../page/accountsPage'
import Homepage from '../../../page/homePage'


test.describe.serial('User follow account page CTAs @accounts', async () => {
	let page: Page;
	let accountsPage: AccountsPage;
    let homepage: Homepage;
    let empty_test_account_email
    let empty_test_account_pass

	test.beforeAll(async ({ baseURL, browser }) => {
		const context = await browser.newContext();
        // await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
        page = await context.newPage();
        accountsPage = new AccountsPage(page, baseURL)
        homepage = new Homepage(page, baseURL)
        empty_test_account_email =  process.env.EMPTY_TEST_ACCOUNT_EMAIL 
        empty_test_account_pass = process.env.EMPTY_TEST_ACCOUNT_PASS 
	});

	test.afterAll(async () => await page.close());

    test.beforeEach(async ({}) => {
        await accountsPage.handlePreviewBar()
    })

    test('User should be able to  visit all tops from account page', async ({ }) => {
        await accountsPage.goToHomepage()
        await accountsPage.handlePopUp()
        await accountsPage.goToLogInForm()
        expect.soft(page.url()).toBe(homepage.localUrl + 'account/login')    
        await accountsPage.emailPlaceholder.fill(empty_test_account_email)
        await accountsPage.passwordPlaceholder.fill(empty_test_account_pass)
        await expect(accountsPage.singInBtn).toBeEnabled()
        await accountsPage.logIn()
        expect.soft(page.url()).toBe(homepage.localUrl)
        await accountsPage.goToAccountPage()
        expect.soft(page.url()).toBe(homepage.localUrl + 'account?link=collections')
        await accountsPage.visitAllTopsFromAccountPage()
        await expect(accountsPage.allTopsCTA).toBeVisible()
        await expect(accountsPage.ourCollectionCTA).toBeVisible()
    });  
    
    test('User should be able to visit all frames from account page', async ({ }) => {
        await accountsPage.openAccountMenu()
        await accountsPage.clickMyCollectionsLink()
        expect.soft(page.url()).toBe(homepage.localUrl + 'account?link=collections')
        await accountsPage.myCollectionTab.click()
        expect(await accountsPage.shopGlassesBtn.getAttribute('href')).toBe("/collections/all-frames")
    });
});