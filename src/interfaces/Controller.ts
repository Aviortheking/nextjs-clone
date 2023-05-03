import { Request } from 'express'
import React, { ClassType, Component, createElement } from 'react'
import { renderToString } from 'react-dom/server'



export default abstract class Controller {
	// public renderReact<T extends Component>(cls: T) {
	// 	return renderToString(<cls />)
	// }

	abstract render(req: Request): Promise<string>
}

export type ControllerFunction = (req: Request) => Promise<string>