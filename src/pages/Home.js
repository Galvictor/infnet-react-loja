import React from "react";
import {Container, Card, CardBody, CardTitle, CardText} from "reactstrap";

export default function Home() {
    return (
        <Container className="mt-4">
            <Card className="p-4 shadow">
                <CardBody>
                    <CardTitle tag="h1" className="text-primary">Bem-vindo ao meu Projeto!</CardTitle>
                    <CardText className="lead">
                        Um projeto para o curso <strong>Front-end com React [25E1_3]</strong>.
                    </CardText>
                    <hr/>
                    <CardText>
                        Desenvolvido pelo aluno <strong>João Victor</strong>.
                    </CardText>
                    <CardText>
                        <strong>Funcionalidades:</strong>
                        <ul>
                            <li>Rota <strong>Loja, Cart e Users List</strong> protegida por login.</li>
                            <li>Adição e remoção de itens do carrinho.</li>
                            <li>Checkout fake.</li>
                            <li>Rota <strong>Todo</strong> para organizar suas tarefas.</li>
                        </ul>
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    );
}
