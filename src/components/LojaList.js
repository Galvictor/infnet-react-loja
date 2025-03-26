import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import './LojaList.css'; // Importamos o CSS personalizado

const LojaList = ({ products }) => {
    return (
        <Row>
            {products.map((product) => (
                <Col md="4" sm="6" xs="12" key={product.id} className="mb-4">
                    <div className="product-card-wrapper">
                        <Card className="h-100 product-card">
                            <div className="image-container">
                                <CardImg
                                    top
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="product-image"
                                />
                                <div className="price-badge">${product.price.toFixed(2)}</div>
                            </div>
                            <CardBody className="d-flex flex-column">
                                <CardTitle tag="h5" className="product-title">{product.title}</CardTitle>
                                <div className="mt-auto">
                                    <small className="text-muted stock-info">
                                        Estoque: {product.stock} unidades
                                    </small>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default LojaList;