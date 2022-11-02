import React from 'react'
import TCGdex, { Card, Set } from '@tcgdex/sdk'

export default class Component extends React.Component<{card: Set}> {

	public render = () => (
		<div onClick={() => console.log('YOLO')}>{this.props.card.name}</div>
	)
}


export const getServerProps = async () => {
	const tcgdex = new TCGdex()
	return {
		card: await tcgdex.fetchSet('bw1')
	}
}