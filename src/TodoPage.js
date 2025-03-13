import React, {useState} from "react";
import {Button, Input, Card, CardBody, CardTitle, CardText, Container, Row, Col} from "reactstrap";

const TodoPage = () => {
    const [todos, setTodos] = useState([
        {heading: "Mercado", listInputs: []},
        {heading: "Backlog", listInputs: []},
    ]); // LISTAS
    const [headingInput, setHeadingInput] = useState(''); // TÍTULO
    const [listInputs, setListInputs] = useState({}); // ITENS DAS LISTAS

    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
            setTodos([
                ...todos,
                {heading: headingInput, listInputs: []}
            ]);
            setHeadingInput('');
        }
    };

    const handleAddList = (index) => {
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos];
            newTodos[index].listInputs.push(listInputs[index]);
            setTodos(newTodos);
            setListInputs({...listInputs, [index]: ''});
        }
    };

    const handleListInputChange = (index, value) => {
        setListInputs({...listInputs, [index]: value});
    };

    // Função para deletar uma lista
    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index); // Filtra a lista, removendo o item no índice especificado
        setTodos(newTodos);
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Minha Lista</h1>
            <Row className="mb-4">
                <Col md={8}>
                    <Input
                        type="text"
                        placeholder="Digite o título"
                        value={headingInput}
                        onChange={(e) => setHeadingInput(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Button color="primary" onClick={handleAddTodo} block>
                        Adicionar Lista
                    </Button>
                </Col>
            </Row>
            <Row>
                {todos.map((todo, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h3" className="d-flex justify-content-between align-items-center">
                                    {todo.heading}
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => handleDeleteTodo(index)} // Vincula a função de deletar ao botão
                                    >
                                        [x] Lista
                                    </Button>
                                </CardTitle>
                                <CardText>
                                    <Input
                                        type="text"
                                        placeholder="Item"
                                        value={listInputs[index] || ''}
                                        onChange={(e) => handleListInputChange(index, e.target.value)}
                                        className="mb-2"
                                    />
                                    <Button color="success" onClick={() => handleAddList(index)} block>
                                        Adicionar Item
                                    </Button>
                                </CardText>
                                <ul>
                                    {todo.listInputs.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TodoPage;