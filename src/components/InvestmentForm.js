import React from "react"
import colors from "../colors"
import { Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"

const yearOptions = [1, 2]
const amountOptions = [2000, 10000]

export default function InvestmentForm(props) {
	const { register, handleSubmit } = useForm()
	const { setInvestment, investment } = props

	const onSubmit = data => {
		const { years, amount } = data
		const yearsInt = parseInt(years)
		const amountInt = parseInt(amount)
		setInvestment({ ...investment, years: yearsInt, amount: amountInt })
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
			<Form.Group controlId="yearsForm">
				<Form.Label style={labelStyle}>
					Há quanto tempo você investiu?
				</Form.Label>
				<Form.Control ref={register} name="years" size="lg" as="select">
					{yearOptions.map((year, index) => (
						<option key={index}>{year} ano(s)</option>
					))}
				</Form.Control>
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
						ref={register}
						name="amount"
						size="lg"
						as="select"
					>
						{amountOptions.map((amount, index) => (
							<option key={index}>{amount}</option>
						))}
					</Form.Control>
				</InputGroup>
			</Form.Group>
			<Button size="lg" style={buttonStyle} type="submit">
				Calcular Rendimento
			</Button>
		</Form>
	)
}

const formStyle = {
	marginTop: "50px",
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
