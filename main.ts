import express, { Request } from 'express'
import { createServer, ViteDevServer } from 'vite'
import fs from 'fs/promises'

const isProd = process.env.NODE_ENV === 'production'
// const isProd = false //true

// if (isProd) {
// 	process.env.NODE_ENV = 'production'
// } else {
// 	process.env.NODE_ENV = 'development'

// }

let vite: ViteDevServer | null = null

;(async () => {
	const server = express()

	if (!isProd) {
		vite = await createServer({
			server: {middlewareMode: true},
			appType: 'custom'
		})
		server.use(vite.middlewares)
	}

	let index = await fs.readFile('./dist/client/index.html', 'utf-8')

	console.log(process.env)
	if (!isProd) {
		index = await fs.readFile('./index.html', 'utf-8')
	}


	if (isProd) {
		server.use('/assets', express.static('./dist/client/assets'))
	}
	server.use('/', express.static('public'))
	
	let render: ((url: Request) => Promise<string>) | null = null

	if (isProd) {
		/** @ts-expect-error why not m*therfucker */
		const route: any = await import('./server/entry-server.js')
		render = route.render as any
	} else if (vite) {
		const route = await vite.ssrLoadModule('/src/entry-server.tsx')
		render = route.render
	}

	if (!render) {
		throw new Error('Renderer not found :O')
		process.exit(1)
	}
	
	server.use(async (req, res) => {

		const url = req.originalUrl

		let template: string = index
		if (vite) {
			template = await vite.transformIndexHtml(url, index)
		}
		
		if (!render) {
			throw new Error('Renderer not found :O')
		}

		const appHtml = await render(req)

		const html = template.replace('<!--ssr-outlet-->', appHtml)

		return res.status(200).set({'Content-Type': 'text/html'}).end(html)

		// const url = req.path
		// const path = `./pages${url}`
		// const is404 = !(await exists(path))
		// if (is404) {
		// 	return res.status(404).send('404')
		// }
		// console.log(url)
		// const route = await import(path)
		// const props = await route.getServerProps()
		// res.send(`<!DOCTYPE html>` + renderToString(<App><route.default {...props} /></App>))
	})
	
	server.listen(8080, () => {
		console.log('Server Started!')
	})
})()
