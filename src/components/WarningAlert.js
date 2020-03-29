import React from "react"
import { Alert } from "react-bootstrap"

export default function WarningAlert({ warnings }) {
	if (warnings.length) {
		return (
			<>
				<br />
				<Alert style={warningStyle} variant="warning">
					{warnings.map((warning, index) => (
						<div id={index}>
							{warning}
							<br />
						</div>
					))}
				</Alert>
			</>
		)
	}
	return null
}

const warningStyle = {
	border: "0.5px solid black",
	fontWeight: "400",
	fontSize: "14px",
	alignSelf: "center",
	display: "inline-block",
	width: "70%",
	marginTop: "25px"
}
