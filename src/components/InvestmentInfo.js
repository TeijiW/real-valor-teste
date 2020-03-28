import React from "react"
import { Card } from "react-bootstrap"
import colors from "../colors"

export default function InvestmentInfo(props) {
	const { investment, lastValues } = props
	return (
		<>
			<br />
			<Card style={infoStyle}>
				<Card.Body>
					<Card.Title>Relatório do seu investimento</Card.Title>
					<br />
					<Card.Text>
						<p>
							<strong>Valor inicialmente investido: </strong>
							{investment.amount}
						</p>
						<p>
							<strong>Data inicial do investimento: </strong>
							{`${investment.months}/${investment.years}`}
						</p>
						<p>
							<strong>Valor total hoje: </strong>
						</p>
						<p>Em Bitcoin: R${lastValues.btc}</p>
						<p>Em Tesouro direto prefixado: R${lastValues.tdp}</p>
						<p>
							<strong>Rentabilidade até o momento: </strong>
						</p>
						<p>
							Em Bitcoin:{" "}
							{(
								((lastValues.btc - investment.amount) /
									investment.amount) *
								100
							).toFixed(2)}
							%
						</p>
						<p>
							Em Tesouro direto prefixado:{" "}
							{(
								((lastValues.tdp - investment.amount) /
									investment.amount) *
								100
							).toFixed(2)}
							%
						</p>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	)
}

const infoStyle = {
	backgroundColor: colors.thirdColor,
	color: "black",
	marginTop: "30px",
	alignSelf: "center",
	display: "inline-block",
	width: "65%",
	borderRadius: "10px"
}
