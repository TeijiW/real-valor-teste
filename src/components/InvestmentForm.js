import React from "react"
import colors from "../colors"
import { Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function InvestmentForm(props) {
	const { register, handleSubmit } = useForm()
	const { setInvestment, investment } = props

	const onSubmit = data => {
		const { years, amount, months } = data
		const yearsInt = parseInt(years)
		const amountInt = parseInt(amount)
		const monthsInt = parseInt(months)
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
				<Form.Group controlId="dateForm">
					<Form.Label style={labelStyle}>
						Quando você investiu?
					</Form.Label>
					<InputGroup>
						<Form.Control
							placeholder="Mês"
							defaultValue={new Date().getMonth() + 1}
							ref={register}
							name="months"
							size="lg"
							type="number"
							max="12"
							min="1"
						/>
						<InputGroup.Prepend>
							<InputGroup.Text>/</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
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
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text>R$</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							placeholder="Quantia aplicada"
							defaultValue="1"
							ref={register}
							name="amount"
							size="lg"
							type="number"
							min="1"
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
	width: "60%",
	display: "inline-block"
}

const buttonStyle = {
	backgroundColor: colors.secondColor,
	fontWeight: "500",
	padding: "15px",
	marginTop: "7px",
	borderBottom: "4px solid #cc7a00"
}

const labelStyle = {
	fontSize: "20px"
}
