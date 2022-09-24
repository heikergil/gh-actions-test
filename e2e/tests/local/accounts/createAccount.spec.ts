import { test, expect, Page } from '@playwright/test'
import AccountsPage from '../../../page/accountsPage'
import Homepage from '../../../page/homePage'


test.describe.serial('Create account flow @accounts', async () => {
	let page: Page;
	let accountsPage: AccountsPage;
    let homepage: Homepage;

	test.beforeAll(async ({ browser, baseURL }) => {
		const context = await browser.newContext();
        page = await context.newPage();
        accountsPage = new AccountsPage(page, baseURL)
        homepage = new Homepage(page, baseURL)
	});

	test.afterAll(async () => await page.close());

    test.beforeEach(async ({}) => {
        await accountsPage.handlePreviewBar()
    })

    test('User visit create account page from homepage ', async ({ }) => {
        await page.goto(homepage.localUrl)
        await homepage.handlePopUp()
        await expect(accountsPage.logInIconMobile).toBeVisible()
        await accountsPage.goToLogInPage()
        await accountsPage.goToCreateAccount()
	});

    test('Create account submit button should be disable', async ({ }) => {       
        let classes = await accountsPage.createAccountSubmitBtn.getAttribute('class')
        expect.soft(classes).toContain('disabled')
        await accountsPage.emailInput.fill('invalidString')
        classes = await accountsPage.createAccountSubmitBtn.getAttribute('class')
        expect.soft(classes).toContain('disabled')
	});

    test('Submit button should be enable when user input valid data', async ({ }) => {       
        await accountsPage.firstNameInput.fill('firstName')
        await accountsPage.lastNameInput.fill('lastName')
        await accountsPage.emailInput.fill('valid@mail.com')
        await accountsPage.passwordInput.fill('validPassword')
        await expect(accountsPage.createAccountSubmitBtn).toBeEnabled()

	});
	
});
