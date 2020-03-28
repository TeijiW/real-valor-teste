import React, { useState } from "react"
import { Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import colors from "../colors"
import ErrorAlert from "./ErrorAlert"

export default function InvestmentForm(props) {
	const [monthsErr, setMonthsErr] = useState([])
	const { register, handleSubmit } = useForm()
	const { setInvestment, investment } = props

	const onSubmit = data => {
		const { years, amount, months } = data
		const dateNow = new Date()
		const yearsInt = parseInt(years)
		const amountInt = parseInt(amount)
		const monthsInt = parseInt(months)
		if (
			yearsInt === parseInt(dateNow.getFullYear()) &&
			monthsInt >= parseInt(dateNow.getMonth()) + 1
		) {
			const errorMessage =
				"O mês deve ser no mínimo menor ou igual ao atual"
			if (!monthsErr.includes(errorMessage)) {
				return setMonthsErr([...monthsErr, errorMessage])
			}
		}
		setMonthsErr([])
		setInvestment({
			...investment,
			years: yearsInt,
			amount: amountInt,
			months: monthsInt
		})
	}

	return (
		<>
			<h2>Veja qual foi o rendimento do seu investimento!</h2>
			<Form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
				<ErrorAlert errors={monthsErr} />
				<Form.Group controlId="dateForm">
					<Form.Label style={labelStyle}>
						Quando você investiu?
					</Form.Label>
					<InputGroup className="mb-4">
						<Form.Control
							style={inputStyle}
							required
							placeholder="Mês"
							defaultValue={new Date().getMonth() + 1}
							ref={register}
							name="months"
							size="lg"
							type="number"
							max="12"
							min="1"
							isInvalid={!!monthsErr.length}
						/>
						<InputGroup.Prepend>
							<InputGroup.Text>
								<strong>/</strong>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							style={inputStyle}
							required
							placeholder="Ano"
							defaultValue={new Date().getFullYear()}
							ref={register}
							name="years"
							size="lg"
							type="number"
							max={new Date().getFullYear()}
							min="2000"
						/>
					</InputGroup>
				</Form.Group>

				<Form.Group controlId="amountForm">
					<Form.Label style={labelStyle}>
						Quanto você investiu?
					</Form.Label>
					<InputGroup className="mb-4">
						<InputGroup.Prepend>
							<InputGroup.Text>
								<strong>R$</strong>
							</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							style={inputStyle}
							required
							placeholder="Quantia aplicada"
							defaultValue="1"
							ref={register}
							name="amount"
							size="lg"
							type="number"
							min="0"
						/>
					</InputGroup>
				</Form.Group>
				<Button size="lg" style={buttonStyle} type="submit">
					Calcular Rendimento
				</Button>
			</Form>
		</>
	)
}

const formStyle = {
	marginTop: "20px",
	display: "inline-block"
}

const inputStyle = {
	textAlign: "center"
}

const buttonStyle = {
	backgroundColor: colors.secondColor,
	fontWeight: "bold",
	padding: "15px",
	marginTop: "7px",
	borderBottom: "4px solid #cc7a00"
}

const labelStyle = {
	fontSize: "20px"
}
