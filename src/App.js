import React from "react"
import { Container } from "react-bootstrap"
import colors from "./colors"
import Main from "./components/Main.js"

export default function App() {
	return (
		<Container
			style={mainStyle}
			fluid="md"
			className="App shadow-lg text-center"
		>
			<Main />
		</Container>
	)
}

const mainStyle = {
	backgroundColor: colors.primaryColor,
	color: colors.fontColor,
	margin: "0 auto",
	padding: "40px"
}
