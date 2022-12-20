import {Page} from '@playwright/test'
const preview_theme_id = process.env.THEME_ID

export default async function handlePreviewBar_util(page: Page, localUrl: string) {

    if( typeof(process.env.PROD) === 'undefined') {
        page.route(localUrl, route => {
            const requestURL = route.request().url();
            if (route.request().resourceType() === 'document' && requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `&preview_theme_id=${preview_theme_id}&pb=0&pu=0`});
            } else if (route.request().resourceType() === 'document' && !requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `?preview_theme_id=${preview_theme_id}&pb=0&pu=0` });
            }
        });

        page.route(localUrl + 'products/*', route => {
            const requestURL = route.request().url();
            if (
                requestURL === localUrl + 'products/pair-care.js' ||
                requestURL === localUrl + 'products/blue-light-filtering.js' || requestURL === localUrl + 'products/premium-ultra-thin.js' 
            ) {
                return route.continue();
            }
    
            if (route.request().resourceType() === 'document' && requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `&preview_theme_id=${preview_theme_id}&pb=0&pu=0`});
            } else if (route.request().resourceType() === 'document' && !requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `?preview_theme_id=${preview_theme_id}&pb=0&pu=0` });
            }
        });
    
        page.route(localUrl + 'preview_bar/*', route => {
            const requestURL = route.request().url();
            if (route.request().resourceType() === 'document' && requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `&preview_theme_id=${preview_theme_id}&pb=0&pu=0` });
            } else if (route.request().resourceType() === 'document' && !requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `?preview_theme_id=${preview_theme_id}&pb=0&pu=0` });
            } else {route.continue()}
        });

        page.route(localUrl + 'collections/*', route => {
            const requestURL = route.request().url();
            if (route.request().resourceType() === 'image') {
                return route.abort()
            } 
            if (route.request().resourceType() === 'document' && requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `&preview_theme_id=${preview_theme_id}&pb=0&pu=0` });
            } else if (route.request().resourceType() === 'document' && !requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `?preview_theme_id=${preview_theme_id}&pb=0&pu=0&pu=0` });
            }
        });

        page.route(localUrl + 'account/login', route => {
            const requestURL = route.request().url();
            if (route.request().resourceType() === 'document' && requestURL.includes('?') && route.request().method() === 'GET') {
                return route.continue({ url: route.request().url() + `&preview_theme_id=${preview_theme_id}` });
            } else if (route.request().resourceType() === 'document' && !requestURL.includes('?') && route.request().method() === 'GET' ) {
                return route.continue({ url: route.request().url() + `?preview_theme_id=${preview_theme_id}` });
            } else {
                return route.continue()
            } 
        });

        page.route(localUrl + 'account', route => {
            const requestURL = route.request().url();
            console.log('account', requestURL, route.request().method(), route.request().resourceType()  )
            if (route.request().resourceType() === 'document' && requestURL.includes('?') && route.request().method() === 'GET') {
                return route.continue({ url: route.request().url() + `&preview_theme_id=${preview_theme_id}` });
            } else if (route.request().resourceType() === 'document' && !requestURL.includes('?')) {
                return route.continue({ url: route.request().url() + `?preview_theme_id=${preview_theme_id}` });
            }
        });
}
}