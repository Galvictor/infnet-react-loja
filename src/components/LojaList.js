import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col} from 'reactstrap';

const LojaList = ({products}) => {
    return (
        <Row>
            {products.map((product) => (
                <Col md="4" sm="6" xs="12" key={product.id} className="mb-4">
                    <Card className="h-100">
                        <div className="text-center p-3" style={{height: '200px', overflow: 'hidden'}}>
                            <CardImg
                                top
                                src={product.thumbnail}
                                alt={product.title}
                                style={{
                                    maxHeight: '100%',
                                    width: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                        <CardBody className="d-flex flex-column">
                            <CardTitle tag="h5">{product.title}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                Preço: ${product.price.toFixed(2)}
                            </CardSubtitle>
                            <div className="mt-auto">
                                <small className="text-muted">
                                    Estoque: {product.stock} unidades
                                </small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default LojaList;