import React, {useState} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col} from 'reactstrap';
import ProductModal from './ProductModal';
import './LojaList.css';

const LojaList = ({products}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = (product = null) => {
        setSelectedProduct(product);
        setModalOpen(!modalOpen);
    };

    return (
        <Row>
            {products.map((product) => (
                <Col md="4" sm="6" xs="12" key={product.id} className="mb-4">
                    <div className="product-card-wrapper" onClick={() => toggleModal(product)}>
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

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={modalOpen}
                    toggle={() => toggleModal()}
                />
            )}
        </Row>
    );
};

export default LojaList;