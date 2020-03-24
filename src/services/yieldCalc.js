const tdpYieldPercentage = 10
const tdpYieldMonth = Math.pow(1 + tdpYieldPercentage / 100, 1 / 12) - 1
const tdpYieldDay = Math.pow(1 + tdpYieldPercentage / 100, 1 / 360) - 1

const yieldCalc = (years, amount) => {
	const dataArray = []
	let monthCount
	let cdiCount = amount
	// const months = years * 12
	const dateNow = new Date()
	const yearNow = dateNow.getFullYear()
	const monthNow = dateNow.getMonth()
	const yearStart = yearNow - years
	monthCount = monthNow
	for (let yearCount = yearStart; yearCount <= yearNow; yearCount++) {
		for (; monthCount <= 11; monthCount++) {
			if (yearCount === yearNow && monthCount > monthNow) break
			dataArray.push({
				period: `${monthCount + 1}/${yearCount}`,
				btc: 0,
				tdp: (cdiCount += cdiCount * tdpYieldMonth).toFixed(2)
			})
		}
		monthCount = 0
	}
	return dataArray
}

export default yieldCalc
