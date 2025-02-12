// src/Home.js
import React, { useState, useEffect } from "react";
import { Form, FormFeedback, FormGroup, Input, Label, Button } from "reactstrap";

export default function Home() {
    // Estados para os campos do formulário
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Estados para validação
    const [senhaValida, setSenhaValida] = useState(true);
    const [formValido, setFormValido] = useState(false);

    // Função para validar o formulário
    const validarFormulario = () => {
        // Verifica se as senhas são iguais
        const senhasIguais = senha === confirmarSenha;
        setSenhaValida(senhasIguais);

        // Verifica se todos os campos estão preenchidos
        const camposPreenchidos = nome && email && senha && confirmarSenha;
        setFormValido(senhasIguais && camposPreenchidos);
    };

    // Usar useEffect para validar o formulário após atualizações de estado
    useEffect(() => {
        validarFormulario();
    }, [senha, confirmarSenha, nome, email]); // Executa sempre que esses estados mudarem

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValido) {
            alert("Formulário enviado com sucesso!");
            // Aqui você pode adicionar a lógica para enviar os dados
        } else {
            alert("Por favor, preencha o formulário corretamente.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="nome">Nome</Label>
                <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="seuemail@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="senha">Senha</Label>
                <Input
                    id="senha"
                    name="senha"
                    placeholder="Sua senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="confirmar">Confirmar senha</Label>
                <Input
                    id="confirmar"
                    name="confirmar"
                    placeholder="Confirmar senha"
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    invalid={!senhaValida}
                    required
                />
                <FormFeedback invalid>Senha não é igual</FormFeedback>
            </FormGroup>
            <Button type="submit" color="primary" disabled={!formValido}>
                Enviar
            </Button>
        </Form>
    );
}