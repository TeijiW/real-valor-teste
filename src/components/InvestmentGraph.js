import React from "react"
import {
	LineChart,
	XAxis,
	YAxis,
	Tooltip,
	Line,
	CartesianGrid,
	Legend,
	ResponsiveContainer
} from "recharts"
import colors from "../colors"

export default function investmentGraph(props) {
	const { data } = props
	return (
		<div style={containerStyle}>
			<ResponsiveContainer
				style={containerStyle}
				width={"99%"}
				height={300}
			>
				<LineChart
					style={graphStyle}
					width={730}
					height={300}
					data={data}
					margin={{ top: 20, right: 35, left: 10, bottom: 5 }}
				>
					<CartesianGrid height={300} strokeDasharray="3 3" />
					<XAxis dataKey="period" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						name="Tesouro Direto Pré-fixado"
						type="step"
						dataKey="tdp"
						stroke={colors.primaryColor}
						strokeWidth={3}
					/>
					<Line
						name="Bitcoin"
						type="step"
						dataKey="btc"
						stroke={colors.secondColor}
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

const graphStyle = {
	display: "inline-block",
	color: "black",
	backgroundColor: "white",
	borderRadius: "10px"
}

const containerStyle = {}
