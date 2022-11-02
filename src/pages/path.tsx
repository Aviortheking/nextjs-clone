import React from 'react'
import TCGdex, { Card } from '@tcgdex/sdk'

export default class Component extends React.Component<{card: Card}> {

	public render = () => (
		<div>{this.props.card.name}</div>
	)
}


export const getServerProps = async () => {
	const tcgdex = new TCGdex()
	return {
		card: await tcgdex.fetchCard('bw1-1')
	}
}