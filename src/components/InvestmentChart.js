import React from "react"
import { ResponsiveLine } from "@nivo/line"
import colors from "../colors"

const widthOfChart = {
	greater: {
		18: "every 3 months",
		40: "every 6 months",
		85: "every 1 year",
		170: "every 2 years"
	},
	less: {
		5: "every 2 months",
		9: "every 3 months",
		14: "every 6 months",
		27: "every 1 year",
		51: "every 2 years",
		100: "every 3 years",
		159: "every 5 years"
	}
}

export default function InvestmentChart(props) {
	const { data } = props
	const { width } = props

	const calcChartInterval = (width = 0, length) => {
		let timeInterval = "every month"
		if (width > 650) {
			Object.keys(widthOfChart.greater).forEach(key => {
				if (length > parseInt(key))
					timeInterval = widthOfChart.greater[key]
			})
		}
		if (width <= 650) {
			Object.keys(widthOfChart.less).forEach(key => {
				if (length > parseInt(key)) {
					timeInterval = widthOfChart.less[key]
				}
			})
		}
		return timeInterval
	}

	const renderDate = point => {
		if (point.serieId === "Bitcoin") {
			return (
				<div style={{ color: "black" }}>
					{point.data.xFormatted} <br />
				</div>
			)
		}
	}

	const renderCustomTooltip = ({ slice }) => {
		return (
			<div style={toolTipStyle}>
				{slice.points.map(point => {
					return (
						<div
							key={point.id}
							style={{
								color: point.serieColor,
								padding: "3px 0"
							}}
						>
							{renderDate(point)}
							<strong>{point.serieId}</strong>:
							{` R$${point.data.yFormatted}`}
						</div>
					)
				})}
			</div>
		)
	}

	const getTimeInterval = () => {
		let timeInterval
		if (data[0]) {
			const { length } = data[0].data
			timeInterval = calcChartInterval(width, length)
		}
		return timeInterval
	}

	return (
		<>
			<h2 style={{ marginTop: "60px", marginBottom: "30px" }}>
				Compare o rendimento no gráfico abaixo!
			</h2>
			<div style={chartStyle}>
				<ResponsiveLine
					data={data}
					margin={{ top: 20, right: 30, bottom: 50, left: 80 }}
					enableSlices="x"
					curve="linear"
					xScale={{
						type: "time",
						format: "native",
						precision: "day"
					}}
					xFormat="time:%m/%y"
					enableGridX={true}
					yScale={{
						type: "linear",
						min: "auto",
						max: "auto",
						reverse: false
					}}
					axisBottom={{
						format: "%m/%y",
						tickValues: getTimeInterval(),
						max: "auto",
						legend: "Mês/Ano",
						legendOffset: 36,
						legendPosition: "start"
					}}
					axisLeft={{
						legend: "R$",
						legendOffset: -50,
						legendPosition: "start"
					}}
					useMesh={true}
					colors={[colors.primaryColor, colors.secondColor]}
					pointSize={5}
					pointColor={{ theme: "background" }}
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					pointLabel="y"
					pointLabelYOffset={-12}
					legends={[
						{
							anchor: "bottom",
							direction: "row",
							translateY: 50,
							itemDirection: "left-to-right",
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: "circle",
							symbolBorderColor: "black"
						}
					]}
					sliceTooltip={renderCustomTooltip}
				/>
			</div>
		</>
	)
}

const chartStyle = {
	height: " 500px",
	color: "black",
	backgroundColor: "white",
	borderRadius: "10px"
}

const toolTipStyle = {
	background: "white",
	padding: "9px 12px",
	border: "1px solid #ccc"
}
