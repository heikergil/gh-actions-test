import { Locator, Page } from '@playwright/test';
import handlePreviewBar_util from './utils/handlePreviewBar';

export default class AccountsPage {
	readonly page: Page;
	readonly localUrl: string;
	readonly popUpCloseBtn: Locator;
    readonly loginURL: string;
    readonly logInIconMobile: Locator
    readonly accountIconMobile: Locator
    readonly loginTitle: Locator
    readonly emailPlaceholder: Locator
    readonly passwordPlaceholder: Locator
    readonly singInBtn: Locator
    readonly createAccountBtn: Locator
    readonly invalidLogInNotification: Locator
    readonly exploreAllTopsBtn: Locator
    readonly greetings: Locator
    readonly logOutLink: Locator
    readonly shopGlassesBtn: Locator
    readonly noOrdersNotification: Locator
    readonly forgotYourPasswordLink: Locator
    readonly resetYouPasswordTitle: Locator
    readonly recoverPasswordSubmitBtn: Locator
    readonly recoverEmail: Locator
    readonly goBackBtn: Locator
    readonly noAccountFoundNotification: Locator
    readonly createAccountTitle: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly createAccountSubmitBtn: Locator
    readonly myRewardsTab: Locator
    readonly greetingsText: Locator
    readonly allTopsCTA: Locator
    readonly ourCollectionCTA: Locator
    readonly allFramesText: Locator
    readonly allFramesCTA: Locator
    readonly myBaseFramesText: Locator
    readonly myTopFramesText: Locator
    readonly theWandaImg: Locator
    readonly theRubySparkles: Locator
    readonly myRewardsWidget: Locator
    readonly campaingWidget: Locator
    readonly vipTiersWidget: Locator
    readonly referralWidgetr: Locator
    readonly linkOnFooter: Locator
    readonly myCollectionTab: Locator
    readonly myFavorites: Locator
    readonly myCollections: Locator
    readonly myRewards: Locator
    readonly linkToMyCollections: Locator




	constructor(page: Page, baseURL: string) {
		this.page = page;
		this.localUrl = baseURL;
        this.loginURL = 'account/login';
        this.logInIconMobile = page.locator("//a[@data-test='login']")
        this.loginTitle = page.locator("//h1[normalize-space()='Log In']")
        this.singInBtn = page.locator("//button[normalize-space()='Sign In']")
		this.popUpCloseBtn = page.locator("button:has-text('Close form')");
        this.emailPlaceholder = page.locator("//input[@id='CustomerEmail']")
        this.passwordPlaceholder = page.locator("//input[@placeholder='Password']")
        this.createAccountBtn = page.locator("//button[normalize-space()='Create account']")
        this.invalidLogInNotification = page.locator("//li[normalize-space()='Incorrect email or password.']")
        this.exploreAllTopsBtn = page.locator("a:has-text('Explore All Tops')")
        this.greetings = page.locator("h1:has-text('Welcome back')")
        this.logOutLink = page.locator("a:has-text('Log out')")
        this.shopGlassesBtn = page.locator("a:has-text('Shop Glasses')")
        this.noOrdersNotification = page.locator('h2:has-text("You haven\'t placed any orders yet!")')
        this.forgotYourPasswordLink = page.locator("//a[normalize-space()='Forgot your password?']")
        this.resetYouPasswordTitle = page.locator("//h2[normalize-space()='Reset your password']")
        this.recoverPasswordSubmitBtn = page.locator("//div[@id='RecoverPasswordForm']//button[normalize-space()='Submit']")
        this.recoverEmail = page.locator("//div[@id='RecoverPasswordForm']//input[@placeholder='Email']")
        this.goBackBtn = page.locator("//button[normalize-space()='Go back']")
        this.noAccountFoundNotification = page.locator("//li[normalize-space()='No account found with that email.']")
        this.createAccountTitle = page.locator("//h1[normalize-space()='Create Account']")
        this.emailInput = page.locator("//input[@placeholder='Email']")
        this.createAccountSubmitBtn = page.locator("//button[normalize-space()='Create']")
        this.firstNameInput = page.locator("//form[@method='post']//fieldset//div//div//input[@placeholder='First Name']")
        this.lastNameInput = page.locator("//form[@method='post']//fieldset//div//div//input[@placeholder='Last Name']")
        this.passwordInput = page.locator("//input[@placeholder='Password']")
        this.myRewardsTab = page.locator("//div[normalize-space()='My Rewards']")
        this.greetings = page.locator("h1:has-text('Welcome back, ')")
        this.allTopsCTA = page.locator("//h1[normalize-space()='Customize your Pair glasses with tops!']")
        this.ourCollectionCTA = page.locator("//h3[normalize-space()='Browse Our Collections']")
        this.allFramesText = page.locator("//span[contains(text(),'All Frames')]")
        this.allFramesCTA = page.locator("//h5[normalize-space()='Choose Your Base Frame']")
        this.myBaseFramesText = page.locator("//h2[normalize-space()='My Base Frames']")
        this.myTopFramesText = page.locator("//h2[normalize-space()='My Top Frames']")
        this.theWandaImg = page.locator("//img[@alt='The Wanda in Pink Clear']")
        this.theRubySparkles = page.locator("//img[@alt='The Ruby Sparkle Top Frame for The Larkin']")
        this.myRewardsWidget = page.locator("div[class*='yotpo-widget-my-rewards-widget']")
        this.campaingWidget = page.locator("div[class*='yotpo-widget-campaign-widget-container']")
        this.vipTiersWidget = page.locator("div[class*='yotpo-vip-tiers-widget']")
        this.referralWidgetr = page.locator("div[class*='yotpo-widget-referral-widget']")
        this.linkOnFooter = page.locator("//h3[normalize-space()='About Us']")
        this.myCollectionTab = page.locator("//div[normalize-space()='My Collection']")
        this.accountIconMobile = page.locator("div[data-test='account']")
        this.linkToMyCollections = page.locator("//span[normalize-space()='My Collections']")

        }

	private async navigateTo(locator: Locator) {
		await locator.scrollIntoViewIfNeeded();
		await Promise.all([this.page.waitForNavigation(), locator.click()]);
	}

    async goToHomepage() {
        await this.page.goto(this.localUrl)
    }


    async openAccountMenu() {
        await this.accountIconMobile.hover()
    }

    async clickMyCollectionsLink() {
        await this.navigateTo(this.linkToMyCollections)
    }

    async handlePreviewBar() {
        await handlePreviewBar_util(this.page,this.localUrl)
    }


    async goToLogInPage() {
        await this.navigateTo(this.logInIconMobile)
    }

    async goToAccountPage() {
        await this.openAccountMenu()
        await this.navigateTo(this.myCollections)
    }

    async visitAllTopsFromAccountPage() {
        await this.navigateTo(this.exploreAllTopsBtn)
    }

    async visitAllFramesFromAccountPage() {
        await this.navigateTo(this.shopGlassesBtn)
    }

    async logOut() {
        await this.openAccountMenu()
        await this.navigateTo(this.logOutLink)
    }

    async goToLogInForm() {
        await this.navigateTo(this.logInIconMobile)
    }

    async logIn() {
        await this.linkOnFooter.scrollIntoViewIfNeeded()
        await this.navigateTo(this.singInBtn)
    }

	async handlePopUp() {
         await this.popUpCloseBtn.scrollIntoViewIfNeeded()
		await this.popUpCloseBtn.click();
	}

    async goToCreateAccount() {
        await this.navigateTo(this.createAccountBtn)
    }



}