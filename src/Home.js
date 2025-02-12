// src/Home.js
import React, { useState, useEffect } from "react";
import {
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

export default function Home() {
    // Estado inicial do formulário
    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    // Estados para validação
    const [senhaValida, setSenhaValida] = useState(true);
    const [formValido, setFormValido] = useState(false);

    // Estado para controlar o Modal
    const [modalVisible, setModalVisible] = useState(false);

    // Função para validar o formulário
    const validarFormulario = () => {
        // Verifica se as senhas são iguais
        const senhasIguais = formValues.senha === formValues.confirmarSenha;
        setSenhaValida(senhasIguais);

        // Verifica se todos os campos estão preenchidos
        const camposPreenchidos =
            formValues.nome && formValues.email && formValues.senha && formValues.confirmarSenha;
        setFormValido(senhasIguais && camposPreenchidos);
    };

    // Usar useEffect para validar o formulário após atualizações de estado
    useEffect(() => {
        validarFormulario();
    }, [formValues]); // Executa sempre que formValues mudar

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues, // Mantém os valores existentes
            [name]: value, // Atualiza o campo específico
        });
    };

    // Função para abrir o Modal
    const abrirModal = () => {
        setModalVisible(true);
    };

    // Função para fechar o Modal e limpar os campos
    const fecharModal = () => {
        setModalVisible(false);
        limparCampos(); // Limpa os campos após fechar o Modal
    };

    // Função para limpar os campos do formulário
    const limparCampos = () => {
        setFormValues({
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
        });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValido) {
            abrirModal(); // Abre o Modal para exibir os dados
        } else {
            alert("Por favor, preencha o formulário corretamente.");
        }
    };

    return (
        <>
            {/* Modal para exibir os dados preenchidos */}
            <Modal isOpen={modalVisible} toggle={fecharModal}>
                <ModalHeader toggle={fecharModal}>Dados do Formulário</ModalHeader>
                <ModalBody>
                    <p>
                        <strong>Nome:</strong> {formValues.nome}
                    </p>
                    <p>
                        <strong>Email:</strong> {formValues.email}
                    </p>
                    <p>
                        <strong>Senha:</strong> {formValues.senha}
                    </p>
                    <p>
                        <strong>Confirmar Senha:</strong> {formValues.confirmarSenha}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={fecharModal}>
                        Fechar
                    </Button>
                </ModalFooter>
            </Modal>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input
                        id="nome"
                        name="nome"
                        placeholder="Seu nome"
                        value={formValues.nome}
                        onChange={handleChange}
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
                        value={formValues.email}
                        onChange={handleChange}
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
                        value={formValues.senha}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmar">Confirmar senha</Label>
                    <Input
                        id="confirmar"
                        name="confirmarSenha"
                        placeholder="Confirmar senha"
                        type="password"
                        value={formValues.confirmarSenha}
                        onChange={handleChange}
                        invalid={!senhaValida}
                        required
                    />
                    <FormFeedback invalid>Senha não é igual</FormFeedback>
                </FormGroup>
                <Button type="submit" color="primary" disabled={!formValido}>
                    Enviar
                </Button>
            </Form>
        </>
    );
}