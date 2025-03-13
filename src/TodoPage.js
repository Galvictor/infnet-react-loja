import React, {useReducer, useCallback, useState} from "react";
import {Button, Input, Card, CardBody, CardTitle, CardText, Container, Row, Col} from "reactstrap";

// Definição do reducer para gerenciar o estado das listas e itens
const todoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, {heading: action.payload, listInputs: []}];
        case "DELETE_TODO":
            return state.filter((_, index) => index !== action.payload);
        case "ADD_ITEM":
            return state.map((todo, index) =>
                index === action.payload.todoIndex
                    ? {...todo, listInputs: [...todo.listInputs, action.payload.item]}
                    : todo
            );
        case "DELETE_ITEM":
            return state.map((todo, index) =>
                index === action.payload.todoIndex
                    ? {...todo, listInputs: todo.listInputs.filter((_, i) => i !== action.payload.itemIndex)}
                    : todo
            );
        default:
            return state;
    }
};

const TodoPage = () => {
    const [todos, dispatch] = useReducer(todoReducer, [
        {heading: "Mercado", listInputs: []},
        {heading: "Backlog", listInputs: []},
    ]);
    const [headingInput, setHeadingInput] = useState("");
    const [listInputs, setListInputs] = useState({});

    // Função para adicionar uma nova lista
    const handleAddTodo = useCallback(() => {
        if (headingInput.trim()) {
            dispatch({type: "ADD_TODO", payload: headingInput});
            setHeadingInput("");
        }
    }, [headingInput]);

    // Função para adicionar um item a uma lista
    const handleAddItem = useCallback(
        (todoIndex) => {
            if (listInputs[todoIndex]?.trim()) {
                dispatch({
                    type: "ADD_ITEM",
                    payload: {todoIndex, item: listInputs[todoIndex]},
                });
                setListInputs((prev) => ({...prev, [todoIndex]: ""}));
            }
        },
        [listInputs]
    );

    // Função para deletar uma lista
    const handleDeleteTodo = useCallback((todoIndex) => {
        dispatch({type: "DELETE_TODO", payload: todoIndex});
    }, []);

    // Função para deletar um item de uma lista
    const handleDeleteItem = useCallback((todoIndex, itemIndex) => {
        dispatch({type: "DELETE_ITEM", payload: {todoIndex, itemIndex}});
    }, []);

    // Função para atualizar o valor do input de itens
    const handleListInputChange = useCallback((todoIndex, value) => {
        setListInputs((prev) => ({...prev, [todoIndex]: value}));
    }, []);

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
                {todos.map((todo, todoIndex) => (
                    <Col key={todoIndex} md={4} className="mb-4">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h3" className="d-flex justify-content-between align-items-center">
                                    {todo.heading}
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => handleDeleteTodo(todoIndex)}
                                    >
                                        [x] Lista
                                    </Button>
                                </CardTitle>
                                <CardText>
                                    <Input
                                        type="text"
                                        placeholder="Item"
                                        value={listInputs[todoIndex] || ""}
                                        onChange={(e) => handleListInputChange(todoIndex, e.target.value)}
                                        className="mb-2"
                                    />
                                    <Button color="success" onClick={() => handleAddItem(todoIndex)} block>
                                        Adicionar Item
                                    </Button>
                                </CardText>
                                <ul className="list-unstyled">
                                    {todo.listInputs.map((item, itemIndex) => (
                                        <li key={itemIndex}
                                            className="d-flex justify-content-between align-items-center mb-2">
                                            {item}
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleDeleteItem(todoIndex, itemIndex)}
                                            >
                                                [x]
                                            </Button>
                                        </li>
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