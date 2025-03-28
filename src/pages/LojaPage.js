import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {fetchProducts} from '../services/apiService';
import LojaList from '../components/LojaList';
import {useTema} from '../contexts/TemaContext';

const LojaPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const {temaEscuro} = useTema();
    const productsPerPage = 9;

    useEffect(() => {
        const loadProducts = async () => {
            const skip = (currentPage - 1) * productsPerPage;
            const {products: fetchedProducts, total} = await fetchProducts(skip, productsPerPage);
            setProducts(fetchedProducts);
            setTotalProducts(total);
        };

        loadProducts();
    }, [currentPage]);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container className={`my-5 ${temaEscuro ? 'text-white' : 'text-dark'}`}>
            <Row>
                <Col>
                    <h1 className="text-center mb-5">Loja de Produtos</h1>
                    <LojaList products={products}/>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination>
                                <PaginationItem disabled={currentPage === 1}>
                                    <PaginationLink
                                        previous
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className={temaEscuro ? 'bg-dark text-white' : ''}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem active={index + 1 === currentPage} key={index}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(index + 1)}
                                            className={temaEscuro ? 'bg-dark text-white' : ''}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem disabled={currentPage === totalPages}>
                                    <PaginationLink
                                        next
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={temaEscuro ? 'bg-dark text-white' : ''}
                                    />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default LojaPage;