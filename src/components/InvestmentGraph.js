import React, { useEffect } from "react"
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
	// console.log(data)
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
					height={250}
					data={data}
					margin={{ top: 20, right: 35, left: 10, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="period" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						name="Tesouro Direto Pré-fixado"
						type="natural"
						dataKey="tdp"
						stroke={colors.primaryColor}
						strokeWidth={5}
					/>
					<Line
						name="Bitcoin"
						type="natural"
						dataKey="btc"
						stroke={colors.secondColor}
						strokeWidth={5}
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
