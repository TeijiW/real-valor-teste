import React from "react"
import colors from "../colors"
import { Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"

const yearOptions = [1, 2]
const amountOptions = [2000, 10000]

export default function InvestmentForm() {
	const { register, handleSubmit } = useForm()

	const onSubmit = data => {
		console.log(parseInt(data.years))
		console.log(parseInt(data.amount))
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
			<Form.Group controlId="yearsForm">
				<Form.Label>Há quanto tempo você investiu?</Form.Label>
				<Form.Control ref={register} name="years" size="lg" as="select">
					{yearOptions.map(year => (
						<option>{year} ano(s)</option>
					))}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId="amountForm">
				<Form.Label>Quanto você investiu?</Form.Label>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text>R$</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control
						ref={register}
						name="amount"
						size="lg"
						as="select"
					>
						{amountOptions.map(amount => (
							<option>{amount}</option>
						))}
					</Form.Control>
				</InputGroup>
			</Form.Group>
			<Button style={buttonStyle} type="submit">
				Checar Rentabilidade
			</Button>
		</Form>
	)
}

const formStyle = {
	paddingTop: "50px",
	width: "40%",
	display: "inline-block"
}

const buttonStyle = {
	backgroundColor: colors.secondColor,
	fontWeight: "500"
}
