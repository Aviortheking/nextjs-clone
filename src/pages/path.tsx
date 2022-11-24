import React from 'react'
import TCGdex from '@tcgdex/sdk'
import type { Card } from '@tcgdex/sdk'

export default class Component extends React.Component<{card: Card}> {

	public componentDidMount(): void {
		console.log('YaY')
	}

	public render = () => (
		<div>{this.props.card.name}</div>
	)
}

export const getServerProps = async () => {
	const tcgdex = new TCGdex.default()
	return {
		card: await tcgdex.fetchCard('bw1-1')
	}
}