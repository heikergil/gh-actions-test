import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
require('dotenv').config();

const config: PlaywrightTestConfig = {
	testDir: './e2e/tests',
	/* Maximum time one test can run for. */
	timeout: 90 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 8000,
	},
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 4,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['list'], ['html']],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	reportSlowTests: {
		max: 0,
		threshold: 120 * 1000
	},
	//* repeatEach: 2, *//
	use: {
		
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout:70000,
		/* Base URL to use in actions like `await page.goto('/')`. */

		 baseURL: process.env.PROD ? 'https://paireyewear.com/': 'https://pair-eyewear.myshopify.com/',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',
		screenshot: 'on',
	},

	/* Configure projects for major browsers */
	projects: [
		// {
		//   name: 'chromium',
		//   use: {
		//     ...devices['Desktop Chrome'],
		//     headless : true
		//   },
		// },

		// {
		//   name: 'webkit',
		//   use: {
		//     ...devices['Desktop Safari'],
		//     headless : false
		//   },
		// },

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Galaxy S8'],
					  deviceScaleFactor: 2,
						isMobile: true,
						hasTouch: true,
						headless: true
			},
		 },
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone XR'],
				userAgent:
				'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/15.4 Mobile/15A372 Safari/604.1',
			  browserName: 'webkit',
			  headless: true,
			  viewport: {
				width: 375,
				height: 667,
			  },
			  deviceScaleFactor: 2,
			  isMobile: true,
			  hasTouch: true,
			  defaultBrowserType: 'webkit',
			},
		 },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',
};

export default config;