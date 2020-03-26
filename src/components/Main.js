import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"
import InvestmentGraph from "./InvestmentGraph"
import yieldCalc from "../services/yieldCalc"

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
			<h1 style={{ marginBottom: "20px" }}>Bem-vindo a Real Valor!</h1>
			<h2>Veja qual foi o rendimento do seu investimento!</h2>
			<InvestmentForm
				investment={investment}
				setInvestment={setInvestment}
			/>
			<h2 style={{ marginTop: "40px", marginBottom: "30px" }}>
				Compare o rendimento no gráfico abaixo!
			</h2>
			<InvestmentGraph data={graphData} />
		</Container>
	)
}

export default Main
