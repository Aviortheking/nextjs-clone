import React from 'react'
import App from './pages/_app'
import Path from './pages/path'
import { hydrateRoot } from 'react-dom/client'
import type { CommProps } from './interfaces'

(async () => {
	const __PROPS: CommProps = JSON.parse((window as any).__PROPS.innerText)
	console.log(__PROPS)
	hydrateRoot(document.getElementById('app') as HTMLDivElement, <App component={Path} path={__PROPS.path} pageProps={__PROPS.pageProps} />)
})()