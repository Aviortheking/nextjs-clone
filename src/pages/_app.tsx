import React from 'react'
import type { CommProps } from '../interfaces'

interface AppProps {
	component: any
	path: string
	pageProps: any
}

export default class App extends React.Component<AppProps> {
	public render = () => (
		<>
			<script
				type='application/json'
				id="__PROPS"
				dangerouslySetInnerHTML={{__html: JSON.stringify({
					pageProps: this.props.pageProps,
					path: this.props.path
				} as CommProps)}}
			></script>
			<this.props.component {...this.props.pageProps} />
		</>
	)
}