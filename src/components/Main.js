import React, { useState, useEffect } from "react"
import { Container, Collapse, Spinner, Image } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"
import InvestmentGraph from "./InvestmentGraph"
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
	const [graphData, setGraphData] = useState([])
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (investment.years) setLoading(true)
			const result = await yieldCalc(
				investment.years,
				investment.months,
				investment.amount
			)
			setGraphData(result)
		}
		fetchData()
	}, [investment.years, investment.months, investment.amount])

	useEffect(() => {
		setOpen(false)
		if (graphData.length > 1) {
			setTimeout(() => {
				setLoading(false)
				setOpen(true)
			}, 1500)
		}
	}, [graphData])

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
			<Collapse in={open}>
				<div>
					<InvestmentGraph data={graphData} />
				</div>
			</Collapse>
			<Footer />
		</Container>
	)
}

export default Main
