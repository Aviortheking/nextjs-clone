import { exists } from './Utils'
import { renderToString } from 'react-dom/server'
import App from './pages/_app'
import React from 'react'
import { Request } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ext = process.env.NODE_ENV === 'production' ? '.js' : '.tsx'

export const render = async (req: Request) => {
	const path = `${__dirname}/pages${req.path}${ext}`
	const is404 = !(await exists(path))
	console.log(req.path, path, is404)
	if (is404) {
		return '404'
	}
	/* @vite-ignore */
	const route = await import(path)
	const props = await route.getServerProps()
	return renderToString(<App component={route.default} path={req.path} pageProps={props} />)
}
