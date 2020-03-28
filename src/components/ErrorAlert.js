import React from "react"
import { Alert } from "react-bootstrap"

export default function errorAlert({ errors }) {
	if (errors.length) {
		return (
			<Alert style={errorStyle} variant="danger">
				{errors.map((err, index) => (
					<div id={index}>
						{err}
						<br />
					</div>
				))}
			</Alert>
		)
	}
	return null
}

const errorStyle = {
	backgroundColor: "#ec939a",
	border: "0.5px solid black",
	fontWeight: "400",
	fontSize: "14px",
	alignSelf: "center",
	display: "inline-block",
	width: "50%"
}
