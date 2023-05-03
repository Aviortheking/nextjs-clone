import { exists } from './Utils'
import { Request } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import Controller, { ControllerFunction } from './interfaces/Controller'
import ClassConstructor, { isClass } from './interfaces/ClassConstructor'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function findFile(path: string): Promise<string | null> {
	const basePath = `${__dirname}/controllers${path}`
	if (await exists(basePath + '.ts')) {
		return basePath + '.ts'
	}
	if (await exists(basePath + '/index.ts')) {
		return basePath + '/index.ts'
	}

	return null
}

export const render = async (req: Request) => {
	const path = await findFile(req.path)
	console.log(req.path, __dirname, path)
	if (!path) {
		console.log('is404')
		return '404'
	}
	const route: ControllerFunction | ClassConstructor<Controller> = (await import(path)).default
	console.log(route)
	let res: string
	if (isClass(route)) {
		res = await new route().render(req)
	} else {
		res = await route(req)
	}
	// const props = await route.getServerProps()
	return (`<!DOCTYPE html>` + res)
}
