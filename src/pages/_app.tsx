import React from 'react'

interface AppProps {
	children: React.ReactNode
}

export default class App extends React.Component<AppProps> {
	public render = () => (
		<>
			<html>
				<head>
					<script
					type='application/json'
					id="__PROPS"
					dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}
					></script>
				</head>
				<body>{this.props.children}</body>
			</html>
		</>
	)
}