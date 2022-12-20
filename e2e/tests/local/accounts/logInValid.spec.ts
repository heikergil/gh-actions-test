import { test, expect, Page} from '@playwright/test'
import AccountsPage from '../../../page/accountsPage'
import Homepage from '../../../page/homePage'


test.describe.serial('User logs in with empty account @accounts', async () => {
	let page: Page;
	let accountsPage: AccountsPage;
    let homepage: Homepage;
    let empty_test_account_email
    let empty_test_account_pass
	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
        page = await context.newPage();
        // await context.addCookies([{name:'__kla_id',value:'',path:'/', domain:'pair-eyewear.myshopify.com'}])
        accountsPage = new AccountsPage(page, baseURL)
        homepage = new Homepage(page, baseURL)
        empty_test_account_email = process.env.EMPTY_TEST_ACCOUNT_EMAIL;
        empty_test_account_pass = process.env.EMPTY_TEST_ACCOUNT_PASS;
	});

	test.afterAll(async () => await page.close());

    test.beforeEach(async ({}) => {
        await accountsPage.handlePreviewBar()
    })

    test('User visit login form from the homepage', async ({ }) => {
        await page.goto(homepage.localUrl)
        await homepage.handlePopUp()
        await expect(accountsPage.logInIconMobile).toBeVisible()
        await accountsPage.goToLogInPage()
        expect.soft(page.url()).toBe(homepage.localUrl + 'account/login')       
	});

    test('User logs in with valid credentials', async ({ }) => {
        const classes = await accountsPage.singInBtn.getAttribute('class')
        expect.soft(classes).toContain('disabled')
        await accountsPage.emailPlaceholder.fill(empty_test_account_email)
        await accountsPage.passwordPlaceholder.fill(empty_test_account_pass)
        await expect(accountsPage.singInBtn).toBeEnabled()
        await accountsPage.logIn()
        expect.soft(page.url()).toBe(homepage.localUrl)
        await accountsPage.goToAccountPage()
        expect.soft(page.url()).toBe(homepage.localUrl + 'account?link=collections')
	});


    test('User visit My Collection tab', async ({ }) => {
        await expect(accountsPage.greetings).toBeVisible()
        await expect(accountsPage.shopGlassesBtn).toBeVisible()
        await expect(accountsPage.noOrdersNotification).toBeVisible()
	});

    test('User visit My Rewards tab', async ({ }) => {
        await accountsPage.myRewardsTab.click()
        await expect.soft(accountsPage.greetings).toBeVisible()
        await expect.soft(accountsPage.myRewardsWidget).toBeVisible()
        await expect.soft(accountsPage.myRewardsWidget).not.toBeEmpty()
        await expect.soft(accountsPage.campaingWidget).toBeVisible()
        await expect.soft(accountsPage.campaingWidget).not.toBeEmpty()
        await expect.soft(accountsPage.vipTiersWidget).toBeVisible()
        await expect.soft(accountsPage.vipTiersWidget).not.toBeEmpty()
        await expect.soft(accountsPage.referralWidgetr).toBeVisible()
        await expect.soft(accountsPage.referralWidgetr).not.toBeEmpty()
	});

    test('User logs out', async ({ }) => {
        await accountsPage.logOut()
        expect.soft(page.url()).toBe(homepage.localUrl)  
	});


	
});

    
	