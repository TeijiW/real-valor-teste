import React, { useState, useEffect } from "react"
import { Container, Spinner, Image } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"
import InvestmentChart from "./InvestmentChart"
import Footer from "./Footer"
import yieldCalc from "../services/yieldCalc"
import colors from "../colors"
import logo from "../images/transparente_70h_hq.png.webp"

const Main = () => {
	const [investment, setInvestment] = useState({
		years: 0,
		months: 0,
		amount: 0
	})
	const [chartData, setChartData] = useState([])
	const [showchart, setShowChart] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (investment.years) {
				setShowChart(false)
				setLoading(true)
			}

			const result = await yieldCalc(
				investment.years,
				investment.months,
				investment.amount
			)
			setChartData(result)
		}
		fetchData()
	}, [investment.years, investment.months, investment.amount])

	useEffect(() => {
		setShowChart(false)
		if (chartData.length > 1) {
			setTimeout(() => {
				setLoading(false)
				setShowChart(true)
			}, 1500)
		}
	}, [chartData])

	const renderLoading = () => {
		return (
			<>
				<br />
				<Spinner
					style={{ marginTop: "50px", color: colors.secondColor }}
					animation="border"
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</Spinner>
			</>
		)
	}

	const renderChart = () => {
		return <InvestmentChart data={chartData} />
	}

	return (
		<Container fluid="md">
			<Image
				fluid
				style={{
					marginBottom: "50px"
					// display: "inline-block"
					// width: "50%"
				}}
				alt="Logo Real Valor"
				src={logo}
			/>
			<InvestmentForm
				investment={investment}
				setInvestment={setInvestment}
			/>
			{loading && renderLoading()}
			{showchart && renderChart()}
			<Footer />
		</Container>
	)
}

export default Main
