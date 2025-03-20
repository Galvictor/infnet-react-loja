// src/Home.js
import React, {useState, useEffect} from "react";
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
import Select from "../components/Select";

export default function Home() {
    // Estado inicial do formulário
    const [formValues, setFormValues] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        role: "",
    });

    // Estados para validação
    const [senhaValida, setSenhaValida] = useState(true);
    const [formValido, setFormValido] = useState(false);
    const [roleInvalido, setRoleInvalido] = useState(false);

    // Estado para controlar o Modal
    const [modalVisible, setModalVisible] = useState(false);

    // Estados para os dados da API
    const [options, setOptions] = useState([]); // Opções para o Select
    const [loading, setLoading] = useState(true); // Estado de carregamento

    // Estado para os detalhes do cargo
    const [roleDetails, setRoleDetails] = useState(null); // Detalhes do cargo selecionado

    // Busca os dados da API ao montar o componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Ativa o estado de carregamento
                const response = await fetch("https://api.npoint.io/894b71dcf430f831f121"); // URL da API
                const data = await response.json();
                setOptions(data.options); // Define as opções no estado
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            } finally {
                setLoading(false); // Desativa o estado de carregamento
            }
        };

        fetchData();
    }, []);

    // Função para buscar os detalhes do cargo selecionado
    const fetchRoleDetails = async (roleId) => {
        try {
            const response = await fetch("https://api.npoint.io/7ff92e886b50166207a6"); // URL da nova API de detalhes
            const data = await response.json();
            const role = data.roles.find((r) => r.id === roleId); // Encontra o cargo pelo ID
            setRoleDetails(role); // Define os detalhes do cargo no estado
        } catch (error) {
            console.error("Erro ao buscar detalhes do cargo:", error);
        }
    };

    // Função para validar o formulário
    const validarFormulario = () => {
        // Verifica se as senhas são iguais
        const senhasIguais = formValues.senha === formValues.confirmarSenha;
        setSenhaValida(senhasIguais);

        // Verifica se o campo role foi preenchido
        const rolePreenchido = !!formValues.role;
        setRoleInvalido(!rolePreenchido);

        // Verifica se todos os campos estão preenchidos
        const camposPreenchidos =
            formValues.nome && formValues.email && formValues.senha && formValues.confirmarSenha && rolePreenchido;
        setFormValido(senhasIguais && camposPreenchidos);
    };

    // Usar useEffect para validar o formulário após atualizações de estado
    useEffect(() => {
        validarFormulario();
    }, [formValues]); // Executa sempre que formValues mudar

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = async (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues, // Mantém os valores existentes
            [name]: value, // Atualiza o campo específico
        });

        // Se o campo alterado for o role, busca os detalhes do cargo
        if (name === "role" && value) {
            await fetchRoleDetails(value);
        }

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
            role: "",
        });
        setRoleDetails(null); // Limpa os detalhes do cargo
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
                    <p>
                        <strong>Cargo:</strong> {roleDetails ? roleDetails.title : "Nenhum cargo selecionado"}
                    </p>
                    {roleDetails && (
                        <p>
                            <strong>Descrição:</strong> {roleDetails.description}
                        </p>
                    )}
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
                <Select
                    name="role"
                    label="Selecione um cargo"
                    value={formValues.role}
                    onChange={handleChange}
                    options={options} // Passa as opções como prop
                    loading={loading} // Passa o estado de carregamento como prop
                    placeholder="Escolha um cargo" // Placeholder personalizado
                    invalid={roleInvalido} // Define se o campo é inválido
                    errorMessage="Por favor, selecione um cargo." // Mensagem de erro
                />
                {roleDetails && (
                    <p>
                        <strong>Descrição:</strong> {roleDetails.description}
                    </p>
                )}
                <Button type="submit" color="primary" disabled={!formValido}>
                    Enviar
                </Button>
            </Form>
        </>
    );
}