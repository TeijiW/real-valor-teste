import axios from "axios"

const apiURL = "https://min-api.cryptocompare.com/data/v2/histoday"
// const apiKey =
// "f813e51d3eed931532320276470666ae78979d36b56c1126c05077ff082b9d47"

const get = async (year, month = 0) => {
	const dateNow = new Date()
	const yearDiff = dateNow.getFullYear() - year
	const monthNow = dateNow.getMonth() + 1
	const monthDiff = Math.abs(monthNow - month)
	let allData = "false"
	let limit = "1"
	if (month > monthNow) limit = yearDiff * 12 - monthDiff
	if (month < monthNow) limit = yearDiff * 12 + monthDiff
	if (month === monthNow && yearDiff !== 0) limit = yearDiff * 12
	limit++ // insufficient requisition prevention
	if (limit > 67) {
		allData = "true"
	}
	const response = await axios.get(apiURL, {
		params: {
			fsym: "BTC",
			tsym: "BRL",
			aggregate: "30", // To get value per month
			// api_key: apiKey,
			limit,
			allData
		}
	})
	return response.data.Data.Data
}

const processData = async (year, month = 0) => {
	let postProcessData = []
	try {
		const data = await get(year, month)
		postProcessData = data.map(item => {
			const date = new Date(item.time * 1000)
			const year = date.getFullYear()
			const month = date.getMonth()
			const price = ((item.high + item.low) / 2).toFixed(2)
			return {
				price,
				year,
				month
			}
		})
		return postProcessData
	} catch (error) {
		throw error
	}
}

export default processData
