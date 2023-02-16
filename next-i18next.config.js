module.exports = {
	i18n: {
    // debug: process.env.NODE_ENV === 'development',
		defaultLocale: 'en',
		locales: ['en', 'fr', 'pt'],
		// localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
    // reloadOnPrerender: process.env.NODE_ENV === 'development',
	},
};
