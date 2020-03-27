import React from "react"

export default function Footer() {
	return (
		<footer style={footerStyle}>
			<span>
				Desenvolvido com {"<3 "}
				por <strong>Teiji Watanabe</strong>
			</span>
		</footer>
	)
}

const footerStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: "0 25px",
	marginTop: "82px"
}
