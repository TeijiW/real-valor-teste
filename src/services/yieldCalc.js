import getBtcPriceArray from "./getBtcPrice"

const tdpYieldPercentage = 10
const tdpYieldMonth = Math.pow(1 + tdpYieldPercentage / 100, 1 / 12) - 1

const searchBtcPrice = (btcPriceArray, yearStart, monthStart, amount) => {
	let btcStartPrice, btcIndex, btcYearStart, btcMonthStart
	let btcAmount = 0
	for (let i = 0; i < btcPriceArray.length; i++) {
		if (
			btcPriceArray[i].price !== 0 &&
			btcPriceArray[i].year === yearStart &&
			btcPriceArray[i].month === monthStart
		) {
			btcIndex = i
			break
		}
	}
	if (!btcIndex) {
		for (let i = 0; i < btcPriceArray.length; i++) {
			if (btcPriceArray[i].price !== 0) {
				btcIndex = i
				break
			}
		}
	}
	const firstBtcPrice = btcPriceArray[btcIndex]
	btcStartPrice = firstBtcPrice.price
	btcYearStart = firstBtcPrice.year
	btcMonthStart = firstBtcPrice.month
	btcAmount = amount / btcStartPrice

	return { btcAmount, btcYearStart, btcMonthStart, btcIndex }
}

const yieldCalc = async (years = 0, months = 0, amount = 0) => {
	if (years === 0 || months === 0 || amount === 0) return []
	const btcPriceArray = await getBtcPriceArray(years, months)
	const dataObject = {
		tdp: [],
		btc: []
	}
	let monthStart = months - 1
	let cdiCount = amount
	const dateNow = new Date()
	const yearNow = dateNow.getFullYear()
	const monthNow = dateNow.getMonth()
	const yearStart = years
	// Set btc amount by price that month and year
	let btc = 0
	let btcYearStart, btcMonthStart
	let startBtcCount = false
	let btcStartPrice = 0
	let btcIndex = 1
	let btcAmount = 1
	if (
		btcPriceArray[1].month === monthStart &&
		btcPriceArray[1].year === yearStart
	) {
		btcStartPrice = btcPriceArray[1].price
		btcAmount = amount / btcStartPrice
		btc = amount
		btcIndex = 1
		startBtcCount = true
	} else {
		const foundPrice = searchBtcPrice(
			btcPriceArray,
			yearStart,
			monthStart,
			amount
		)
		btcMonthStart = foundPrice.btcMonthStart
		btcYearStart = foundPrice.btcYearStart
		btcAmount = foundPrice.btcAmount
		btcIndex = foundPrice.btcIndex
	}

	for (let yearCount = yearStart; yearCount <= yearNow; yearCount++) {
		for (let monthCount = monthStart; monthCount <= 11; monthCount++) {
			if (yearCount === yearNow && monthCount > monthNow) break
			if (btcYearStart === yearCount && btcMonthStart === monthCount) {
				startBtcCount = true
			}
			if (startBtcCount) {
				btc = btcAmount * btcPriceArray[btcIndex].price
				btcIndex++
			}
			const date = new Date(yearCount, monthCount + 1, 0)
			dataObject.btc.push({
				x: date,
				y: btc.toFixed(2)
			})
			dataObject.tdp.push({
				x: date,
				y: cdiCount.toFixed(2)
			})
			cdiCount += cdiCount * tdpYieldMonth
		}
		monthStart = 0
	}
	const dataArray = [
		{
			id: "Tesouro Direto Pré-Fixado",
			data: dataObject.tdp
		},
		{
			id: "Bitcoin",
			data: dataObject.btc
		}
	]
	return dataArray
}

export default yieldCalc
