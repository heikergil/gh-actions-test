import { test, expect, Page } from '@playwright/test'
import AccountsPage from '../../../page/accountsPage'
import Homepage from '../../../page/homePage'

test.describe.serial('User tries to Log In with invalid credentials @accounts', async () => {
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

        test('Users should see notification when invalid credentials are used', async ({ }) => {
            await page.goto(homepage.localUrl)
            await homepage.handlePopUp()
            await expect(accountsPage.logInIconMobile).toBeVisible()
            await accountsPage.goToLogInPage()
            expect.soft(page.url()).toBe(homepage.localUrl + 'account/login')
            await expect(accountsPage.loginTitle).toBeVisible()
            const classes = await accountsPage.singInBtn.getAttribute('class')
            expect.soft(classes).toContain('disabled')
            await accountsPage.emailPlaceholder.fill('invalid@mail.com')
            await accountsPage.passwordPlaceholder.fill('xxxxxx')
            await expect(accountsPage.singInBtn).toBeEnabled()
            await page.waitForTimeout(1000)
            await accountsPage.logIn()
            await expect(accountsPage.invalidLogInNotification).toBeVisible()
        });


        test('User visit recover account tab', async ({ }) => {
            await accountsPage.forgotYourPasswordLink.click()
            await expect(accountsPage.resetYouPasswordTitle).toBeVisible()
        });

        test('Submit button should be disable With invalid input', async ({ }) => {  
            let classes = await accountsPage.recoverPasswordSubmitBtn.getAttribute('class')
            expect.soft(classes).toContain('disabled')
            await accountsPage.recoverEmail.fill('invalidString')
            classes = await accountsPage.recoverPasswordSubmitBtn.getAttribute('class')
            expect.soft(classes).toContain('disabled')
        });

        test('Submit button should be enable when user input valid email', async ({ }) => {  
            await accountsPage.recoverEmail.fill('valid@mail.com')
            await expect(accountsPage.recoverPasswordSubmitBtn).toBeEnabled()
        });

	
});
