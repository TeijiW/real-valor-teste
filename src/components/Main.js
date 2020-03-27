import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"
import InvestmentGraph from "./InvestmentGraph"
import yieldCalc from "../services/yieldCalc"
import colors from "../colors"

const Main = () => {
	const [investment, setInvestment] = useState({
		years: 0,
		months: 0,
		amount: 0
	})
	const [graphData, setGraphData] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const result = await yieldCalc(
				investment.years,
				investment.months,
				investment.amount
			)
			setGraphData(result)
		}
		fetchData()
	}, [investment.years, investment.months, investment.amount])
	return (
		<Container fluid="md">
			<h1 style={{ marginBottom: "50px" }}>
				Bem-vindo a <span style={highlightStyle}>Real Valor!</span>
			</h1>
			<InvestmentForm
				investment={investment}
				setInvestment={setInvestment}
			/>
			<InvestmentGraph data={graphData} />
		</Container>
	)
}

export default Main

const highlightStyle = {
	color: colors.secondColor
}
