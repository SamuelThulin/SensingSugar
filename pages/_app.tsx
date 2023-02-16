import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import theme from '../src/theme';
import createEmotionCache from '../src/theme/createEmotionCache';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
// import nextI18NextConfig from '../next-i18next.config.js'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme(true)}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
};

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(MyApp /*, nextI18NextConfig */);
