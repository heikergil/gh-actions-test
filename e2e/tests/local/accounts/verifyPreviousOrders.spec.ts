import { test, expect, Page} from '@playwright/test'
import AccountsPage from '../../../page/accountsPage'
import Homepage from '../../../page/homePage'


test.describe.serial('User logs in having previous orders  @accounts', async () => {
	let page: Page;
	let accountsPage: AccountsPage;
    let homepage: Homepage;
    let test_account_email
    let test_account_pass


	test.beforeAll(async ({ browser,baseURL }) => {
		const context = await browser.newContext();
        page = await context.newPage();
        // await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
        accountsPage = new AccountsPage(page, baseURL)
        homepage = new Homepage(page, baseURL)
        test_account_email = process.env.TEST_ACCOUNT_EMAIL;
        test_account_pass =  process.env.TEST_ACCOUNT_PASS;
	});

	test.afterAll(async () => await page.close());


    test.beforeEach(async ({}) => {
        await accountsPage.handlePreviewBar()
    })
    
    test('Empty state should not be present', async ({ }) => {
       await page.goto(homepage.localUrl)
        await homepage.handlePopUp()
        await expect(accountsPage.logInIconMobile).toBeVisible()
        await accountsPage.goToLogInPage()
        await accountsPage.emailPlaceholder.fill(test_account_email)
        await accountsPage.passwordPlaceholder.fill(test_account_pass)
        await expect(accountsPage.singInBtn).toBeEnabled()
        await accountsPage.logIn()
        expect.soft(page.url()).toBe(homepage.localUrl)
        await accountsPage.goToAccountPage()
        expect.soft(page.url()).toBe(homepage.localUrl + 'account?link=collections')
        await expect(accountsPage.greetings).toBeVisible()
        await expect(accountsPage.noOrdersNotification).not.toBeVisible()
	});

    test('Purchased Base Frames should be present under My base frame', async ({ }) => {
        await expect(accountsPage.myBaseFramesText).toBeVisible()
        await expect(accountsPage.theWandaImg).toBeVisible()
	});

    test('Purchased Top Frames should be present under My Tops', async ({ }) => {
        await expect(accountsPage.myTopFramesText).toBeVisible()
        await expect(accountsPage.theRubySparkles).toBeVisible()
	});

   
    test('User logs out', async ({ }) => {
        await accountsPage.logOut()
        expect.soft(page.url()).toBe(homepage.localUrl)  
	});


	
});
