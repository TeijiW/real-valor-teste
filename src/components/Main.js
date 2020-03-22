import React from "react"
import { Container } from "react-bootstrap"
import InvestmentForm from "./InvestmentForm"

const Main = () => {
	return (
		<Container fluid>
			<h1>Bem-vindo a Real Valor!</h1>
			<h2>Veja como foi a rentabilidade do seu investimento!</h2>
			<InvestmentForm />
		</Container>
	)
}

export default Main
