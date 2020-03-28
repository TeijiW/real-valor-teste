import React, { useState, useEffect } from "react"
import { Container, Spinner, Image } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"
import InvestmentChart from "./InvestmentChart"
import Footer from "./Footer"
import ErrorAlert from "./ErrorAlert"
import WarningAlert from "./WarningAlert"
import InvestmentInfo from "./InvestmentInfo"
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
	const [warnings, setWarnings] = useState([])
	const [showChart, setShowChart] = useState(false)
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
				const firstBtcValue = result[1]
					? result[1].data[0].y
					: undefined

				if (firstBtcValue === "0.00") {
					const warningMessage =
						"Caso a data inicial do investimento seja anterior ao surgimento do Bitcoin, o gráfico mostrará o valor '0' até o primeiro valor do qual se tem registro do Bitcoin, é a partir desta data que o investimento em Bitcoin passará a ser calculada"
					setWarnings([warningMessage])
				}
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

	const getLastValues = () => {
		const lastValues = {
			tdp: 0,
			btc: 0
		}
		if (chartData[0]) {
			const length = chartData[0].data.length
			const lastValue = chartData[0].data[length - 1]
			lastValues.tdp = lastValue.y
		}
		if (chartData[1]) {
			const length = chartData[1].data.length
			const lastValue = chartData[1].data[length - 1]
			lastValues.btc = lastValue.y
		}

		return lastValues
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
			{showChart && <WarningAlert warnings={warnings} />}
			{showChart && <InvestmentChart width={width} data={chartData} />}
			{showChart && (
				<InvestmentInfo
					investment={investment}
					lastValues={getLastValues()}
				/>
			)}
			<Footer />
		</Container>
	)
}
