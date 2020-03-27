import React from "react"
import { ResponsiveLine } from "@nivo/line"
import colors from "../colors"

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
		<div
			style={{
				background: "white",
				padding: "9px 12px",
				border: "1px solid #ccc"
			}}
		>
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

export default function investmentGraph(props) {
	const { data } = props
	let timeInterval = "every month"
	if (data[0]) {
		const { length } = data[0].data
		if (length > 16) timeInterval = "every 3 months"
		if (length > 40) timeInterval = "every 6 months"
		if (length > 85) timeInterval = "every 1 year"
		if (length > 170) timeInterval = "every 2 years"
	}
	return (
		<>
			<h2 style={{ marginTop: "60px", marginBottom: "30px" }}>
				Compare o rendimento no gráfico abaixo!
			</h2>
			<div style={graphStyle}>
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
						tickValues: timeInterval,
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

const graphStyle = {
	height: " 500px",
	color: "black",
	backgroundColor: "white",
	borderRadius: "10px"
}
