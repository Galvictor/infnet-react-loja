import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label} from 'reactstrap';
import {useCart} from '../contexts/CartContext';
import {useTema} from '../contexts/TemaContext';

const ProductModal = ({product, isOpen, toggle}) => {
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useCart();
    const {temaEscuro} = useTema();

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(product, quantity);
            toggle();
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={temaEscuro ? 'dark-modal' : ''}>
            <ModalHeader toggle={toggle} className={temaEscuro ? 'bg-dark text-white' : ''}>
                Adicionar ao Carrinho
            </ModalHeader>
            <ModalBody className={temaEscuro ? 'bg-secondary text-white' : ''}>
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
                    className={temaEscuro ? 'bg-dark text-white' : ''}
                />
            </ModalBody>
            <ModalFooter className={temaEscuro ? 'bg-dark' : ''}>
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