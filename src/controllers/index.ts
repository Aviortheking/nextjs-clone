import TCGdex, { Card } from '@tcgdex/sdk'
import Controller from '../interfaces/Controller'
import Path from '../pages/path'

export default class Index extends Controller {
	public async render(req: any): Promise<string> {
		const tcgdex = new TCGdex()
		return this.renderReact(new Path({
			card: await tcgdex.fetchCard('bw1-1') as Card
		}))
	}
}