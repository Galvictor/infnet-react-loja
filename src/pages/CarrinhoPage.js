import React from 'react';
import {Container, Table, Button, Row, Col, Alert} from 'reactstrap';
import {useCart} from '../contexts/CartContext';
import {useNavigate} from 'react-router-dom';

const CarrinhoPage = () => {
    const {
        items,
        totalItems,
        totalPrice,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {
        // Simulação de finalização de compra
        alert(`Compra finalizada com sucesso! Total: $${totalPrice.toFixed(2)}`);
        clearCart();
        navigate('/loja');
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4">Seu Carrinho de Compras</h1>

            {items.length === 0 ? (
                <div className="text-center py-5">
                    <Alert color="info">
                        <h4>Seu carrinho está vazio</h4>
                        <p>Explore nossa loja para encontrar produtos incríveis!</p>
                    </Alert>
                    <Button color="primary" onClick={() => navigate('/loja')} className="mt-3">
                        Continuar Comprando
                    </Button>
                </div>
            ) : (
                <>
                    <Table responsive bordered hover>
                        <thead className="table-dark">
                        <tr>
                            <th>Produto</th>
                            <th className="text-center">Preço Unitário</th>
                            <th className="text-center">Quantidade</th>
                            <th className="text-center">Subtotal</th>
                            <th className="text-center">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="img-thumbnail me-3"
                                            style={{width: '80px', height: '80px', objectFit: 'contain'}}
                                        />
                                        <div>
                                            <h6 className="mb-0">{item.title}</h6>
                                            <small className="text-muted">ID: {item.id}</small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center align-middle">
                                    ${item.price.toFixed(2)}
                                </td>
                                <td className="text-center align-middle">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                                        className="form-control text-center"
                                        style={{width: '70px', display: 'inline-block'}}
                                    />
                                </td>
                                <td className="text-center align-middle">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td className="text-center align-middle">
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                        className="me-2"
                                    >
                                        <i className="bi bi-trash"></i> Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end fw-bold">Total:</td>
                            <td className="text-center fw-bold">${totalPrice.toFixed(2)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="5" className="text-end small text-muted">
                                {totalItems} ite{totalItems !== 1 ? 'ns' : 'm'} no carrinho
                            </td>
                        </tr>
                        </tfoot>
                    </Table>

                    <Row className="mt-4">
                        <Col md="6">
                            <Button
                                color="secondary"
                                onClick={() => navigate('/loja')}
                                className="me-2"
                            >
                                <i className="bi bi-arrow-left"></i> Continuar Comprando
                            </Button>

                            <Button
                                color="outline-danger"
                                onClick={clearCart}
                            >
                                <i className="bi bi-cart-x"></i> Limpar Carrinho
                            </Button>
                        </Col>

                        <Col md="6" className="text-md-end mt-3 mt-md-0">
                            <Button
                                color="success"
                                size="lg"
                                onClick={handleCheckout}
                            >
                                <i className="bi bi-check-circle"></i> Finalizar Compra
                            </Button>

                            <div className="mt-2">
                                <small className="text-muted">
                                    * Processo de checkout simulado para demonstração
                                </small>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default CarrinhoPage;