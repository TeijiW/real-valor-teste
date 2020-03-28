import React, { useState, useEffect } from "react"
import { Container, Spinner, Image } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"
import InvestmentChart from "./InvestmentChart"
import Footer from "./Footer"
import ErrorAlert from "./ErrorAlert"
import yieldCalc from "../services/yieldCalc"
import colors from "../colors"
import logo from "../images/transparente_70h_hq.png.webp"

export default function Main() {
	const [investment, setInvestment] = useState({
		years: 0,
		months: 0,
		amount: 0
	})
	const [chartData, setChartData] = useState([])
	const [errors, setErrors] = useState([])
	const [showchart, setShowChart] = useState(false)
	const [loading, setLoading] = useState(false)
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [width])

	useEffect(
		errors => {
			const { years, months, amount } = investment
			const fetchData = async () => {
				if (years) {
					setShowChart(false)
					setLoading(true)
				}
				const result = await yieldCalc(years, months, amount)
				setChartData(result)
			}
			try {
				fetchData()
			} catch (error) {
				const errorMessage =
					"Erro interno na aplicação, contate o administrador: " +
					error
				if (!errors.contains(errorMessage))
					setErrors([...errors, errorMessage])
			}
		},
		[investment]
	)

	useEffect(() => {
		setShowChart(false)
		if (chartData.length > 1) {
			setTimeout(() => {
				setLoading(false)
				setShowChart(true)
			}, 700)
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

	return (
		<Container fluid="md">
			<Image
				fluid
				style={{
					marginBottom: "50px"
				}}
				alt="Logo Real Valor"
				src={logo}
			/>
			<ErrorAlert errors={errors} />
			<InvestmentForm
				investment={investment}
				setInvestment={setInvestment}
			/>
			{loading && renderLoading()}
			{showchart && <InvestmentChart width={width} data={chartData} />}
			<Footer />
		</Container>
	)
}
