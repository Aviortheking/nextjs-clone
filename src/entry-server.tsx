import { exists } from './Utils'
import { renderToString } from 'react-dom/server'
import App from './pages/_app'
import React from 'react'
import { Request } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const render = async (req: Request) => {
	const path = `${__dirname}/pages${req.path}`
	console.log(req.path, __dirname)
	const is404 = !(await exists(path))
	if (is404) {
		return '404'
	}
	const route = await import(`${__dirname}/pages${req.path}.tsx`)
	const props = await route.getServerProps()
	return (`<!DOCTYPE html>` + renderToString(<App><route.default {...props} /></App>))
}
