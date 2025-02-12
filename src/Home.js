//home js
import React from "react";
import {Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";

export default function Home() {
    return (
        <Form>
            <FormGroup>
                <Label for="nome">Nome</Label>
                <Input id="nome" name="email" placeholder="Seu nome" type="email"/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="seuemail@email.com"
                    type="email"
                />
            </FormGroup>
            <FormGroup>
                <Label for="senha">Senha</Label>
                <Input
                    id="senha"
                    name="senha"
                    placeholder="Sua senha"
                    type="password"
                />
            </FormGroup>
            <FormGroup>
                <Label for="confirmar">Confirmar senha</Label>
                <Input
                    invalid
                    id="confirmar"
                    name="confirmar"
                    placeholder="Confirmar senha"
                    type="password"
                />
                <FormFeedback invalid>Senha não é igual</FormFeedback>
            </FormGroup>
        </Form>
    );
}