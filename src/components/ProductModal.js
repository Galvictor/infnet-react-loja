import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label} from 'reactstrap';
import {useCart} from '../contexts/CartContext';

const ProductModal = ({product, isOpen, toggle}) => {
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(product, quantity);
            toggle();
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Adicionar ao Carrinho</ModalHeader>
            <ModalBody>
                <div className="text-center mb-4">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{maxHeight: '150px', width: 'auto'}}
                    />
                    <h5 className="mt-3">{product.title}</h5>
                    <p>Preço: ${product.price.toFixed(2)}</p>
                </div>

                <Label for="quantity">Quantidade:</Label>
                <Input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
                <Button color="primary" onClick={handleAddToCart}>
                    Adicionar ao Carrinho
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ProductModal;